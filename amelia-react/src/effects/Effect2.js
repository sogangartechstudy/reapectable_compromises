import React, { Component } from 'react'

export class Effect2 extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className = "effects effect2">
          {this.props.attendee}
        {this.props.names}
      </div>
    )
  }
}

export default Effect2
