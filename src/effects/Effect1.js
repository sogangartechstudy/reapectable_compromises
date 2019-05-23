import React, { Component } from "react";
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

    var c;
    var nameArray_1 = [];
    var namepopup_1 = () => {
      for (var i = 0; i < this.props.names.length; i++) {
        nameArray_1.push(this.props.names[i]);
      }

      nameArray_1.sort();
      c = document.getElementById("name_1").innerHTML =
        "Hi! 😁          " + nameArray_1.join(", ");
    };

    namepopup_1();

    const gra_01 = document.getElementById("gra_01");
    const gra_02 = document.getElementById("gra_02");
    const gra_03 = document.getElementById("gra_03");
    const gra_04 = document.getElementById("gra_04");
    const gra_05 = document.getElementById("gra_05");

    var num = () => {
      const a1 = Math.floor(Math.random() * 9 + 1);
      const a2 = Math.floor(Math.random() * 9 + 1);
      const a3 = Math.floor(Math.random() * 9 + 1);
      const a4 = Math.floor(Math.random() * 9 + 1);
      const a5 = Math.floor(Math.random() * 9 + 1);
      gra_01.innerHTML = this.props.word[a1] + ", ";
      gra_02.innerHTML = this.props.word[a2] + ", ";
      gra_03.innerHTML = this.props.word[a3] + ", ";
      gra_04.innerHTML = this.props.word[a4] + ", ";
      // gra_05.innerHTML = this.props.word[a5] + ", ";
    };

    function s1() {
      setInterval(num, 10000);
    }

    s1();

    var Because = () => {
      var a = "Because you live in " + "'" + this.props.attendee + "'";
      document.getElementById("neighbor_1").innerHTML = a;
    };

    Because();
  }

  render() {
    return (
      <div className="effects effect1">
        <div id="name_1" />
        <h1>
          <span id="gra_01" />
          <span id="gra_02" />
          <span id="gra_03" />
          <span id="gra_04" />
          <span id="gra_05" />
        </h1>
        <div id="neighbor_1" />
      </div>
    );
  }
}

export default Effect1;
