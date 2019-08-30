import React, { Component } from "react";
import d3 from "d3";
import "./ScreenTest.scss";
import Treemap from "../effects/Treemap";
import ScreenWords from "../effects/ScreenWords";
import ScreenNames from "../effects/ScreenNames";
import data from "../data.json";
import EffectMain from "../effects/EffectMain";
import ReactDOM from "react-dom";
import $ from "jquery";
import { readlink } from "fs";
import { callbackify } from "util";
import AmeliaDialogue from "../effects/AmeliaDialogue";

export class ScreenTest extends React.Component {
  constructor(props) {
    super(props);
    this.second = React.createRef();
  }

  componentDidMount() {
    // ReactDOM.render(<AmeliaDialogue />, document.querySelector("#stage1"));
    ReactDOM.render(<ScreenWords />, document.querySelector("#stage1"));
    // setTimeout(() => {
    //   ReactDOM.render(<ScreenWords />, document.querySelector("#stage1_1"));
    //   $("div[id='stage1'").css({
    //     display: "none"
    //   });
    // }, 30000); //100000

    setTimeout(() => {
      ReactDOM.render(<Treemap />, document.querySelector("#stage2"));
      $("div[id='stage1'").css({
        display: "none"
      });
    }, 1000); //64000

    setTimeout(() => {
      ReactDOM.render(<ScreenNames />, document.querySelector("#stage3"));
      $("div[id='stage2'").css({
        display: "none"
      });
    }, 100); //80000

    setTimeout(() => {
      window.location.reload();
    }, 200000);
  }

  render() {
    return (
      <div id="screen-con">
        <div className="message_1">
          <img
            src={process.env.PUBLIC_URL + "/images/Aura Logo Reverse_RGB.png"}
          />
        </div>
        <div id="stage1" />
        {/* <div id="stage1_1" /> */}
        <div id="stage2" />
        <div id="stage3" />
      </div>
    );
  }
}

export default ScreenTest;
