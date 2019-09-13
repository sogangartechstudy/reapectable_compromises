import React, { Component } from "react";
import "./AmeliaDialogue_1.scss";

class AmeliaDialogue_1 extends Component {
  static defaultProps = {
    period: 1000,
    toRotate: [
      "Data driven system is trying to understand who we are and what we like.",
      "As a result, we sometimes wonder if these systems truly understand us.",
      "If, as we worried, these systems misunderstand us, how can we solve them?",
      'The project "Respectable Compromise" visualizes the features found in people’s location data.'
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      txt: "",
      fullTxt: "",
      loopNum: 0,
      isDeleting: false
    };
  }

  componentDidMount() {
    // this._textEffect();
  }

  _textEffect() {
    let text = document.querySelector("#text02");
    let content = text.textContent;

    let init = 0;
    let letter;
    let typping;

    text.innerHTML = "";

    initAnimation();

    // setInterval(function () {
    //     initAnimation();
    // }, 100);

    // text.insertAdjacentHTML("beforeEnd", "<span id='typping'> </span>");

    function initAnimation() {
      // if (init < content.length) {
      for (let i = 0; i < content.length; i++) {
        text.innerHTML +=
          "<span class='glitch character' data-text=\"" +
          content[i] +
          '">' +
          content[i] +
          "</span>";

        letter = document.getElementsByClassName("glitch character");
        // typping = document.getElementById("typping");

        // initLetter();
        // initTypping();

        // init++;
      }
    }

    function initTypping() {
      typping.style.display = "inline-block";
      typping.style.position = "absolute";
      typping.style.bottom = "0px";
      typping.style.right = "-5px";
      typping.style.height = text.offsetHeight + "px";
      typping.style.width = "2px";
      typping.style.backgroundColor = "white";
      typping.style.animation = "Typping 1.2s infinite";
    }

    function initLetter() {
      for (let i = 0; i < letter.length; i++) {
        letter[i].style.display = "inline-block";
        letter[i].style.position = "relative";

        if (letter[i].textContent == " ") {
          letter[i].style.marginLeft = letter[i - 1].offsetWidth / 2 + "px";
        }
      }
    }
  }

  render() {
    return (
      <div>
        <a id="text01">The project</a>
        <a id="text02">"Respectable Compromise"</a>
        <a id="text03">
          visualizes the features found in people's location data.
        </a>
      </div>
    );
  }
}

export default AmeliaDialogue_1;
