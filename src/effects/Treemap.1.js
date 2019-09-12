import React, { Component } from "react";
import d3 from "d3";
import "./Treemap.scss";
//import data from "../data.json";
import EffectMain from "../effects/EffectMain";
import ReactDOM from "react-dom";
import AmeliaDialogue from "../effects/AmeliaDialogue";
import WorldMap_2 from "./WorldMap_2";
import { getData, getReady, sendData, getNeighbor } from "../Backend/GetJson";

export class Treemap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citys: [],
      state: {},
      neighbor: {},
      nowDialoge: "",
      showText: false,
      color: [],
      word: []
    };
    // this.getToken = this.getToken.bind(this);
  }

  componentDidMount() {
    getNeighbor().then(data => {
      data.map(i => {
        console.log(i.word);
      });
    });
    setTimeout(() => {
      this.setState({ showText: true });
    }, 40000);

    var div = d3.select(".treemap");
    // var final = {};
    getData("2019", "08", "20")
      .then(metadata => {
        metadata.forEach(result => {
          result.children.forEach(result_ => {
            result_.word = [];
            result_.names = [];
            //   var t_word = [];

            sendData(result_.neighborhood).then(result__ => {
              // console.log(result__.word);
              result_.word = [...result__.word];
              console.log(result_.word);
              // result_.word.push(result__.word);
              result_.names.push(["a", "b"]);

              //console.log(metadata);
            });
          });
        });

        return metadata;
      })
      .then(content => {
        var data = {
          main: "all",
          children: []
        };

        content.forEach(content_ => {
          data.children.push(content_);
        });
        return data;
      })
      .then(data => {
        let tt = data.children[0].children[0];
        console.log(tt);

        // var data1;
        // d3.json("https://amelia-test-df1b2.firebaseio.com/children.json", function(
        //   json
        // ) {
        //   data1 = json; // console.log(data1[0].children[0].neighbor);
        // });

        // let num = 0;
        // this.changing();

        function position() {
          this.style("left", function(d) {
            return d.x + "%";
          })
            .style("top", function(d) {
              return d.y + "%";
            })
            .style("width", function(d) {
              return d.dx - 1.2 + "%";
            })
            .style("height", function(d) {
              return d.dy - 1.2 + "%";
            });
        }

        //가로 세로 길이
        var win_w = window.innerWidth;
        var win_h = window.innerHeight;

        var margin = { top: 0, right: 0, bottom: 0, left: 0 },
          width = win_w - margin.left - margin.right,
          height = win_h - margin.top - margin.bottom;

        const random = (a, b) => {
          return Math.floor(Math.random() * (b - a) + a);
        };

        var treemap = d3.layout
          .treemap()
          .size([100, 100])
          //.padding(0)
          .value(function(d) {
            return d.attendee;
          })
          .sort(() => {
            return Math.random() - 0.5;
          });

        var node = div
          .datum(data)
          .selectAll(".node")
          .data(treemap.nodes)
          .enter()
          .append("div")
          .attr("class", function(d, i) {
            return "node node" + i + " color" + random(1, 10);
          })
          .attr("id", function(d, i) {
            return d.neighborhood;
          })
          .call(position)
          .style("z-index", function(d, i) {
            return -i;
          });

        function opacityRepeat() {
          d3.selectAll(".node")
            .style("opacity", "0")
            .transition()
            .duration(5000) //바꿀 것
            .ease("linear")
            .delay(function(d, i) {
              return i * 600;
            })
            .style("opacity", "1")
            .transition()
            .duration(60000)
            .style("opacity", "0");
        }

        opacityRepeat();

        const effectNum = 9;
        let divs = [];
        let effect = [];

        //랜덤으로 안돌게 일단 수정
        let effectAdd = (cityNum, neigborNum, num) => {
          let randomNum = 8;
          switch (randomNum) {
            case 8:
              return (
                <EffectMain
                  attendee={
                    data.children[cityNum].children[neigborNum].neighborhood
                  }
                  names={data.children[cityNum].children[neigborNum].names}
                  word={data.children[cityNum].children[neigborNum].word}
                />
              );
              break;
          }
          return;
        };

        for (let i = 0; i < data.children.length; i++) {
          for (let j = 0; j < data.children[i].children.length; j++) {
            divs.push(
              document.getElementById(data.children[i].children[j].neighborhood)
            );
            effect.push(effectAdd(i, j, effectNum));
          }
        }

        for (let i = 0; i < divs.length; i++) {
          ReactDOM.render(effect[i], divs[i]);
        }
      });
  }

  // componentWillUnmount() {
  //   this.abortController.abort();
  // }

  render() {
    const { showText } = this.state;

    return (
      <div id="screenTreemap">
        <WorldMap_2 />
        <div id="message">
          {showText && <AmeliaDialogue />}
          {/* <p>{this.state.nowDialoge}</p> */}
        </div>
        <div className="treemap" />
      </div>
    );
  }
}

export default Treemap;
