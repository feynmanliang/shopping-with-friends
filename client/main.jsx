/** @jsx React.DOM */

var $ = require('jquery');
var React = require('react');
var NewListForm = require('./newList.jsx');
var ShoppingList = require('./shoppingList.jsx');

var App = React.createClass({
  getInitialState: function() {
    return { listLoaded: false };
  },
  render: function() {
    if (!this.state.listLoaded) {
      return (
        <div className="section">
          <NewListForm onNewListSubmit={this._onNewListSubmit}/>
        </div>
      );
    } else {
      return (
      <div className="section">
        <ShoppingList itemsList={this.state.listItems} />
      </div>
      );
    }
  },
  _onNewListSubmit: function(listName, friendList) {
    this.setState({
      listLoaded: true,
      listName: listName,
      friendList: friendList
    });
  }
});

$(document).ready(function() {
  React.render(
    <App />,
    $("#main")[0]
  );
});
