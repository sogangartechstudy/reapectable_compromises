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

    for (var i = 0; i < this.props.word.length; i++) {}

    var drawCircle = radius => {
      const a1 = Math.floor(Math.random() * 9 + 1);
      var phrase = "I know who you are.. You are,";
      var word = phrase.split("");
      var quantity = word.length;
      //var radius = 100;
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
    };
    var Because = () => {
      var a = ".... because you live in " + "'" + this.props.attendee + "'";
      document.getElementById("neighbor_6").innerHTML = a;
    };

    //반복 적용
    drawCircle(100);
    drawCircle(130);
    drawCircle(160);

    const round_01 = document.getElementById("round_01");
    var num_06 = () => {
      const a1 = Math.floor(Math.random() * 9 + 1);
      round_01.innerHTML = this.props.word[a1];
    };

    function m() {
      setInterval(num_06, 5000);
    }
    Because();
    m();
  }

  render() {
    return (
      <div className="effects effect6">
        <div id="test" />
        <div id="name_6">
          {this.props.names} {", you are "}
        </div>
        <div id="round_01" />
        <div id="neighbor_6" />
      </div>
    );
  }
}

export default Effect6;
