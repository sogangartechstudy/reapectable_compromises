//neighborhood_data가져오는 곳
var obj = {
  main: "all",
  children: [
    {
      city: "a ",
      children: [
        { neighbor: "a", attendee: 1, names: ["a", "b", "c"], word: ["a"] }
      ]
    }
  ]
};

export async function getData(YEAR, MONTH, DAY) {
  let response = await fetch(
    `https://staging.projectamelia.ai/pusherman/respectable_compromises/neighborhoods?showdate=${YEAR}-${MONTH}-${DAY}`
  ); //should be changed after launching the show

  if (response.ok) {
    //Json 파일로 parsing
    let json_ = response.json();
    console.log(json_);
    let result = await json_;
    for (var i = 0; i < result.children.length; i++) {
      for (var j = 0; j < result.children[i].children.length; j++) {
        getReady(YEAR, MONTH, DAY, result.children[i].children[j].neighborhood);
        // let word_ = getReady(json_.children[i].children[j].neighborhood);
        // json_.children[i].children[j].word = word_;
        // console.log(json_.children[i].children[j].word);
        return {
          neighbor: result.children[i].children[j].neighborhood,
          attendee: result.children[i].children[j].attendee
        };
      }
    }
  } else {
    console.log("HTTP-Error_1: " + response.status);
  }
}

//neighborhood_data를 보내는 곳
// //jihyun server에서 가져오는 데이터
// //Neighborhood와 word를 비교해서 맞는 word를 리턴해준다.

export async function getReady(YEAR, MONTH, DAY, neighborhood) {
  let response = await fetch(
    `http://52.42.89.244:5000/outputs?neighbor=unknown`
  );

  if (response.ok) {
    let json = await response.json();
    let word = json.children;
    let string_word = JSON.stringify(word);
    //console.log(string_word);
    // getData_post(YEAR, MONTH, DAY, word);
  }
}

// export async function getData_post(YEAR, MONTH, DAY, word) {
//   let response = await fetch(
//     `https://staging.projectamelia.ai/pusherman/respectable_compromises/neighborhoods?showdate=${YEAR}-${MONTH}-${DAY}`,
//     {
//       method: "POST",
//       // mode: "no-cors",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8"
//       },
//       body: word
//     }
//   ); //should be changed after launching the show

//   if (response.ok) {
//     let json = await response.json();
//     console.log(json);
//   } else {
//     console.log("HTTP-Error_1: " + response.status);
//   }
// }

export function retrieveAllUserData() {
  //Pusherman에서 API받아옴

  getData("2019", "08", "20");
}
