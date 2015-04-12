/** @jsx React.DOM */

var React = require('react');
var _ = require('underscore');

module.exports = React.createClass({
  propTypes: {
    listName: React.PropTypes.string.isRequired,
    friendList: React.PropTypes.array.isRequired,
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
    console.log("Rendering shopping list");
    console.log(this.props.listName);
    console.log(this.state.items);
    var showList = [];
    _.each(this.state.items, function(item) {
      showList.push(<tr>
                    <td>{item.ownerPhone}</td>
                    <td>{item.itemName}</td>
                    <td>
                      <input type="text" ref="pricefield" />
                    </td>
                    <td>
                      <button onClick={this._submitPrice} id={item._id} className="btn btn-success btn-xs">
                        $
                      </button>
                    </td>
                    <td><button onClick={this._handleDelete} id={item._id} className="btn btn-danger btn-xs">destroy</button></td>
                    </tr>);
    }.bind(this));

    //var authButton;
    //var userInfo;
    //if (getParameterByName('access_token') === '') {
    //  authButton = <button className="btn btn-success" onClick={this._authUser}>authUser</button>;
    //} else {
    //  $.ajax({
    //    url: 'https://api.venmo.com/v1/me?access_token=' + getParameterByName('access_token'),
    //    dataType: 'json',
    //    type: 'GET',
    //    success: function(res) {
    //      console.log(res);
    //    }.bind(this),
    //    error: function(xhr, status, err) {
    //      console.error(this.props.url, status, err.toString());
    //    }.bind(this)
    //  });
    //}
    return (
      <div>
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
      </div>
    );
  },
  _handleDelete: function(event) {
    event.preventDefault();
    var itemID = $(event.target).attr('id');
    var listName = this.props.listName;
    $.ajax({
      type: 'DELETE',
      url: '/shop/lists/' + listName + '/' + itemID,
      success: function(data) {
        this.setState({ items: data.items });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status. err.toString());
      }.bind(this)
    });
  },
  _handleSubmit: function(event) {
    event.preventDefault();
    var owner = this.refs.namefield.getDOMNode().value.trim();
    var item = this.refs.itemfield.getDOMNode().value.trim();
    this.refs.namefield.getDOMNode.value = '';
    this.refs.itemfield.getDOMNode.value = '';
    var x = new Date();
    var y = x.getTime();

    $.ajax({
      url:'/shop/lists/bfa/additems',
      dataType: 'json',
      type: 'POST',
      data: {'listName': title, 'items': [{ _id: y, 'ownerPhone#': owner, 'itemName': item }]},
      success: function(data) {
        console.log('handle submit SUCESS');
        this.setState({ ListData: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});
