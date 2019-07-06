import React, { Component } from 'react';
import data from '../data.json';
import d3 from 'd3';
import './Screen.scss';
import Effect1 from '../effects/Effect1';
import Effect2 from '../effects/Effect2';
import Effect3 from '../effects/Effect3';
import Effect4 from '../effects/Effect4';
import Effect5 from '../effects/Effect5';
import Effect6 from '../effects/Effect6';
import Effect7 from '../effects/Effect7';
import Effect8 from '../effects/Effect8';
import EffectMain from '../effects/EffectMain';
import ReactDOM from 'react-dom';
import { readlink } from 'fs';
export class Screen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			neighbors: data.children
		};
		this.state = {
			ameliaDialoge: [
				'Thank you for participating in our keynote speech.',
				'With our sophisticated A.I technology,',
				'we can analyze your data to reach your personality.',
				'Find your best group we are introducing.',
				'With your address data alone, you can tell who you are.',
				'Do you agree? or disagree?'
			]
		};
	}

	componentDidMount() {
		function position() {
			this.style('left', function(d) {
				return d.x + '%';
			})
				.style('top', function(d) {
					return d.y + '%';
				})
				.style('width', function(d) {
					return d.dx + '%';
				})
				.style('height', function(d) {
					return d.dy + '%';
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
			.size([ 100, 100 ])
			.padding(0)
			.value(function(d) {
				return d.attendee;
			})
			.sort(function(a, b) {
				return a.value - b.value;
			});

		var div = d3.select('.treemap');
		var node = div
			.datum(data)
			.selectAll('.node')
			.data(treemap.nodes)
			.enter()
			.append('div')
			.attr('class', function(d, i) {
				return 'node node' + i;
			})
			.attr('id', function(d, i) {
				return d.neighbor;
			})
			.call(position)
			.style('z-index', function(d, i) {
				return -i;
			});

		node.append('div').attr('class', 'enter').transition().duration(20000).style('fill-opacity', 1);

		const effectNum = 9;
		let divs = [];
		let effect = [];

		//랜덤으로 안돌게 일단 수정
		let effectAdd = (cityNum, neigborNum, num) => {
			let randomNum = 8;
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
				divs.push(document.getElementById(data.children[i].children[j].neighbor));
				effect.push(effectAdd(i, j, effectNum));
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
				<div id="message">
					<p>Hi, I'm amelia.</p>
				</div>
				<div className="treemap" />
			</div>
		);
	}
}

export default Screen;
