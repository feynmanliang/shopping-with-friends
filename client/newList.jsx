/** @jsx React.DOM */

var React = require('react');

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
          <div className="section no-padding" id="index-banner">
              <br /><br />
              <h1 className="header center orange-text">Going to the store?</h1>
              <div className="row center">
                <h5 className="header col s12 light">Maybe your friends want something too <i className="mdi-action-thumb-up"></i></h5>
              </div>
          </div>
          <div className="section">
            <div className="container">
              <form onSubmit={this._handleSubmit}>
                <input type="text" className="input" ref="listName" placeholder="Name of Store" />
                <label>Where are you going?</label>

                <input type="text" className="input" ref="friendList" placeholder="Phones to Text" />
                <label>Who should we notify?</label>

                <br /> <br />

                <div className="row center">
                  <button type="submit" onClick={function() { Materialize.toast('Friends Notified!', 3000, 'rounded'); } } className="btn waves-effect waves-light" >
                    <i className="mdi-content-send right"></i>
                    Let Them Know
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="section no-pad-bot">
            <div className="row">
              <div className="center promo promo-example">
                <div className="col s4">
                  <i className="mdi-social-group" style={{"font-size": "7rem", "color": "grey"}}></i>
                  <p>Let your roomates know that you're going to the store.</p>
                </div>
              </div>
              <div className="center promo promo-example">
                <div className="col s4">
                  <i className="center mdi-image-flash-on" style={{"font-size": "7rem", "color": "grey"}}></i>
                  <p>We handle the texting, the aggregating, the arithmetic, and the Venmoing.
                  You do the shopping.</p>
                </div>
              </div>
              <div className="center promo promo-example">
                <div className="col s4">
                  <i className="center mdi-action-settings" style={{"font-size": "7rem", "color": "grey"}}></i>
                  <p>Buy more, pay less.</p>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
});
