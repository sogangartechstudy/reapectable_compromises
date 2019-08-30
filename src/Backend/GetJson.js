import data from "../data.json";
import { async } from "q";
import * as fs from "browserify-fs";

// // TODO: year-month-day 공연 날짜에 맞춰 바꾸기

var obj = {
  main: "all",
  children: []
};

export async function getData(YEAR, MONTH, DAY) {
  let response = await fetch(
    `https://staging.projectamelia.ai/pusherman/respectable_compromises/neighborhoods?showdate=${YEAR}-${MONTH}-${DAY}`
  ); //should be changed after launching the show

  if (response.ok) {
    //Json 파일로 parsing
    let json_ = await response.json();
    //각 array에 word array를 붙여서 리턴 --> data.json파일로 만들기 위해
    for (var i = 0; i < json_.children.length; i++) {
      for (var j = 0; j < json_.children[0].children.length; j++) {
        let word_ = getReady(json_.children[i].children[j].neighborhood);

        //각 neighborhood 호출 TODO: neighborhood가 두개인 경우 호출을 못하는 듯

        json_.children[i].children[j].word = word_;
      }
    }
    return json_.children;
  } else {
    console.log("HTTP-Error_1: " + response.status);
  }
}

// //jihyun server에서 가져오는 데이터
// //Neighborhood와 word를 비교해서 맞는 word를 리턴해준다.

export async function getReady(neighborhood) {
  let response = await fetch(
    `http://52.42.89.244:5000/outputs?neighbor=unknown`
  );

  if (response.ok) {
    let json = await response.json();
    //console.log(json.children);
    //sendData(neighborhood);

    return json.children;
  }
}

export async function sendData(neighborhood) {
  const word2vec = {
    neighbor: neighborhood
  };
  let response = await fetch(`http://52.42.89.244:5000/estimator`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(word2vec)
  });

  if (response.ok) {
    // let startIndex = 0;
    let json = await response.json();

    //console.log(json);
  } else {
    ///만약 data에 들어있는 파일 아니면, data.json파일에서 불러올 것
    console.log("HTTP-Error_2: " + response.status);
  }
}

export function retrieveAllUserData() {
  //Pusherman에서 API받아옴

  getData("2019", "08", "20")
    .then(element => {
      obj.children.push(element);
      console.log(obj);
    })
    .then(() => {
      var json = JSON.stringify(obj);
      //console.log(json);
      fs.mkdir("/data", function() {
        fs.writeFile("/data/data.json", json, "utf-8", function() {
          fs.readFile("/data/data.json", "utf-8", function(err, data) {
            console.log(data);
          });
        });
      });
    });

  //   var temp = obj;
  //   console.log(temp);

  //   var json = JSON.stringify(obj, ["main", "children"]);
  //   console.log(json);
  //   fs.readFile("data.json", function(err, content) {
  //     if (err) throw err;
  //     var parseJson = JSON.parse(content);
  //     for (i = 0; i < 11; i++) {
  //       parseJson.table.push({ id: i, square: i * i });
  //     }
  //     fs.writeFile("data.json", JSON.stringify(parseJson), function(err) {
  //       if (err) throw err;
  //     });
  //   });
}

export function findNeighbor() {}
