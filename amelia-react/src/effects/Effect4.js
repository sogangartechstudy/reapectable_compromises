import React, { Component } from 'react'

export class Effect4 extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className = "effects effect4">
           {this.props.attendee}
        {this.props.names}
      </div>
    )
  }
}

export default Effect4
