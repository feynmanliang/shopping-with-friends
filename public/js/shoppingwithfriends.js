/*global React*/
"use strict";

var ShopForm = React.createClass({
  getInitialState: function() {
    return { };
  },
  componentDidMount: function() {
    this.setState( { } );
  },
  render: function() {
      return (
        <div>
          <div className="section no-pad-bot" id="index-banner">
            <div className="container">
              <br /><br />
              <h1 className="header center orange-text">Going to the store?</h1>
              <div className="row center">
                <h5 className="header col s12 light">Maybe your friends want something?</h5>
              </div>
              <br /><br />
            </div>
          </div>
          <div className="section">
            <div className="row">
                <input type="text" className="input" id="field1" placeholder="Name of Store" />
                <label for="field1">Where are you going?</label>

                <input type="text" className="input" id="field2" placeholder="Friends" />
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
        </div>
      );
      //var LIST = [];
      //if (typeof this.state.items !== 'undefined') {
        //console.log('currData.items');
        //console.log(this.state.items);
        //for (var i = 0; i < this.state.items.length; i++) {
          //LIST.push(<tr>
                    //<td>{this.state.items[i].owner}</td>
                    //<td>{this.state.items[i].item}</td>
                    //<td><input type="text" ref="pricefield" placeholder="enter price"/></td>
                    //<td><button onClick={this._handleDelete} id={this.state.items[i]._id}>destroy</button></td>
                    //</tr>);
        //}
      //}
      //return (
        //<div>
          //<input type="text" ref="namefield" placeholder="name.." />
          //<textarea ref="itemfield" rows="5" cols="30" placeholer="enter items separated by commas.." />
          //<button onClick={this._handleSubmit}>submit</button>
          //<table>
            //<thead>
              //<tr>
                //<th id="titleid"><h1>{this.state.name}</h1></th>
              //</tr>
            //</thead>
            //<tbody>
              //{LIST}
            //</tbody>
          //</table>
        //</div>
      //);
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
