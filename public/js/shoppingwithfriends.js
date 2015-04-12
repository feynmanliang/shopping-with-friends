/*global React*/
"use strict";

var ShopForm = React.createClass({
  getInitialState: function() {
    return { };
  },
  componentDidMount: function() {
    $.ajax({
      url:'/sms/receive',
      dataType: 'json',
      type: 'POST',
      data: true,
      success: function(data) {
        console.log('data');
        console.log(data);
        this.setState( { ListData: data } );
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
      return (
        <div>
          <div className="section no-pad-bot" id="index-banner">
            <div className="container">
              <h1 className="header center orange-text">Going to the store?</h1>
              <div className="row center">
                <h5 className="header col s12 light">Maybe your friends want something?</h5>
              </div>
              <br /><br />
            </div>
          </div>
          <div className="section">
            <div className="row">
                <input type="text" className="input" id="field1" ref="titlefield" placeholder="Name of Store" />
                <label for="field1">Where are you going?</label>

                <input type="text" ref="smsfield" className="input" id="field2" placeholder="Friends" />
                <label for="field2">Who should we notify?</label>

                <input type="hidden" name="count" value="1" />
                <div className="control-group" id="fields">
                    <label className="control-label" for="field1">Nice Multiple Form Fields</label>
                    <div className="controls" id="profs">
                        <form className="input-append">
                            <div id="field">
                              <input autocomplete="off" className="input" id="field1" name="prof1" type="text" placeholder="Type something" data-items="8"/>
                              <button id="b1" className="btn add-more" type="button">+</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <br />

            <button className="btn waves-effect waves-light" onClick={this._makeList}>
            <i className="mdi-content-send right"></i>
            Let Them Know
            </button>
          </div>
          <br /><br />
      );
    }
  },
  _makeList: function(e) {
    e.preventDefault();
    var smsString = this.refs.smsfield.getDOMNode().value.trim();
    var smsArray =  smsString.split(' ');

    var title = this.refs.titlefield.getDOMNode().value.trim();
    console.log('title in makelist');
    console.log(title);
    this.refs.titlefield.getDOMNode().value = '';
    this.refs.smsfield.getDOMNode().value = '';

    for (var i = 0; i < smsArray.length; i++) {
    $.ajax({
      url:'/sms/send',
      dataType: 'json',
      type: 'POST',
      data: {'to': smsArray[i], 'body': title },
      success: function(data) {
        console.log('data');
        console.log(data);
        this.setState( { ListData: data[0] } );
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    }
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
