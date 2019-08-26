// import React, { Component } from "react";
// import d3 from "d3";
// import "./Screen.scss";
// import screenTreemap from "../effects/Treemap";
// import ScreenWords from "../effects/ScreenWords";
// import ScreenNames from "../effects/ScreenNames";
// import data from "../data.json";
// import EffectMain from "../effects/EffectMain";
// import ReactDOM from "react-dom";
// import { readlink } from "fs";
// import { callbackify } from "util";

// export class Screen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.second = React.createRef();
//     this.state = {
//       component: <EffectMain />,
//       citys: [],
//       neighbor: {},
//       ameliaDialoge: [
//         "Thank you for participating in our keynote speech.",
//         "With our sophisticated A.I technology,",
//         "we can analyze your data to reach your personality.",
//         "Find your best group we are introducing.",
//         "With your address data alone, you can tell who you are."
//         // "Do you agree? or disagree?"
//       ],
//       nowDialoge: ""
//     };
//   }

//   _get() {
//     fetch(`https://amelia-test-df1b2.firebaseio.com/children.json`)
//       .then(res => {
//         if (res.status != 200) {
//           throw new Error(res.statusText);
//         }
//         return res.json();
//       })
//       .then(neighborhood => {
//         this.setState({
//           citys: Object.keys(neighborhood),
//           neighbor: neighborhood
//         });
//       });
//   }

//   renderStage = (component, stageNum) => {
//     ReactDOM.render(component, document.querySelector("#stage-" + stageNum));
//   };

//   changing = () => {
//     let num = 0;

//     setInterval(() => {
//       this.setState({
//         nowDialoge: this.state.ameliaDialoge[num % 6]
//       });
//       num++;
//     }, 5000);
//   };

//   componentDidMount() {
//     var data1;
//     d3.json("https://amelia-test-df1b2.firebaseio.com/children.json", function(
//       json
//     ) {
//       data1 = json; // console.log(data1[0].children[0].neighbor);
//     });

//     // let num = 0;
//     this.changing();

//     function position() {
//       this.style("left", function(d) {
//         return d.x + "%";
//       })
//         .style("top", function(d) {
//           return d.y + "%";
//         })
//         .style("width", function(d) {
//           return d.dx - 1 + "%";
//         })
//         .style("height", function(d) {
//           return d.dy - 1 + "%";
//         });
//     }

//     //가로 세로 길이
//     var win_w = window.innerWidth;
//     var win_h = window.innerHeight;

//     var margin = { top: 0, right: 0, bottom: 0, left: 0 },
//       width = win_w - margin.left - margin.right,
//       height = win_h - margin.top - margin.bottom;

//     var treemap = d3.layout
//       .treemap()
//       .size([100, 100])
//       .padding(1)
//       .value(function(d) {
//         return d.attendee;
//       })
//       .sort(() => {
//         return Math.random() - 0.5;
//       });

//     var div = d3.select(".treemap");
//     var node = div
//       .datum(data)
//       .selectAll(".node")
//       .data(treemap.nodes)
//       .enter()
//       .append("div")
//       .attr("class", function(d, i) {
//         return "node node" + i;
//       })
//       .attr("id", function(d, i) {
//         return d.neighbor;
//       })
//       .call(position)
//       .style("z-index", function(d, i) {
//         return -i;
//       });

//     const effectNum = 9;
//     let divs = [];
//     let effect = [];

//     // 랜덤으로 안돌게 일단 수정
//     let effectAdd = (cityNum, neigborNum, num) => {
//       let randomNum = 8;
//       switch (randomNum) {
//         case 8:
//           return (
//             <EffectMain
//               attendee={data.children[cityNum].children[neigborNum].neighbor}
//               names={data.children[cityNum].children[neigborNum].names}
//               word={data.children[cityNum].children[neigborNum].word}
//             />
//           );
//           break;
//       }
//       return;
//     };

//     for (let i = 0; i < data.children.length; i++) {
//       for (let j = 0; j < data.children[i].children.length; j++) {
//         divs.push(
//           document.getElementById(data.children[i].children[j].neighbor)
//         );
//         effect.push(effectAdd(i, j, effectNum));
//       }
//     }

//     const displayStage = (stageNum, wholeStageNum) => {
//       document.querySelector("#stage-" + stageNum).classList.remove("none");

//       for (let i = 1; i <= wholeStageNum; i++) {
//         if (i != stageNum) {
//           document.querySelector("#stage-" + i).classList.add("none");
//         }
//       }
//     };

//     this.renderStage(<ScreenWords />, 1);
//     setTimeout(() => {
//       secondRender();
//       displayStage(2, 3);
//     }, 4000);

//     setTimeout(() => {
//       this.renderStage(<ScreenNames />, 3);
//       displayStage(3, 3);
//     }, 10000);

//     setTimeout(() => {
//       window.location.reload();
//     }, 100000);

//     const secondRender = () => {
//       for (let i = 0; i < divs.length; i++) {
//         ReactDOM.render(effect[i], divs[i]);
//       }
//     };
//   }

//   render() {
//     return (
//       <div id="screen-con">
//         <div id="stage-1" />
//         <div id="stage-2" className="none">
//           <div id="message">
//             <img src={process.env.PUBLIC_URL + "/images/logoWhite.png"} />
//             <p>{this.state.nowDialoge}</p>
//           </div>
//           <div className="treemap" />
//         </div>
//         <div id="stage-3" />
//       </div>
//     );
//   }
// }

// export default Screen;
