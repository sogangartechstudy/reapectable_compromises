import React, { Component } from "react";
import { $, jQuery } from "jquery";
import data from "../data.json";
import "./Effect5.scss";

export class Effect5 extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    var textArray_name = [];
    for (var i = 0; i < this.props.names.length; i++) {
      textArray_name.push(this.props.names[i]);
    }
    var textArray = [];
    for (var i = 0; i < this.props.word.length; i++) {
      textArray.push(this.props.word[i]);
    }
    textArray_name.sort();
    document.getElementsByClassName("typed-name")[0].innerHTML =
      textArray_name.join(", ") + " are ";

    const typingDelay = 200;
    const erasingDelay = 100;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing"))
          cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(
          charIndex
        );
        charIndex++;
        setTimeout(type, typingDelay);
      } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
      }
    }

    function erase() {
      if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing"))
          cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(
          0,
          charIndex - 1
        );
        charIndex--;
        setTimeout(erase, erasingDelay);
      } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
      }
    }

    var Because = () => {
      var a = "Because you live in " + "'" + this.props.attendee + "'";
      document.getElementById("neighbor_5").innerHTML = a;
    };

    document.addEventListener("DOMContentLoaded", function() {
      // On DOM Load initiate the effect
      if (textArray.length) setTimeout(type, newTextDelay + 500);
    });

    Because();
  }

  render() {
    return (
      <div className="effects effect5">
        <div id="name_5" />
        <div class="container">
          <p>
            <div class="typed-name" /> <span class="typed-text" />
            <span class="cursor">&nbsp;</span>
          </p>
        </div>
        <div id="neighbor_5" />
      </div>
    );
  }
}

export default Effect5;
