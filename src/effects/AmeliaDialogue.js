import React, { Component } from "react";
import "./AmeliaDialogue.scss";
import WorldMap_1 from "./WorldMap_1";

class AmeliaDialogue extends Component {
  static defaultProps = {
    period: 1000,
    toRotate: [
      "Where do you live?",
      "What is your neighborhood like?",
      "Who are the people in your neighborhood?"
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      txt: "",
      fullTxt: "",
      loopNum: 0,
      isDeleting: false
    };
  }

  componentDidMount() {
    this.tick();
  }

  componentDidUpdate(prevProps, prevState) {
    let delta = 150 - Math.random() * 100;
    if (this.state.isDeleting) {
      delta /= 2;
    }
    if (!this.state.isDeleting && this.state.txt === this.state.fullTxt) {
      delta = this.props.period;
    } else if (this.state.isDeleting && this.state.txt === "") {
      delta = 400;
    }

    setTimeout(() => this.tick(), delta);
  }

  tick = () => {
    let i = this.state.loopNum % this.props.toRotate.length;
    let setFullTxt = this.props.toRotate[i];
    let copy = { ...this.state };

    if (this.state.isDeleting) {
      copy.txt = setFullTxt.substring(0, copy.txt.length - 1);
    } else {
      copy.txt = setFullTxt.substring(0, copy.txt.length + 1);
    }
    if (!this.state.isDeleting && this.state.txt === setFullTxt) {
      copy.isDeleting = true;
    } else if (copy.isDeleting && this.state.txt === "") {
      copy.isDeleting = false;
      copy.loopNum = copy.loopNum + 1;
    }
    copy.fullTxt = setFullTxt;
    this.setState(() => copy, console.log("delta", this.state.delta));
  };

  render() {
    return (
      <div>
        <a className="typeWriter">
          {this.state.txt}
          <span className="wrap" />
        </a>
        {/* <WorldMap_1 /> */}
      </div>
    );
  }
}

export default AmeliaDialogue;
