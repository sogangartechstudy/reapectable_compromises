import React, { Component } from 'react'

export class Effect1 extends Component {
  constructor(props){
    super(props);
    console.log(props)
  }
  static defaultProps = {
    names: '기본이름',
    attendee:'100'
  }
  render() {
    return (
      <div className = "effects effect1">
          {this.props.attendee}
        {this.props.names}
      </div>
    )
  }
}

export default Effect1
