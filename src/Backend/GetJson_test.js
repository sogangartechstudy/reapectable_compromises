import { async } from "q";
// // TODO: year-month-day 공연 날짜에 맞춰 받아올 것

var copy;

export async function getData(YEAR, MONTH, DAY) {
  let response = await fetch(
    `https://staging.projectamelia.ai/pusherman/respectable_compromises/neighborhoods?showdate=${YEAR}-${MONTH}-${DAY}`
  ); //should be changed after launching the show

  if (response.ok) {
    var data = {
      main: "all",
      children: [
        // {
        //   city: "pittsburg",
        //   children: [
        //     {
        //       neighbor: "a",
        //       attendee: 13,
        //       word: ["love"]
        //     }
        //   ]
        // }
      ]
    };
    //Json 파일로 parsing
    let json_ = await response.json();
    //각 array에 word array를 붙여서 리턴 --> data.json파일로 만들기 위해
    for (var i = 0; i < json_.children.length; i++) {
      for (var j = 0; j < json_.children[i].children.length; j++) {
        var city = json_.children[i].city;
        var attendee = json_.children[i].children[j].attendee;
        var neighbor = json_.children[i].children[j].neighborhood;

        data.children.push({
          city: city,
          children: [
            {
              neighbor: neighbor,
              attendee: attendee,
              word: []
            }
          ]
        });
      }
    }

    return [data.children, data];
  } else {
    console.log("HTTP-Error_1: " + response.status);
  }
}

// //jihyun server에서 가져오는 데이터
// //Neighborhood와 word를 비교해서 맞는 word를 리턴해준다.

export async function getReady(neighborhood, data) {
  let response = await fetch(
    `http://52.42.89.244:5000/outputs?neighbor=unknown`
  );

  if (response.ok) {
    let json = await response.json();
    let word_list = [];
    for (var i = 0; i < json.children[0].word.length; i++) {
      word_list.push(json.children[0].word[i][0]);
    }
    // console.log(`${neighborhood}`, word_list);
    return getNeighbor(neighborhood, word_list, data);
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

export async function getNeighbor(neighborhood, elements, data) {
  // console.log(`${neighborhood}`, elements);
  //console.log(obj.children.length);
  for (var i = 0; i < data.children.length; i++) {
    if (data.children[i].children[0].neighbor === neighborhood) {
      data.children[i].children[0].word.push(elements);
    }
  }
  //console.log(data);
  return data;
}

export function retrieveAllUserData() {
  //Pusherman에서 API받아옴

  getData("2019", "08", "20").then(elements => {
    elements[0].forEach(element =>
      getReady(element.children[0].neighbor, elements[1])
    );
  });
  // console.log(data);
  // return data;
}
