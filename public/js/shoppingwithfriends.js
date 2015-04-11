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
      <div>
      <input type="text" ref="titlefield" onClickOut={this._submitTitle} placeholder="title.."/>
      <input type="text" ref="namefield" placeholder="name.."/>
      <textarea ref="itemfield" placeholer="write something.."/>
      </div>
    );
  },
  _submitTitle: function(event) {
    event.preventDefault();
    var title = this.refs.titlefield.getDOMNode.value.trim();
    //TODO: POST title for new shop list/ create new list object -> {'name': title}
    $.ajax({
      url:'',
      dataType: 'json',
      type: 'POST',
      data: {'name': title},
      success: function(data) {
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});

$(document).ready(function() {
  React.render(
    <ShopForm/>,
    $.'#content')[0]);
});
