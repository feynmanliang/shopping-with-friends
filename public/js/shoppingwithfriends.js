/*global React*/
"use strict";

var ShopForm = React.createClass({
  getInitialState: function() {
    this.setState({ListData: []});
  },
  componentDidMount: function() {
    //TODO: send GET to backend
    this.setState({ListData: []});
  },
  render: function() {
    return (
    );
  }
});

$(document).ready(function() {
  React.render(
    <ShopForm/>,
    $.'#content')[0]);
});
