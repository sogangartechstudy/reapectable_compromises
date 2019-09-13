import React from "react";
import d3 from "d3";
import "./Treemap.scss";
//import data from "../data.json";
import EffectMain from "../effects/EffectMain";
import ReactDOM from "react-dom";
import AmeliaDialogue from "../effects/AmeliaDialogue";
import WorldMap_2 from "./WorldMap_2";
import { getNeighbor } from "../Backend/GetJson";

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
    setTimeout(() => {
      this.setState({ showText: true });
    }, 40000);

    var div = d3.select(".treemap");
    // var final = {};
    getNeighbor().then(data => {
      data = data[0];
      console.log(JSON.parse(JSON.stringify(data)));

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
          //TODO : 중복값 생기면 겹쳐서 보임
          if (d.neighborhood === "unknown") {
            if (d.state === "unknown") {
              return d.country;
            } else {
              return d.state;
            }
          } else {
            return d.neighborhood;
          }
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

      let effectAdd = (cityNum, neigborNum) => {
        let randomNum = 8;
        switch (randomNum) {
          case 8:
            return (
              <EffectMain
                //TODO : 중복값 생기면 겹쳐서 보임
                neighborhood={
                  data.children[cityNum].children[neigborNum].neighborhood
                }
                state={data.children[cityNum].children[neigborNum].state}
                country={data.children[cityNum].children[neigborNum].country}
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
          var n = data.children[i].children[j].neighborhood;
          if (data.children[i].children[j].neighborhood === "unknown") {
            if (data.children[i].children[j].state === "unknown") {
              n = data.children[i].children[j].country;
            } else {
              n = data.children[i].children[j].state;
            }
          } else {
            n = data.children[i].children[j].neighborhood;
          }
          divs.push(document.getElementById(n));
          effect.push(effectAdd(i, j, effectNum));
        }
      }

      for (let i = 0; i < divs.length; i++) {
        ReactDOM.render(effect[i], divs[i]);
      }
    });
  }

  render() {
    const { showText } = this.state;

    return (
      <div id="screenTreemap">
        <WorldMap_2 />
        <div id="message">{showText && <AmeliaDialogue />}</div>
        <div className="treemap" />
      </div>
    );
  }
}

export default Treemap;
