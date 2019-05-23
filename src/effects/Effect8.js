import React, { Component } from "react";
import data from "../data.json";
import "./Effect8.scss";

export class Effect8 extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var equal1 = () => {
      const equaltag = document.getElementById("equalclass1");
      equaltag.innerHTML = "==";
    };

    //텍스트 데이터에서 뽑아와서 랜덤하게 적용 - Word
    const atag_01 = document.getElementById("atag_011");
    const atag_02 = document.getElementById("atag_021");
    const atag_03 = document.getElementById("atag_031");

    var num11 = () => {
      const a1 = Math.floor(Math.random() * 9 + 1);
      const a2 = Math.floor(Math.random() * 9 + 1);
      const a3 = Math.floor(Math.random() * 9 + 1);
      atag_01.innerHTML = this.props.word[a1] + " ,";
      atag_02.innerHTML = this.props.word[a2] + " ,";
      atag_03.innerHTML = this.props.word[a3];
    };

    //텍스트 데이터에서 뽑아와서 랜덤하게 적용 - Name
    const nametag_01 = document.getElementById("nametag_011");
    const nametag_02 = document.getElementById("nametag_021");
    const nametag_03 = document.getElementById("nametag_031");

    var num21 = () => {
      const a1 = Math.floor(Math.random() * 9 + 1);
      const a2 = Math.floor(Math.random() * 9 + 1);
      const a3 = Math.floor(Math.random() * 9 + 1);
      nametag_01.innerHTML = this.props.names[a1] + " ,";
      nametag_02.innerHTML = this.props.names[a2] + " ,";
      nametag_03.innerHTML = this.props.names[a3];
    };

    //반복 적용
    function m1() {
      setInterval(num11, 2000);
      setInterval(num21, 2000);
      setInterval(equal1, 2000);
    }

    m1();
    var Because = () => {
      var a = ".... because you live in  " + "'" + this.props.attendee + "'";
      document.getElementById("neighbor_8").innerHTML = a;
    };

    Because();
  }

  render() {
    return (
      <div className="effects effect8">
        <div id="neighbor_briar1">{this.props.attendee} says ...</div>
        <span id="atagclass1">
          <p id="atag_011" />
          <p id="atag_021" />
          <p id="atag_031" />
        </span>
        <span id="equalclass1" />
        <span id="nameclass1">
          <p id="nametag_011" />
          <p id="nametag_021" />
          <p id="nametag_031" />
        </span>
        <div id="neighbor_8" />
      </div>
    );
  }
}

export default Effect8;
