/** @jsx React.DOM */

var React = require('react');
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
  },
  getInitialState: function() {
    return { items: [] };
  },
  componentDidMount: function() {
    $.getJSON('/shop/lists/' + this.props.listName, function(list) {
      this.setState({ items: list.items });
    }.bind(this));
  },
  render: function() {
    var showList = [];
    _.each(this.state.items, function(item) {
      showList.push(<tr>
                    <td>{item.ownerPhone}</td>
                    <td>{item.itemName}</td>
                    <td>
                    <input type="text" id={"priceForItem" + item._id} defaultValue={item.price} />
                    </td>
                    <td>
                    <button onClick={this._handleUpdatePrice} id={item._id} className="btn btn-success btn-xs">
                    $
                    </button>
                    </td>
                    <td><button onClick={this._handleDelete} id={item._id} className="btn btn-danger btn-xs">destroy</button></td>
                    </tr>);
    }.bind(this));

    var venmoButton;
    var userInfo;
    if (getParameterByName('access_token') === '') {
      venmoButton = <button className="btn btn-success" onClick={this._authWithVenmo}>Authenticate with Venmo</button>;
    } else {
      venmoButton = <button className="btn btn-success" onClick={this._chargeVenmo}>Split Bill</button>;
    }
    return (
      <div>
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
        {venmoButton}
      </div>
    );
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
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status. err.toString());
      }.bind(this)
    });
  },
  _authWithVenmo: function(event) {
    event.preventDefault();
    window.location = "https://api.venmo.com/v1/oauth/authorize?client_id=2536&scope=make_payments";
  },
  _chargeVenmo: function(event) {
    event.preventDefault();
    // TODO: Finish
    $.ajax({
      url: '/shop/lists/' + this.props.listName + '/splitBill',
      dataType: 'json',
      type: 'GET',
      success: function(res) {
        console.log(res);
      }.bind(this),
    });
    $.ajax({
      url: 'https://api.venmo.com/v1/me?access_token=' + getParameterByName('access_token'),
      dataType: 'json',
      type: 'GET',
      success: function(res) {
        console.log(res);
      }.bind(this),
    });
  },
});
