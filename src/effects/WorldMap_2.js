import React, { Component } from "react";
import { geoGraticule, geoDistance, geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import "./WorldMap_2.scss";

class WorldMap_2 extends Component {
  constructor() {
    super();
    this.state = {
      opacity: 1,
      display: "inline",
      distance: 0,
      words: [],
      worldData: [],
      showText: false,
      w: window.innerWidth,
      h: window.innerHeight,

      cities: [
        // {
        //   name: "Pittsburgh",
        //   coordinates: [-79.9959, 40.4406],
        //   population: 30
        // },
        // {
        //   name: "Korea",
        //   coordinates: [128.4179, 36.7783],
        //   population: 2
        // }
        // {
        //   name: "1",
        //   coordinates: [-80.9959, 41.4406],
        //   population: 9
        // },
        // {
        //   name: "2",
        //   coordinates: [-76.9959, 20.4406],
        //   population: 3
        // },
        // {
        //   name: "3",
        //   coordinates: [-70.9959, 12.4406],
        //   population: 3
        // },
        // {
        //   name: "4",
        //   coordinates: [-73.9959, 42.4406],
        //   population: 3
        // },
        // {
        //   name: "5",
        //   coordinates: [-75.9959, 43.4406],
        //   population: 3
        // },
        // {
        //   name: "6",
        //   coordinates: [-72.9959, 43.4406],
        //   population: 3
        // },
        // {
        //   name: "7",
        //   coordinates: [-99.9018, 31.9686],
        //   population: 8
        // },
        // {
        //   name: "Newyork",
        //   coordinates: [-74.006, 40.7128],
        //   population: 10
        // },
        // {
        //   name: "Scottsdale",
        //   coordinates: [-111.925278, 33.501324],
        //   population: 4
        // },
        // {
        //   name: "Woodbridge",
        //   coordinates: [-74.290001, 40.560001],
        //   population: 9
        // },
        // {
        //   name: "Davenport",
        //   coordinates: [-90.590836, 41.543056],
        //   population: 10
        // },
        // {
        //   name: "California",
        //   coordinates: [-119.4179, 36.7783],
        //   population: 4
        // }
      ]
    };
  }

  projection() {
    return geoMercator()
      .scale(500)
      .translate([this.state.w / 2, this.state.h / 2]);
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
    // window.requestAnimationFrame(() => {
    //   this.setState({
    //     opacity: this.state.opacity + 0.02
    //   });
    //   // this.getDistance();
    // });
    var color_1 = Math.random() * 100;
    return (
      <div id="screenMap_2">
        <div className="geomap_2">
          <svg
            width={this.state.w - 120}
            height={this.state.h}
            viewBox={`0 0 ${this.state.w} ${this.state.h}`}
          >
            <g className="r_2">
              {this.state.worldData.map((d, i) => (
                <path
                  key={`path-${i}`}
                  d={geoPath().projection(this.projection())(d)}
                  className="country_2"
                  fill={"black"}
                  stroke-width={10}
                  fill={`rgba(${color_1},233,233,${(1 /
                    this.state.worldData.length) *
                    i})`}
                  opacity={this.state.opacity}
                  stroke="cyan"
                  strokeWidth={0.5}
                />
              ))}
            </g>
            <g className="markers_2">
              {this.state.cities.map((city, i) => (
                <circle
                  key={`marker-${i}`}
                  cx={this.projection()(city.coordinates)[0]}
                  cy={this.projection()(city.coordinates)[1]}
                  r={city.population * 1}
                  fill={"#94D7D6"}
                  className="marker_2"
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

export default WorldMap_2;
