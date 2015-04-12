/** @jsx React.DOM */

var React = require('react');
var io = require('../public/bower_components/socket.io-client/socket.io.js');
var _ = require('underscore');

// For extracting from query string (venmo auth)
function getParameterByName( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

module.exports = React.createClass({
  propTypes: {
    listName: React.PropTypes.string.isRequired,
    onDeleteList: React.PropTypes.func.isRequired,
  },
  getInitialState: function() {
    // Handle socket emits (resulting from twilio SMS)
    socket.on('sms recv', function(data) {
      var x = new Date();
      var _id = x.getTime();
      $.ajax({
        url: '/shop/lists/' + this.props.listName + '/addItems',
        type: 'POST',
        data: {
          items: [{
            _id: _id,
            ownerPhone: data.from,
            itemName: data.items,
            price: ''
          }]
        },
        success: function(data) {

          this.setState( { items: data.items } );
        }.bind(this),
      });
    }.bind(this));

    // handle venmo receipt
    socket.on('venmo recv', function(data) {
      this.setState( { items: _.map(
        this.state.items,
        function(item) {
          if (item.ownerPhone == data.ownerPhone) {
            item.transactionStatus = newStatus;
            return item;
          } else {
            return item;
          }
        })
      });
    }.bind(this));

    return { items: [] };
  },
  componentDidMount: function() {
    $.getJSON('/shop/lists/' + this.props.listName, function(data) {
      this.setState({ items: data.items });
    }.bind(this));
  },
  render: function() {
    if (this.state.items.length === 0) {
      $('#modal1').openModal();
    }
      var showList = [];
      _.each(this.state.items, function(item) {
        showList.push(<tr>
                      <td>{item.ownerPhone}</td>
                      <td>{item.itemName}</td>
                      <td>
                      <input type="text" id={"priceForItem" + item._id} value={item.price} onChange={this._handlePricefieldChange} />
                      </td>
                      <td>
                      <button onClick={this._handleUpdatePrice} id={item._id} className="btn waves-effect waves-light green">
                      $
                      </button>
                      </td>
                      <td><button onClick={this._handleDelete} id={item._id} className="btn waves-effect waves-light red">destroy</button></td>
                      </tr>);
      }.bind(this));

      var venmoButton;
      var userInfo;
      if (getParameterByName('access_token') === '') {
        venmoButton = <button className="btn waves-effect waves-light left" onClick={this._authWithVenmo}>Authenticate with Venmo</button>;
      } else {
        venmoButton = (<button className="btn waves-effect waves-light left" onClick={this._chargeVenmo}>
                       Split Bill
                       <i class="mdi-content-send right"></i>
                       </button>);
      }
      return (
          <div>
            <a className="modal-trigger waves-effect waves-light btn" style={{display:"None"}} href="#modal1">Modal</a>
            <div id="modal1" className="modal modal-fixed-footer">
              <div className="modal-content teal lighten-2">
                <h4 font-size="100px;" >Success!</h4>
                <div className="div_hover">
                  <p>You texted your friends. Now to wait for a response....</p>
                </div>
              </div>
              <div className="modal-footer">
                <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat "/>
              </div>
            </div>
            <h1>{this.props.listName}</h1>
            <table className="table">
              <tr>
                <th>Phone Number</th>
                <th>Item Name</th>
                <th>Price</th>
                <th></th>
                <th>Delete</th>
              </tr>
              <tbody>
                {showList}
              </tbody>
            </table>
            <br />
          <div className="section">
            {venmoButton}
            <button className="btn waves-effect waves-light red right" onClick={this._deleteList}>Delete List</button>
            <br /><br />
          </div>
      );
  },
  _handlePricefieldChange: function(event) {
    var itemId = event.target.id.slice(12);
    this.setState({ items: _.map(
      this.state.items,
      function(item) {
        if (item._id == itemId) {
          item.price = newPrice;
          return item;
        } else {
          return item;
        }
      })
    });
  },
  _handleUpdatePrice: function(event) {
    event.preventDefault();
    var itemId = $(event.target).attr('id');
    var newPrice = $("#priceForItem" + itemId)[0].value.trim();
    $.ajax({
      type: 'POST',
      url: '/shop/lists/' + this.props.listName + '/updatePrice',
      data: {
        _id: itemId,
        newPrice: newPrice
      },
      success: function() {
        // TODO: flash the UI to confirm success
      }.bind(this)
    });
  },
  _handleDelete: function(event) {
    event.preventDefault();
    var itemID = $(event.target).attr('id');
    $.ajax({
      type: 'DELETE',
      url: '/shop/lists/' + this.props.listName + '/' + itemID,
      success: function(data) {
        this.setState({ items: data.items });
      }.bind(this)
    });
  },
  _authWithVenmo: function(event) {
    event.preventDefault();
    window.location = "https://api.venmo.com/v1/oauth/authorize?client_id=2536&scope=make_payments";
  },
  _chargeVenmo: function(event) {
    event.preventDefault();
    $.ajax({
      url: '/shop/lists/' + this.props.listName + '/splitBill',
      dataType: 'json',
      type: 'GET',
      success: function(bill) {

        _.each(bill, function(amt, phone) {
          // TODO: This throws a JS bug, but posts successfully??
          $.ajax({
            url: '/payments/charge',
            type: 'POST',
            data: {
              access_token: getParameterByName('access_token'),
              phone: phone,
              note: 'Splitting bill from ' + this.props.listName,
              amount: -amt // negative to charge other user
            },
            success: function(res) {
              console.log("Successfully POSTed venmo charge:");
              console.log(res);
            },
          });
        }.bind(this));
      }.bind(this),
    });
  },
  _deleteList: function(event) {
    $.ajax({
      type: 'DELETE',
      url: '/shop/lists/' + this.props.listName,
      success: function(data) {
        this.props.onDeleteList();
      }.bind(this)
    });
  },
});
