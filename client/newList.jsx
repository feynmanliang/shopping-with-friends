/** @jsx React.DOM */

var React = require('react');
var Materialize = require('../public/bower_components/materialize/dist/js/materialize.min.js');

module.exports = React.createClass({
  propTypes: {
    onNewListSubmit: React.PropTypes.func.isRequired,
  },
  _handleSubmit: function(e) {
    e.preventDefault();
    var listName = React.findDOMNode(this.refs.listName).value.trim();
    var friendList = React.findDOMNode(this.refs.friendList).value.trim().split(" ");
    this.props.onNewListSubmit(listName, friendList);
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
              <form onSubmit={this._handleSubmit}>
                <input type="text" className="input" ref="listName" placeholder="Name of Store" />
                <label>Where are you going?</label>

                <input type="text" className="input" ref="friendList" placeholder="Friends" />
                <label>Who should we notify?</label>

                <br /> <br />
                Materialize.toast('message', 4000)

                <button type="submit" onClick="Materialize.toast('message', 4000)" className="btn waves-effect waves-light" >
                  <i className="mdi-content-send right"></i>
                  Let Them Know
                </button>
              </form>
          </div>
      </div>
    );
  }
});
