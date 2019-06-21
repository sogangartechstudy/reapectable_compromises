import React, { Component } from "react";
import data from "../data.json";
import d3 from "d3";
import "./Screen.scss";
import Effect1 from "../effects/Effect1";
import Effect2 from "../effects/Effect2";
import Effect3 from "../effects/Effect3";
import Effect4 from "../effects/Effect4";
import Effect5 from "../effects/Effect5";
import Effect6 from "../effects/Effect6";
import Effect7 from "../effects/Effect7";
import Effect8 from "../effects/Effect8";

import ReactDOM from "react-dom";
import { readlink } from "fs";
export class Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      neighbors: data.children
    };
  }

  componentDidMount() {
    function colors(n) {
      var _colors = [
        "#F3DF89",
        "#B74F55",
        "#90B9AD",
        "#F6F6F4",
        "#6D8B6D",
        "#E46460",
        "#EB9263",
        "#22c1c3",
        "#925D60"
      ];
      return _colors[n % _colors.length];
    }

    function position() {
      this.style("left", function(d) {
        return d.x + "%";
      })
        .style("top", function(d) {
          return d.y + "%";
        })
        .style("width", function(d) {
          return d.dx + "%";
        })
        .style("height", function(d) {
          return d.dy + "%";
        });
    }

    //가로 세로 길이
    var win_w = window.innerWidth * 0.9;
    var win_h = window.innerHeight * 0.9;

    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
      width = win_w - margin.left - margin.right,
      height = win_h - margin.top - margin.bottom;

    var treemap = d3.layout
      .treemap()
      .size([100, 100])
      .padding(3)
      .value(function(d) {
        return d.attendee;
      })
      .sort(function(a, b) {
        return a.value - b.value;
      });

    var div = d3.select(".treemap");
    var node = div
      .datum(data)
      .selectAll(".node")
      .data(treemap.nodes)
      .enter()
      .append("div")
      .attr("class", function(d, i) {
        return "node node" + i;
      })
      .attr("id", function(d, i) {
        return d.neighbor;
      })
      .call(position)
      .style("background", function(d, i) {
        return colors(i);
      });

    //트랜지션 효과
    node
      // .attr("class", "update")
      .transition()
      .duration(10000)
      .styleTween("fill-opacity", () => d3.interpolateNumber(1, 0));
    // .remove();

    node
      .append("div")
      .attr("class", "enter")
      .transition()
      .duration(20000)
      .style("fill-opacity", 1);

    // var canvas = node
    //   .select(".treemap")
    //   .append("canvas")
    //   .attr("width", function(d, i) {
    //     return d.dx;
    //   })
    //   .attr("height", function(d, i) {
    //     return d.dy;
    //   });

    // var ctx = canvas.node().getContext("2d");

    // console.log(canvas);

    const effectNum = 8;
    let divs = [];
    let effect = [];

    //랜덤으로 안돌게 일단 수정
    let effectAdd = (cityNum, neigborNum, num) => {
      let randomNum = Math.floor(Math.random() * effectNum);
      switch (randomNum) {
        // switch (num) {
        case 0:
          return (
            <Effect1
              attendee={data.children[cityNum].children[neigborNum].neighbor}
              names={data.children[cityNum].children[neigborNum].names}
              word={data.children[cityNum].children[neigborNum].word}
            />
          );
          break;
        case 1:
          return (
            <Effect2
              attendee={data.children[cityNum].children[neigborNum].neighbor}
              names={data.children[cityNum].children[neigborNum].names}
              word={data.children[cityNum].children[neigborNum].word}
            />
          );
          break;
        case 2:
          return (
            <Effect3
              attendee={data.children[cityNum].children[neigborNum].neighbor}
              names={data.children[cityNum].children[neigborNum].names}
              word={data.children[cityNum].children[neigborNum].word}
            />
          );
          break;
        case 3:
          return (
            <Effect4
              attendee={data.children[cityNum].children[neigborNum].neighbor}
              names={data.children[cityNum].children[neigborNum].names}
              word={data.children[cityNum].children[neigborNum].word}
            />
          );
          break;
        case 4:
          return (
            <Effect5
              attendee={data.children[cityNum].children[neigborNum].neighbor}
              names={data.children[cityNum].children[neigborNum].names}
              word={data.children[cityNum].children[neigborNum].word}
            />
          );
          break;
        case 5:
          return (
            <Effect6
              attendee={data.children[cityNum].children[neigborNum].neighbor}
              names={data.children[cityNum].children[neigborNum].names}
              word={data.children[cityNum].children[neigborNum].word}
            />
          );
          break;
        case 6:
          return (
            <Effect7
              attendee={data.children[cityNum].children[neigborNum].neighbor}
              names={data.children[cityNum].children[neigborNum].names}
              word={data.children[cityNum].children[neigborNum].word}
            />
          );
          break;
        case 7:
          return (
            <Effect8
              attendee={data.children[cityNum].children[neigborNum].neighbor}
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
          document.getElementById(data.children[i].children[j].neighbor)
        );
        effect.push(effectAdd(i, j, (i * 3 + j) % effectNum));
        // effect.push(effectAdd(i, j));
      }
    }

    for (let i = 0; i < divs.length; i++) {
      ReactDOM.render(effect[i], divs[i]);
    }
  }
  render() {
    return (
      <div id="screen-con">
        <div className="treemap" />{" "}
        {/* {this.state.neighbors &&
                  this.state.neighbors.map(city => {
                    return city.children.map(neighbor => {
                      return (
                        <Effect1
                          attendee={neighbor.neighbor}
                          names={neighbor.names}
                          word={neighbor.word}
                        />
                      );
                    });
                  })} */}{" "}
      </div>
    );
  }
}

export default Screen;
