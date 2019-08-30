import { render } from "react-dom";
import React, { useState, useEffect } from "react";
import { useSprings, animated, interpolate } from "react-spring";
import { useGesture } from "react-use-gesture";
import { Textfit } from "react-textfit";

import "./Deck.scss";

const to = i => ({
  x: 0,
  y: 150,
  scale: 1.5,
  rot: 0,
  delay: i * 10000 * Math.random() * 1.1,
  opacity: 0
});
const from = i => ({
  x: Math.random() < 0.5 ? -8000 : 5000,
  rot: 0,
  scale: 0,
  y: -2000,
  opacity: 1
});

const trans = (r, s) =>
  ` rotateX(10deg) rotateY(${r / 5}deg) rotateZ(${r}deg) scale(${s})`;

function Deck(urls) {
  let urlArray = urls.urls;

  const [props] = useSprings(urlArray.length, i => ({
    ...to(i),
    from: from(i),
    config: {
      clamp: true,
      mass: Math.random() < 0.5 ? 0.6 : 1.5,
      tension: Math.random() < 0.5 ? 50 : 130,
      friction: Math.random() < 0.5 ? 20 : 70,
      easing: 10
      //duration: Math.random() < 0.5 ? -1000 : 1000
    },
    reset: true
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return props.map(({ x, y, rot, scale, opacity }, i) => (
    <animated.div
      key={i}
      style={{
        transform: interpolate(
          [x, y],
          (x, y) => `translate3d(${x - 200}px,${y}px,0)`
        ),
        opacity: opacity
          .interpolate({ range: [0, 0.01, 1], output: [0, 0.99, 1.0] })
          .interpolate(x => `${x}`)
      }}
    >
      {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
      <animated.div
        style={{
          transform: interpolate([rot, scale], trans)
          //backgroundImage: `url(${urlArray[i]})`
          // backgroundImage: "black"
        }}
      >
        <Textfit className="word-container" forceSingleModeWidth={true}>
          <p className="word">{urls.word[i]}</p>
        </Textfit>
      </animated.div>
    </animated.div>
  ));
}

export default Deck;
