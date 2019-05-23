import React, { Component } from "react";
import data from "../data.json";
import "./Effect3.scss";

//You are
export class Effect3 extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.canvasRef = React.createRef();
  }
  static defaultProps = {
    names: "기본이름",
    attendee: "100",
    word: "기본이름"
  };

  componentDidMount() {
    //이름 불러와서 띄어쓰기 및 효과 적용

    var c;
    var nameArray_3 = [];
    var namepopup_3 = () => {
      for (var i = 0; i < this.props.names.length; i++) {
        nameArray_3.push(this.props.names[i]);
      }

      nameArray_3.sort();
      c = document.getElementById("name_3").innerHTML = nameArray_3.join(", ");
    };

    namepopup_3();

    //텍스트 데이터에서 뽑아와서 랜덤하게 적용
    const text_01 = document.getElementById("text_01");
    const text_02 = document.getElementById("text_02");
    const text_03 = document.getElementById("text_03");

    var num = () => {
      const a1 = Math.floor(Math.random() * 9 + 1);
      const a2 = Math.floor(Math.random() * 9 + 1);
      const a3 = Math.floor(Math.random() * 9 + 1);
      text_01.innerHTML = this.props.word[a1] + ",";
      text_02.innerHTML = this.props.word[a2] + ",";
      text_03.innerHTML = this.props.word[a3] + ",";
    };

    var Because = () => {
      var a = ".... because you live in " + "'" + this.props.attendee + "'";
      document.getElementById("neighbor_3").innerHTML = a;
    };

    //반복 적용

    function m() {
      setInterval(num, 5000);
    }

    Because();
    m();
  }

  render() {
    return (
      <div className="effects effect3">
        <div id="name_3" />

        <div id="text_01"> </div>
        <div id="text_02"> </div>
        <div id="text_03"> </div>
        <div id="neighbor_3" />
      </div>
    );
  }
}

export default Effect3;
