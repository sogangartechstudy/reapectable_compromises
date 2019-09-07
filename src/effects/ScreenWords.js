import React, { Component } from "react";
import "./ScreenWords.scss";
//import data from "../data.json";
import $ from "jquery";
import Fade from "react-reveal/Fade";
import WorldMap_1 from "./WorldMap_1";
import { getData, getReady, sendData } from "../Backend/GetJson";

export class ScreenWords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ["a", "b", "c", "d", "e"],
      opacity: 0
    };
  }

  componentDidMount() {
    sendData("lebanon");

    $(document).ready(function() {
      var width = $(window).width();
      var height = $(window).height();

      getData("2019", "08", "20").then(metadata => {
        var data = {
          main: "all",
          children: []
        };

        let index = 0;
        let word_index = 0;
        // console.log("metadata:", metadata);
        metadata.forEach(element => {
          data.children.push(element);
          // console.log("data: ", data);
          $("<div></div>")
            .appendTo($("#FeatureWords"))
            .attr("class", "neighbors");

          element.children.forEach(result => {
            result.word = [];

            $(".neighbors").each(function(index) {
              $(this).attr({
                id: "neighbor_" + index
              });
            });

            $("<div></div>")
              .appendTo($("#neighbor_" + index))
              .attr("class", "neighborName")
              .text(result.neighborhood);

            $(".neighborName").each(function(index) {
              $(this).attr({
                id: "neighborId_" + index
              });
            });

            //실제 implementation
            // sendData(result.neighborhood).then(wordData => {
            //   var neighborArray = [];
            // });

            var neighborArray = [];
            var wordsArray = [];

            getReady()
              .then(result_ => {
                // console.log("result: ", result, "element: ", element);

                if (result.neighborhood == result_.neighbor) {
                  //console.log("word", result_.word);
                  result.word.push(result_.word);
                  neighborArray.push(result.neighborhood);
                  wordsArray.push(result_.word);
                } else {
                  neighborArray.push(result.neighborhood);
                  result.word.push("nothing is here");
                  wordsArray.push([
                    "nothing is here",
                    "nothing is here",
                    "nothing is here",
                    "nothing is here",
                    "nothing is here",
                    "nothing is here",
                    "nothing is here",
                    "nothing is here",
                    "nothing is here",
                    "nothing is here"
                  ]);
                }
                var returnword = {
                  wordsArray: wordsArray,
                  neighborArray: neighborArray
                };

                // console.log(returnword);
                return returnword;
              })
              .then(commit => {
                commit.wordsArray.forEach(word_ => {
                  word_.forEach(word_1 => {
                    console.log(word_index);

                    var left = Math.floor(Math.random() * (width - 100));
                    var top = Math.floor(Math.random() * (height - 100));
                    $("<div></div>")
                      .appendTo($("#neighborId_" + word_index))
                      .attr("class", "words")
                      .text(word_1)
                      .css({
                        left: left,
                        top: top,
                        // right: right,
                        // bottom: bottom,
                        "z-index": 300,
                        "font-size": Math.floor(Math.random() * 330) + "%"
                      });
                  });
                });

                // Add id attribute named 'neighborId_(num)' to div class named 'neighborName'

                // Add id attribute named 'wordNode_(num)' to div class named 'words'
                $(".words").each(function(word_index) {
                  $(this).attr({
                    id: "wordNode_" + parseInt(word_index / 10)
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
                  var target_ = document.querySelectorAll(
                    "#neighborId_" + node
                  );

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
                word_index++;
                //default: 8000
              });
            // this.changing();
          });
          index++;
        });
      });
    });
    //   changing = () => {
    //     let num = 0;
    //     setInterval(() => {
    //       this.setState({ opacity: this.state.opacity + 0.1 });
    //       num++;
    //     }, 500);
    //   };
  }

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
