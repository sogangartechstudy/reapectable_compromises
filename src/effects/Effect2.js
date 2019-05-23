import React, { Component } from "react";
import { $, jQuery } from "jquery";
import data from "../data.json";
import "./Effect2.scss";

export class Effect2 extends Component {
  constructor(props) {
    super(props);
  }

  //RollText

  componentDidMount() {
    var c_1;
    var nameArray_2 = [];

    var namepopup_2 = () => {
      for (var i = 0; i < this.props.names.length; i++) {
        nameArray_2.push(this.props.names[i]);
        c_1 = nameArray_2.join(", ");
      }

      c_1.toString();
    };

    const roll01 = document.getElementById("roll01");
    var newTextDelay = 10;

    var textArray_1 = [];
    for (var i = 0; i < this.props.word.length + 1; i++) {
      textArray_1.push(this.props.word[i]);
    }

    const num = Math.floor(Math.random() * 9 + 1);
    var word = textArray_1[num];

    var newT = ".....";
    var len = 0;
    var pause;
    var fps = 30;
    var interval = 1000 / fps;

    var g_v = 0.0; //gradient
    var v = 1;

    var animate = function() {
      setTimeout(function() {
        requestAnimationFrame(animate);
        gradientAnimation();
      }, interval);
    };

    var gradientAnimation = () => {
      // text animation

      var t =
        "......" +
        c_1 +
        ", You are " +
        "'" +
        word +
        "'" +
        "...." +
        " aren't you? ";

      len += 1;
      newT += t.charAt(len);

      if (len > t.length - 1) {
        setTimeout(function() {
          len = 0;
          newT = "";
          let num = Math.floor(Math.random() * 9 + 1);
          word = textArray_1[num];
        }, 5000);
      }

      roll01.innerHTML = newT;
    };

    var eraseAnim = function() {
      len += 1;
      newT = "";
    };

    var Because = () => {
      var a = ".... because you live in " + "'" + this.props.attendee + "'";
      document.getElementById("neighbor_2").innerHTML = a;
    };

    Because();

    namepopup_2();
    animate();
  }

  render() {
    return (
      <div className="effects effect2">
        <div id="name_01">
          <div id="roll01" />

          {/* <canvas ref="canvas"> </canvas> */}
        </div>
        <div id="neighbor_2" />
      </div>
    );
  }
}

export default Effect2;
