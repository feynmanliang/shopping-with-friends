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
          <NewListForm makeList={this._makeList}/>
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
  _makeList: function(newList) {
    console.log(newList);
    this.setState( { listLoaded: true, listItems: newList } );
  }
});

$(document).ready(function() {
  React.render(
    <App />,
    $("#main")[0]
  );
});
