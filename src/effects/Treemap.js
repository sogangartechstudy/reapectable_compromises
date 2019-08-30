import React, { Component } from "react";
import d3 from "d3";
import "./Treemap.scss";
import data from "../data.json";
import EffectMain from "../effects/EffectMain";
import ReactDOM from "react-dom";
import AmeliaDialogue from "../effects/AmeliaDialogue";
import WorldMap_2 from "./WorldMap_2";
import { retrieveAllUserData } from "../Backend/GetJson";

export class Treemap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citys: [],
      neighbor: {},
      nowDialoge: "",
      showText: false,
      year: "2019",
      month: "09",
      day: "10",
      attendee: 1
    };
    // this.getToken = this.getToken.bind(this);
  }

  // _get() {
  //   fetch(
  //     `https://staging.projectamelia.ai/pusherman/respectable_compromises/neighborhoods?showdate=${this.state.year}-${this.state.month}-${this.state.day}`
  //   )
  //     // fetch(`https://respectable-compromises.firebaseio.com//neighborhood.json`)
  //     .then(res => {
  //       if (res.status != 200) {
  //         throw new Error(res.statusText);
  //       }
  //       return res.json();
  //     })
  //     .then((neighborhood, attendee) => {
  //       this.setState({
  //         citys: Object.keys(neighborhood),
  //         neighbor: neighborhood,
  //         attendee: attendee
  //       });
  //     });
  // }

  componentDidMount() {
    // this._get();
    retrieveAllUserData();

    setTimeout(() => {
      this.setState({ showText: true });
    }, 40000);

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
      // .transition()
      // .duration(20000) //바꿀 것
      // .ease("linear")
      // .style("opacity", "0")
      // .transition()
      // .duration(30000) //바꿀 것
      // .ease("linear");
      // .style("opacity", "0")
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
        effect.push(effectAdd(i, j, effectNum));
      }
    }

    for (let i = 0; i < divs.length; i++) {
      ReactDOM.render(effect[i], divs[i]);
    }
  }

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
