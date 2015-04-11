/*global React*/
"use strict";

var ShopForm = React.createClass({
  getInitialState: function() {
    return { };
  },
  componentDidMount: function() {
    this.setState( { ListData: {} } );
  },
  render: function() {
    $.getJSON('/shop/lists', function(titlesArr) {
      console.log('titlesarr');
      console.log(titlesArr);
      var titlesList = titlesArr;

    var TITLE_LIST = [];
    if (!this.state.name) {
      console.log('this.state');
      console.log(this.props.Titles);
      for (var i = 0; i < titlesList.length; i++) {
        TITLE_LIST.push(<li><a href="#!">{titlesList[i]}</a></li>);
        }
      return (
        <div>
          <input type="text" ref="titlefield" placeholder="title.."/>
          <button onClick={this._makeList}>submit</button>
          <a className="dropdown-button btn" href="#" data-activates="dropdown1">pick a list to add to</a>
          <ul id="dropdown1" className="dropdown-content">
          {TITLE_LIST}
          </ul>
        </div>
      )
    };
    });
    }
    else {
      var LIST = [];
      if (typeof this.state.items !== 'undefined') {
        console.log('currData.items');
        console.log(this.state.items);
        for (var i = 0; i < this.state.items.length; i++) {
          LIST.push(<tr>
                    <td>{this.state.items[i].owner}</td>
                    <td>{this.state.items[i].item}</td>
                    <td><input type="text" ref="pricefield" placeholder="enter price"/></td>
                    <td><button onClick={this._handleDelete} id={this.state.items[i]._id}>destroy</button></td>
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
                <th id="titleid"><h1>{this.state.name}</h1></th>
              </tr>
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
    console.log('title in makelist');
    console.log(title);
    this.refs.titlefield.getDOMNode().value = '';
    $.ajax({
      url:'/shop/lists/create',
      dataType: 'json',
      type: 'POST',
      data: {'listName': title},
      success: function(data) {
        console.log('data');
        console.log(data);

        this.setState( { ListData: data[0] } );
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
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
    var title = document.getElementById("titleid").firstChild.innerHTML;
    console.log('title in handlesubmit');
    console.log(title);

    var owner = this.refs.namefield.getDOMNode().value.trim();
    var item = this.refs.itemfield.getDOMNode().value.trim();
    this.refs.namefield.getDOMNode.value = '';
    this.refs.itemfield.getDOMNode.value = '';
    var x = new Date();
    var y = x.getTime();

    $.ajax({
      url:'/shop/lists/'+title+'/additems',
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
