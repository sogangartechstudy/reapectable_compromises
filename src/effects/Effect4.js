import React, { Component } from "react";
import data from "../data.json";
import "./Effect4.scss";

export class Effect4 extends Component {
  constructor(props) {
    super(props);
  }

  //빨간박스
  componentDidMount() {
    //빨간 박스
    var nameArray_4 = [];
    var c;
    var txtElement1 = () => {
      for (var i = 0; i < this.props.names.length; i++) {
        nameArray_4.push(this.props.names[i]);
      }

      nameArray_4.sort();
      c = document.getElementById("name_4").innerHTML = nameArray_4.join(" / ");
    };

    //텍스트 데이터에서 뽑아와서 랜덤하게 적용
    const atag_01 = document.getElementById("atag_01");
    const atag_02 = document.getElementById("atag_02");
    const atag_03 = document.getElementById("atag_03");

    var num1 = () => {
      const a1 = Math.floor(Math.random() * 9 + 1);
      const a2 = Math.floor(Math.random() * 9 + 1);
      const a3 = Math.floor(Math.random() * 9 + 1);
      atag_01.innerHTML = this.props.word[a1];
      atag_02.innerHTML = this.props.word[a2];
      atag_03.innerHTML = this.props.word[a3];
    };

    //반복 적용

    function m1() {
      setInterval(num1, 1000);
    }

    var Because = () => {
      var a = "Because you are in " + "'" + this.props.attendee + "'";
      document.getElementById("neighbor_4").innerHTML = a;
    };

    Because();

    m1();

    txtElement1();
    // wordsElement1();
  }

  render() {
    return (
      <div className="effects effect4">
        <div id="name_4" />
        {/* {this.props.attendee} */}
        {/* <div class="wrapper">
          <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <path id="topSemiCircle" d="M 120, 200 a 175, 175 0 1, 1 350, 0" />
              <path id="bottomSemiCircle" d="M 100, 200 a 175, 175 0 1, 0 390, 0" />
            </defs>
            <text dy="1" font-size="37" text-anchor="middle">
              <textPath startOffset="50%" href="#topSemiCircle" aria-label="Free Games">{this.props.word}</textPath>
            </text>
            <text dy="1" font-size="37" text-anchor="middle">
              <textPath startOffset="50%" href="#bottomSemiCircle" aria-label="Touch to Pause">{this.props.word}</textPath>
            </text>
          </svg>
        </div> */}
        <div id="atag_01" />
        <div id="atag_02" />
        <div id="atag_03" />
        &nbsp;
        {/* <div id="marquee">
          <div id="mar">
            <span>{this.props.names}</span>
          </div>
          <div id="mar" aria-hidden="true">
            <span>{this.props.names}</span>
          </div>
        </div> */}
        <div id="neighbor_4" />
      </div>
    );
  }
}

export default Effect4;
