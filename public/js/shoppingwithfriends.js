/*global React*/
"use strict";

var ShopForm = React.createClass({
  getInitialState: function() {
    return { ListData: [] };
  },
  componentDidMount: function() {
    //TODO: send proper GET to backend
//    $.getJSON('', function(data) {
//    this.setState({ListData: data});
 //   }.bind(this));
      this.setState({ListData: []});
  },
  render: function() {
    if (this.state.ListData.length === 0) {
      return (
        <div>
          <input type="text" ref="titlefield" placeholder="title.."/>
          <button onClick={this._makeList}>submit</button>
        </div>
      );
    }
    else {
    var currData = this.state.ListData;
    var LIST = [];
    var TITLE = '';
    if (currData.length > 0) {
      TITLE = currData.name;
      if (typeof currData.items !== 'undefined' ) {
        console.log('currData.items');
        console.log(currData.items);
        for (var i = 0; i < currData.items.length; i++) {
          LIST.push(<tr>
                    <td>{currData.items[i].owner}</td>
                    <td>{currData.items[i].item}</td>
                    <td><input type="text" ref="pricefield" placeholder="enter price"/></td>
                    <td><button onClick={this._handleDelete} id={currData[0].items._id}>destroy</button></td>
                    </tr>);
        }
      }
    }
    return (
      <div>
        <input type="text" ref="namefield" placeholder="name.."/>
        <textarea ref="itemfield" rows="5" cols="30" placeholer="enter items separated by commas.."/>
        <button onClick={this._handleSubmit}>submit</button>
        <button onClick={this._showTitles}>show lists</button>
      <table>
        <thead>
          <h1>{TITLE}</h1>
        </thead>
        <tbody>
          {LIST}
        </tbody>
      </table>
      </div>
    );
    }
  },
  _makeList: function(e) {
    e.preventDefault();
    var title = this.refs.titlefield.getDOMNode().value.trim();
    $.ajax({
      url:'/shop/lists/create',
      dataType: 'json',
      type: 'POST',
      data: {'listName': title},
      success: function(data) {
        this.setState({ ListData: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });


  },
  _showTitles: function(event) {
    event.preventDefault();
    //TODO: send GET to gather list names
  },
  _handleDelete: function(event) {
    event.preventDefault();
    var itemID = $(event.target).attr('id');
    $.ajax({
      type: 'DELETE',
      url: ''+ itemID,
      success: function(data) {
        this.setState({ListData: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status. err.toString());
      }.bind(this)
    });
  },
  _handleSubmit: function(event) {
    event.preventDefault();
    var title = this.refs.titlefield.getDOMNode.value.trim();
    var owner = this.refs.namefield.getDOMNode.value.trim();
    var item = this.refs.itemfield.getDOMNode.value.trim();
    this.refs.titlefield.getDOMNode.value = '';
    this.refs.namefield.getDOMNode.value = '';
    this.refs.itemfield.getDOMNode.value = '';

    $.ajax({
      url:'/lists/add',
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
    $('#content')[0]);
});
