import React, { Component } from "react";
import data from "../data.json";
import "./Effect8.scss";

export class Effect8 extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var EqualList = ["==", " "];
    const equaltag = document.getElementById("equalclass");
    var equal = () => {
      const e = Math.floor(Math.random() * 2);
      equaltag.innerHTML = EqualList[e];
    };

    //텍스트 데이터에서 뽑아와서 랜덤하게 적용 - Word
    const atag_01 = document.getElementById("atag_01");
    const atag_02 = document.getElementById("atag_02");
    const atag_03 = document.getElementById("atag_03");

    var num1 = () => {
      const a1 = Math.floor(Math.random() * 9 + 1);
      const a2 = Math.floor(Math.random() * 9 + 1);
      const a3 = Math.floor(Math.random() * 9 + 1);
      atag_01.innerHTML = this.props.word[a1] + " ,";
      atag_02.innerHTML = this.props.word[a2] + " ,";
      atag_03.innerHTML = this.props.word[a3];
    };

    //텍스트 데이터에서 뽑아와서 랜덤하게 적용 - Name
    const nametag_01 = document.getElementById("nametag_01");

    var num2 = () => {
      nametag_01.innerHTML = this.props.names;
    };
    var Because = () => {
      var a = ".... because you live in  " + "'" + this.props.attendee + "'";
      document.getElementById("neighbor_8").innerHTML = a;
    };

    //반복 적용
    function m1() {
      setInterval(num1, 5000);
      setInterval(num2, 5000);
      setInterval(equal, 1000);
    }

    Because();

    m1();
  }

  render() {
    return (
      <div className="effects effect8">
        {/* <div id="neighbor_swissvale">{this.props.attendee} says ...</div> */}
        <span id="atagclass">
          <p id="atag_01" />
          <p id="atag_02" />
          <p id="atag_03" />
        </span>
        <span id="equalclass" />
        <span id="nameclass">
          <p id="nametag_01" />
        </span>
        <div id="neighbor_8" />
      </div>
    );
  }
}

export default Effect8;
