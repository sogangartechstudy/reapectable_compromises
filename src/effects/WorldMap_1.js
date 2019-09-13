import React, { Component } from "react";
import { geoOrthographic, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import "./WorldMap_1.scss";

class WorldMap_1 extends Component {
  constructor() {
    super();
    this.state = {
      opacity: 0,
      display: "none",
      distance: 0,
      words: [],
      rotation: 0,
      w: window.innerWidth,
      h: window.innerHeight,
      worldData: [],
      cities: [
        {
          name: "Tokyo",
          coordinates: [139.6917, 35.6895],
          population: 3
        },
        {
          name: "Jakarta",
          coordinates: [106.865, -6.1751],
          population: 2
        },
        {
          name: "Delhi",
          coordinates: [77.1025, 28.7041],
          population: 1
        },
        {
          name: "Manila",
          coordinates: [120.9842, 14.5995],
          population: 4
        }
      ]
    };
  }
  projection() {
    return geoOrthographic()
      .scale(600)
      .translate([this.state.w / 2, this.state.h / 2])
      .rotate([this.state.rotation]);
  }

  // changing = () => {
  //   let num = 0;
  //   setInterval(() => {
  //     this.setState({opacity });
  //     num++;
  //   }, 5000);
  // };

  // http://bl.ocks.org/tlfrd/df1f1f705c7940a6a7c0dca47041fec8
  //   getDistance = city => {
  //     const coordinates = city.coordinates;
  //     const gdistance = geoDistance(
  //       coordinates,
  //       this.projection().invert([1782, 1250])
  //     );
  //     if (gdistance > 1.57) {
  //       this.setState({
  //         display: "none"
  //       });
  //     } else {
  //       this.setState({
  //         display: "inline"
  //       });
  //     }
  //   };
  // return gdistance > 1.57 ? 'none' : 'inline'

  componentDidMount() {
    // let num = 0;
    // this.changing();

    fetch("https://unpkg.com/world-atlas@1/world/110m.json").then(response => {
      if (response.status !== 200) {
        console.log(`There was a problem: ${response.status}`);
        return;
      }
      response.json().then(worldData => {
        this.setState({
          worldData: feature(worldData, worldData.objects.countries).features
        });
      });
    });
  }

  componentWillMount() {
    // clearInterval(this.changing());
  }

  render() {
    window.requestAnimationFrame(() => {
      this.setState({
        rotation: this.state.rotation + 0.5,
        opacity: this.state.opacity + 0.001
      });
      // this.getDistance();
    });
    return (
      <div id="screenMap">
        <div className="geomap">
          <svg
            width={this.state.w}
            height={this.state.h}
            viewBox={`0 0 ${this.state.w} ${this.state.h}`}
          >
            <g className="r">
              {this.state.worldData.map((d, i) => (
                <path
                  key={`path-${i}`}
                  d={geoPath().projection(this.projection())(d)}
                  className="country"
                  //fill={"black"}
                  strokeLinejoin={"round"}
                  strokeWidth={0.5}
                  fill={`rgba(64,224,208,${(1 / this.state.worldData.length) *
                    i})`}
                  opacity={this.state.opacity}
                  //stroke="cyan"
                  strokeWidth={0.5}
                />
              ))}
            </g>
            <g className="markers">
              {this.state.cities.map((city, i) => (
                <circle
                  cx={this.projection()(city.coordinates)[0]}
                  cy={this.projection()(city.coordinates)[1]}
                  r={city.population * 10}
                  fill={"#FF0000"}
                  className="marker"
                  style={{ display: this.state.display }}
                />
              ))}
              {/* {this.state.cities.map((city, i) => (
                <text
                  className="markers_text"
                  x={this.projection()(city.coordinates)[0] + 60}
                  y={this.projection()(city.coordinates)[1] - 60}
                  fill="#FFFFFF"
                  style={{ fontSize: "80px" }}
                >
                  I am hungry!!!!!!!
                </text>
              ))} */}
              {/* {this.state.cities.map((city, i) => (
                <line
                  x1={this.projection()(city.coordinates)[0]}
                  y1={this.projection()(city.coordinates)[1]}
                  x2={this.projection()(city.coordinates)[0] + 60}
                  y2={this.projection()(city.coordinates)[1] - 40}
                  stroke="red"
                />
              ))} */}
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

export default WorldMap_1;
