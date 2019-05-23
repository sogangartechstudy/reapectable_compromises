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
    var nameArray_6 = [];
    var namepopup_6 = () => {
      for (var i = 0; i < this.props.names.length; i++) {
        nameArray_6.push(this.props.names[i]);
      }

      nameArray_6.sort();
      c = nameArray_6.join(", ");
    };

    namepopup_6();
    var phrase = c + " is " + "<< " + this.props.word[1] + " >>";

    function drawCircle() {
      var word = phrase.split("");
      var quantity = word.length;
      var radius = 100;
      var padding = 10;
      var radians = 3.14;
      var angle = 360 / (2 * Math.PI);

      var point = Math.PI / quantity;

      var step = (2 * Math.PI) / quantity;

      for (var i = 0, j = 0; i < radians; i += point, j++) {
        var cat_oppos = Math.sin(step * j) * radius;
        var cat_attach = Math.cos(step * j) * radius;
      }

      var point = Math.PI / quantity;

      var step = (2 * Math.PI) / quantity;

      for (var i = 0, j = 0; i < radians; i += point, j++) {
        var cat_oppos = Math.sin(step * j) * radius;
        var cat_attach = Math.cos(step * j) * radius;

        var elm = document.createElement("div");
        elm.innerHTML = word[j];
        elm.classList.add("dot");

        elm.style.top = padding + cat_oppos + "px";
        elm.style.left = padding + cat_attach + "px";
        elm.style.transform = "rotate(" + (angle * (step * j) + 90) + "deg)";

        document.getElementById("test").appendChild(elm);
      }
    }

    drawCircle();
    // //텍스트 데이터에서 뽑아와서 랜덤하게 적용
    // const text_01 = document.getElementById("text_01");
    // const text_02 = document.getElementById("text_02");
    // const text_03 = document.getElementById("text_03");

    // var num = () => {
    //   const a1 = Math.floor(Math.random() * 9 + 1);
    //   const a2 = Math.floor(Math.random() * 9 + 1);
    //   const a3 = Math.floor(Math.random() * 9 + 1);
    //   text_01.innerHTML = this.props.word[a1] + ",";
    //   text_02.innerHTML = this.props.word[a2] + ",";
    //   text_03.innerHTML = this.props.word[a3] + ",";
    // };

    var Because = () => {
      var a = ".... because you live in " + "'" + this.props.attendee + "'";
      document.getElementById("neighbor_6").innerHTML = a;
    };

    //반복 적용

    // function m() {
    //   setInterval(num, 5000);
    // }

    Because();
    //m();
  }

  render() {
    return (
      <div className="effects effect6">
        {/* {this.props.attendee} */}
        <div id="test" />
        <div id="name_6" />
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
