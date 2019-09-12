import React, { Component } from "react";
import "./ScreenWords.scss";
import $ from "jquery";
import Fade from "react-reveal/Fade";
import WorldMap_1 from "./WorldMap_1";
import AmeliaDialogue from "../effects/AmeliaDialogue";
import { getNeighbor } from "../Backend/GetJson";

export class ScreenWords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ["a", "b", "c", "d", "e"],
      opacity: 0
    };
  }

  componentDidMount() {
    getNeighbor().then(data => {
      data = data[0];

      // Neighborhood Name List

      var neighborArray = [];
      for (let i = 0; i < data.children.length; i++) {
        for (let j = 0; j < data.children[i].children.length; j++) {
          neighborArray.push(data.children[i].children[j].neighborhood);
        }
      }
      console.log(neighborArray);

      // Feature Words List
      var wordsArray = [];
      for (let i = 0; i < data.children.length; i++) {
        for (let j = 0; j < data.children[i].children.length; j++) {
          for (let k = 0; k < data.children[i].children[j].word.length; k++) {
            wordsArray.push(data.children[i].children[j].word[k]);
          }
        }
      }

      $(document).ready(function() {
        var width = $(window).width();
        var height = $(window).height();

        // Append div class named 'neighbors' to div id named 'FeatureWords'
        for (var i = 0; i < neighborArray.length; i++) {
          $("<div></div>")
            .appendTo($("#FeatureWords"))
            .attr("class", function(j) {
              return "neighbors";
            });
        }

        // Add id attribute named 'neighbor_(num)' to div id named 'neighbors'
        $(".neighbors").each(function(index) {
          $(this).attr({
            id: "neighbor_" + index
          });
        });

        // Append div class named 'neighborName' to div id named 'neighbor_(num)'
        for (var i = 0; i < neighborArray.length; i++) {
          $("<div></div>")
            .appendTo($("#neighbor_" + i))
            .attr("class", function(j) {
              return "neighborName";
            })
            .text(neighborArray[i]);
        }

        for (var i = 0; i <= wordsArray.length; i++) {
          var left = Math.floor(Math.random() * (width - 100));
          var top = Math.floor(Math.random() * (height - 100));
          // var right = Math.floor(Math.random() * (width + 100));
          // var bottom = Math.floor(Math.random() * (height + 100));

          // Append div class named 'words' to div id named 'neighbor_(num)'
          $("<div></div>")
            .appendTo($("#neighbor_" + parseInt(i / 10)))
            .attr("class", function(j) {
              return "words";
            })
            .text(wordsArray[i])
            .css({
              left: left,
              top: top,
              // right: right,
              // bottom: bottom,

              "z-index": 300,
              "font-size": Math.floor(Math.random() * 380) + "%"
            });
        }

        // Add id attribute named 'neighborId_(num)' to div class named 'neighborName'
        $(".neighborName").each(function(index) {
          $(this).attr({
            id: "neighborId_" + index
          });
        });

        // Add id attribute named 'wordNode_(num)' to div class named 'words'
        $(".words").each(function(index) {
          $(this).attr({
            id: "wordNode_" + parseInt(index / 10)
          });
        });

        /********** Random Position **********/
        let h, w, nh, nw, s;

        function newPosition() {
          h = window.innerHeight - 100;
          w = window.innerWidth - 100;
          nh = Math.floor(Math.random() * h);
          nw = Math.floor(Math.random() * w);
          s = Math.floor(Math.random() * 1000);
          return [nh, nw, s];
        }

        var node = 0;

        setInterval(function() {
          var target = document.querySelectorAll("#wordNode_" + node);
          var target_ = document.querySelectorAll("#neighborId_" + node);

          var inter = setInterval(function() {
            for (let i = 0; i < target.length; i++) {
              var newq = newPosition();
              target[i].style.top = newq[0] + "px";
              target[i].style.left = newq[1] + "px";
            }
          }, 2000);

          setTimeout(function() {
            clearInterval(inter);
            for (let i = 0; i < target.length; i++) {
              target[i].style.background = "transparent";
              target[i].style.opacity = "0";
              target[i].style.color = "transperant";
              target[i].style.textShadow = "none";
            }
            for (let i = 0; i < target_.length; i++) {
              target_[i].style.display = "none";
            }
          }, 4000); //default: 4000

          for (let i = 0; i < target.length; i++) {
            target[i].style.color = "cyan";
            target[i].style.opacity = "1";
            target[i].style.textShadow =
              "1px 1px 2px black, 0 0 25px cyan, 0 0 50px white";
          }

          for (let i = 0; i < target_.length; i++) {
            target_[i].style.opacity = "0.7";
            target_[i].style.fontSize = "100px";
            target_[i].style.color = "none";
            target_[i].style.width = "100%";
            target_[i].style.height = "100%";
            target_[i].style.top = "40%";
          }

          node += 1;
        }, 5000); //default: 8000
      });
    });

    // this.changing();
  }

  //   changing = () => {
  //     let num = 0;
  //     setInterval(() => {
  //       this.setState({ opacity: this.state.opacity + 0.1 });
  //       num++;
  //     }, 500);
  //   };

  render() {
    return (
      <div>
        <Fade duration={5000}>
          <div id="FeatureWords" />
        </Fade>
        <WorldMap_1 />
      </div>
    );
  }
}

export default ScreenWords;
