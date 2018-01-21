import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Toggle extends Component {
  constructor() {
    super()
    this.state = {
      on: true
    }
  }

  handleClick = () => {
    if (typeof this.props.changeHandler === "function"){
      this.props.changeHandler(!this.state.on)
    }
    this.setState({
      on: !this.state.on
    })
  }

  render() {
    return (
      <label className="switch">
        <input onClick={this.handleClick} type="checkbox" id="togBtn" defaultChecked={this.state.on}/>
        <div className="slider round">
          <span className="on">{this.props.onLabel}</span>
          <span className="off">{this.props.offLabel}</span>
        </div>
      </label>
    )
  }
}

Toggle.propTypes = {
  onLabel: PropTypes.string.isRequired,
  offLabel: PropTypes.string.isRequired,
  changeHandler: PropTypes.func
};

export default Toggle