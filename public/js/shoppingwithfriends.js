/*global React*/
"use strict";

var ShopForm = React.createClass({
  getInitialState: function() {
    return { };
  },
  componentDidMount: function() {
    $.getJSON('/shop/lists/bfa', function(list) {
      console.log('list in componentdidmount');
      console.log(list);
      this.setState({ ListData: list });
    }.bind(this));
  },
  render: function() {
<<<<<<< HEAD
=======
    if (!this.state.name) {
      return (
        <div>
          <div class="section no-pad-bot" id="index-banner">
            <div class="container">
              <br /><br />
              <h1 class="header center orange-text">Going to the store?</h1>
              <div class="row center">
                <h5 class="header col s12 light">Maybe your friends want something? You should let them know!</h5>
              </div>
              <br /><br />
            </div>
          </div>
          <div class="section">
            Where are you going?
            <input type="text" ref="titlefield" placeholder="Store"/>

            Who should we notify?
            <input type="text" ref="titlefield" placeholder="Friends"/>

            <br />

            <button onClick={this._makeList}>Send SMS!</button>
          </div>
          <br /><br />
        </div>
      )
    } else {
>>>>>>> cb9eb7ef4f7ffb677295437fdf32bacd57a43e00
      var LIST = [];
      if (typeof this.state.ListData.items !== 'undefined') {
        console.log('currData.items');
        console.log(this.state.ListData.items);
        for (var i = 0; i < this.state.ListData.items.length; i++) {
          LIST.push(<tr>
                    <td>{this.state.ListData.items[i].owner}</td>
                    <td>{this.state.ListData.items[i].item}</td>
                    <td><input type="text" ref="pricefield" placeholder="enter price"/></td>
                    <td><button onClick={this._handleDelete} id={this.state.ListData.items[i]._id}>destroy</button></td>
                    </tr>);
        }
      }
      return (
        <div>
          <input type="text" ref="namefield" placeholder="name.." />
          <textarea ref="itemfield" rows="5" cols="30" placeholer="enter items separated by commas.." />
          <button onClick={this._handleSubmit}>submit</button>
          <table>
            <thead>
              <tr>
                <th><h1>{this.state.name}</h1></th>
              </tr>
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
  _handleSubmit: function(event) {
    event.preventDefault();
//    var title = document.getElementById("titleid").firstChild.innerHTML;
//    console.log('title in handlesubmit');
//    console.log(title);

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

$(document).ready(function() {
  React.render(
    <ShopForm />,
    $('#content')[0]);
});
