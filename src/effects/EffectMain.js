import React, { useState, useEffect } from "react";
import "./EffectMain.scss";
import Deck from "./Deck";
import Ticker from "react-ticker";

const EffectMain = props => {
  const [urls, setUrls] = useState([]);
  const [words, setWords] = useState([]);
  const getImageUrls = () => {
    let url = [];
    let wordArray = [];
    const length = 10;
    for (let i = 0; i < length; i++) {
      url.push(" ");
    }
    for (let i = 0; i < length; i++) {
      wordArray.push(getRandomWord());
    }

    shuffle(wordArray);

    setUrls(url);
    setWords(wordArray);
  };

  const shuffle = a => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const getRandomWord = () => {
    let param = Math.floor(Math.random() * props.word.length);
    return props.word[param];
  };
  const createName = () => {
    let array = [];
    let names = props.names.join(", ");
    return names;
  };
  useEffect(() => {
    console.log("렌더링이 완료되었습니다!");
    getImageUrls();
  }, []);

  return (
    <div className="effect-con">
      <div className="name-area">
        <Ticker speed={3} mode={"await"} height={30}>
          {({ index }) => <span class="name">{"@" + createName() + " "}</span>}
        </Ticker>
      </div>
      <div className="deck">
        <Deck urls={urls} word={words} attendee={props.attendee} />
      </div>
    </div>
  );
};
export default EffectMain;
