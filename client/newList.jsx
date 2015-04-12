/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  propTypes: {
    makeList: React.PropTypes.array.isRequired,
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
            </div>

            <br />

            <button className="btn waves-effect waves-light" onClick={this.props.makeList}>
            <i className="mdi-content-send right"></i>
            Let Them Know
            </button>
          </div>
      </div>
    );
  }
});
