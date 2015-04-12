/** @jsx React.DOM */

var $ = require('jquery');
var _ = require('underscore');
var React = require('react');
var NewListForm = require('./newList.jsx');
var ShoppingList = require('./shoppingList.jsx');

var App = React.createClass({
  getInitialState: function() {
    return { listLoaded: false };
  },
  componentDidMount: function() {
    $.getJSON('/shop/lists', function(listNames) {
      if (listNames.length > 0) this.setState({
        listLoaded: true,
        listName: listNames[0]
      });
    }.bind(this));
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
        <ShoppingList listName={this.state.listName} onDeleteList={this._onDeleteList} />
      </div>
      );
    }
  },
  _onNewListSubmit: function(listName, friendList) {
    // TODO: Send SMS To everyone in friendList
    $.ajax({
      type: 'POST',
      url: '/shop/lists/create',
      data: { listName: listName },
      success: function() {
        // Text each friend
        _.each(friendList, function(num) {
          $.ajax({
            type: 'POST',
            url: '/sms/send',
            data: {
              to: num,
              body: "Hey! I'm going to be at " + listName + ", want me to pick anything up for you?",
            }
          });
        });
        // Transition the UI
        this.setState({
          listLoaded: true,
          listName: listName,
        });
      }.bind(this),
    });
  },
  _onDeleteList: function() {
    this.setState({
      listLoaded: false
    });
  },
});

$(document).ready(function() {
  React.render(
    <App />,
    $("#main")[0]
  );
});
