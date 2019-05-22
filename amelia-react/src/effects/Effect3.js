import React, { Component } from 'react'

export class Effect3 extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className = "effects effect3">
           {this.props.attendee}
        {this.props.names}
      </div>
    )
  }
}

export default Effect3
