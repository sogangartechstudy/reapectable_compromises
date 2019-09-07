import { async } from "q";
// // TODO: year-month-day 공연 날짜에 맞춰 받아올 것

export async function getData(YEAR, MONTH, DAY) {
  let response = await fetch(
    `https://staging.projectamelia.ai/pusherman/respectable_compromises/neighborhoods?showdate=${YEAR}-${MONTH}-${DAY}`
  ); //should be changed after launching the show

  if (response.ok) {
    var data = {
      main: "all",
      children: []
    };
    //Json 파일로 parsing
    let json_ = await response.json();

    // let commit = await json_.children.forEach(element => {
    //   data.children.push(element);
    //   getReady().then(function(result) {
    //     for (var i = 0; i < data.children.length; i++) {
    //       for (var j = 0; j < data.children[i].children.length; j++) {
    //         if (data.children[i].children[j].neighbor === result.neighbor) {
    //           data.children[i].children[j].word = result.word;
    //         } else data.children[i].children[j].word = ["a...", "b..."];
    //       }
    //     }
    //   });
    // });
    // console.log(json_.children);
    return json_.children;
    // return data;
  } else {
    console.log("HTTP-Error_1: " + response.status);
  }
}

export async function getReady() {
  let response = await fetch(
    `http://52.42.89.244:5000/outputs?neighbor=unknown`
  );

  if (response.ok) {
    let json = await response.json();
    let word_list = [];
    let data;
    for (var i = 0; i < json.children[0].word.length; i++) {
      word_list.push(json.children[0].word[i][0]);
      data = { neighbor: "unknown", word: word_list };
    }

    // console.log(`${neighborhood}`, word_list);
    // console.log(data);
    return data;
  } else {
    console.log("bad access");
  }
}

export async function sendData(neighbor) {
  const word2vec = {
    neighbor: neighbor
  };
  fetch(`http://52.42.89.244:5000/estimator`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(word2vec)
  }).then(res => {
    return res.json();
  });
  // .then(words => {
  //   let word_list = [];
  //   word_list.push(words);
  //   console.log(word_list);
  //   return word_list;
  //   // this.setState({ words: words });
  // });
}

// export async function getNeighbor() {}

// export function retrieveAllUserData() {
//   //Pusherman에서 API받아옴

//   getData("2019", "08", "20");
//   // console.log(data);
//   // return data;
// }
