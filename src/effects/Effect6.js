import React, { Component } from "react";
import "./Effect6.scss";

//Blotter
export class Effect6 extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    names: "기본이름",
    attendee: "100",
    word: "기본이름"
  };

  componentDidMount() {
    var c;
    var nameArray_1 = [];
    var namepopup_1 = () => {
      for (var i = 0; i < this.props.names.length; i++) {
        nameArray_1.push(this.props.names[i]);
      }

      nameArray_1.sort();
      c = document.getElementById("name_1").innerHTML = nameArray_1.join(", ");
    };

    //var nameArray_1 = [];

    // var textArray_1 = [];
    // for (var i = 0; i < this.props.word.length + 1; i++) {
    //   textArray_1.push(this.props.word[i]);
    // }
    //이름 띄어쓰기 및 스타일 적용
    // var c= null;

    // var namepopup = () => {
    //   for (var i = 0; i < this.props.names.length; i++) {
    //     nameArray_1.push(this.props.names[i]);
    //   }

    //   nameArray_1.sort();
    //   c = document.getElementById("title_bg").innerHTML =
    //     "Hi! " + nameArray_1.join(", ") + " Thanks for seeing me!";
    // };

    // namepopup();

    var Blotterpop = () => {
      var Blotter = window.Blotter;
      var SlidingDoorMaterial = window.Blotter.SlidingDoorMaterial;
      var textArray_num = Math.floor(Math.random() * 9 + 1);

      var message = this.props.word[textArray_num];

      var text = new Blotter.Text(message, {
        family: "serif",
        size: 70,
        fill: "#000000",
        paddingLeft: 40,
        paddingRight: 40
      });

      var customValues = {
        uDivisions: 15,
        uDivisionWidth: 0.25,
        uSpeed: 0.2,
        uAnimateHorizontal: true,
        uFlipAnimationDirection: true
      };
      var material = new Blotter.SlidingDoorMaterial();

      material.uniforms.uDivisions.value = customValues.uDivisions;
      material.uniforms.uDivisionWidth.value = customValues.uDivisionWidth;
      material.uniforms.uSpeed.value = customValues.speed;
      material.uniforms.uAnimateHorizontal.value =
        customValues.uAnimateHorizontal;
      material.uniforms.uFlipAnimationDirection.value =
        customValues.uFlipAnimationDirection;

      var blotter = new Blotter(material, {
        texts: text
      });

      let el = document.getElementById("blotter_1");
      var scope = blotter.forText(text);
      scope.appendTo(el);
      console.log(message);
    };
    var num6 = () => {
      Blotterpop();
    };

    function m1() {
      setInterval(num6, 1000);
    }

    m1();
    namepopup_1();

    let delay = 5000;

    let timerId = setTimeout(function request() {
      num6();
      timerId = setTimeout(request, delay);
    }, delay);

    // document.addEventListener("DOMContentLoaded", function() {
    //   setInterval(message, typingDelay + 900);
    // });

    // var start = null;

    // var formula = 0.5;
    // var d = 0.001;
    // function step(timestamp) {
    //   if (!start) start = timestamp;
    //   var progress = timestamp - start;
    //   formula = formula + d;

    //   // el.style.transform = "translateX(" + Math.min(progress / 10, 200) + "px)";
    //   if (progress < 500000) {
    //     window.requestAnimationFrame(step);
    //     if (formula > 5 || formula < -1) {
    //       formula = formula - d;
    //     }
    //   }
    // }

    // window.requestAnimationFrame(step);

    var Because = () => {
      var a = "Because you live in " + "'" + this.props.attendee + "'";
      document.getElementById("neighbor_6").innerHTML = a;
    };

    Because();
  }

  render() {
    return (
      <div className="effects effect1">
        {/* {this.props.attendee} */}
        <div id="name_1" />
        <div id="blotter_1" />
        <div id="title">
          <h1 id="title_bg" />
          <div id="title_text" />

          <div id="neighbor_6" />
        </div>
        {/* <div ref={container => (this.container = container)} />) */}
      </div>
    );
  }
}

export default Effect6;
