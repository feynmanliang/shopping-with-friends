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
    var currData = this.state.ListData;
    var LIST = [];
    var TITLE = '';
    if (currData.length > 0) {
      TITLE = currData.name;
      for (var i = 0; i < currData.items.length; i++) {
        LIST.push(<tr>
                  <td>{currData.items[i].owner}</td>
                  <td>{currData.items[i].item}</td>
                  <td><input type="text" ref="pricefield" placeholder="enter price"/></td>
                  <td><button onClick={this._handleDelete} id={currData[0].items._id}>destroy</button></td>
                  </tr>);
      }
    } else {
      $('#titleinput').append(<input type="text" ref="titlefield" onClickOut={this._submitTitle} placeholder="title.."/>)

    }
    return (
      <div>
      <div id='titleinput'/>
      <input type="text" ref="namefield" placeholder="name.."/>
      <textarea ref="itemfield" placeholer="write something.."/>
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
  _submitTitle: function(event) {
    event.preventDefault();
    var title = this.refs.titlefield.getDOMNode.value.trim();
    this.refs.titlefield.getDOMNode.value = '';

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
    $('#content')[0]);
});
