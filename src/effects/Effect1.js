import React, { Component } from "react";
import { $, jQuery } from "jquery";
import data from "../data.json";
import "./Effect1.scss";

export class Effect1 extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var textArray = [];
    var a1;

    for (var i = 0; i < this.props.word.length; i++) {
      textArray.push(this.props.word[i]);
    }

    var num2 = () => {
      document.getElementById("word_01_1").innerHTML = a1;
    };

    function s1() {
      setInterval(num2, 1000);
    }

    s1();

    var Because = () => {
      var a = "Because you are in " + "'" + this.props.attendee + "'";
      document.getElementById("neighbor_1").innerHTML = a;
    };

    Because();
  }

  render() {
    return (
      <div className="effects effect5">
        <h1>
          <span id="word_01_1" />
          <span id="word_01_2" />
        </h1>
        <div id="neighbor_1" />
      </div>
    );
  }
}

export default Effect1;
