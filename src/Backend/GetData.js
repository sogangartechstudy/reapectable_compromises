// import data from "../data.json";

// var NODATA = Error("token holder has no usable data");
// var BADREQUEST = Error("bad request (ex. invalid token)");
// var word_list = [];
// var neighborhood_list = [];
// var attendee_num = [];

// // from Amelia에서 받아오는 데이터 : 한 사람의 정보만을 받아오는 듯
// // export async function getData(userData) {
// //   const token = userData;
// //   const url =
// //     "https://staging.projectamelia.ai/pusherman/respectable_compromises/neighborhoods";
// //   const request = await fetch(`${url}?token=${token}`, {
// //     method: "GET",
// //     mode: "no-cors"
// //   });
// //   if (request.status == 200) {
// //     var copy = request.json();
// //     console.log("copy: ", copy);
// //     let result = await copy;

// //     if (result[0].children[0]) {
// //       console.log("has data");
// //       const name = result[0].children[0].city[0].name;

// //       return { name: name, neighbor: neighborhood };
// //     } else {
// //       return NODATA;
// //     }
// //   } else if (request.status == 204) {
// //     // User has no usable data... this is a good time to make the appeal
// //     // that they go on the app and share more!
// //     console.log("User has no usable data");
// //     return [];
// //   } else {
// //     console.log("SOMETHING BAD HAPPENED!");
// //     console.log("bad token? CORB error? fetch returned null? broken endpoint?");
// //   }
// // }

// // TODO: year-month-day 공연 날짜에 맞춰 바꾸기

// export async function getData(YEAR, MONTH, DAY) {
//   let response = await fetch(
//     `https://staging.projectamelia.ai/pusherman/respectable_compromises/neighborhoods?showdate=${YEAR}-${MONTH}-${DAY}`
//   ); //should be changed after launching the show

//   if (response.ok) {
//     let json = await response.json();
//     for (var i = 0; i < json.children.length; i++) {
//       for (var j = 0; j < json.children[0].children.length; j++) {
//         neighborhood_list.push(json.children[i].children[j].neighborhood);
//         attendee_num.push(json.children[i].children[j].attendee);
//         //console.log(neighborhood_list);
//         //console.log(attendee_num);
//       }
//     }
//   } else {
//     neighborhood_list.push(data.children[0].children[0].neighbor);
//     console.log("HTTP-Error_1: " + response.status);
//   }
// }

// //jihyun server에서 가져오는 데이터
// //Neighborhood와 word를 비교해서 맞는 word를 리턴해준다.

// export async function sendData(neighborhood) {
//   let response = await fetch(
//     `http://52.42.89.244:5000/estimator?neighbor=${neighborhood}`
//   );

//   if (response.ok) {
//     // let startIndex = 0;
//     // let json = await response.json();
//     // for (var i = 0; i < json[0].children.length; i++) {
//     //   if (json[0].children[i].neighbor.includes(neighborhood)) {
//     //     word_list.push(json[0].children[i].word);
//     //     console.log(word_list);
//     //     break;
//     //   } else {
//     //     startIndex += 1;
//     //   }
//     //   if (startIndex === json[0].children.length - 1) {
//     //     return json[0].children[0].neighbor["unknown"];
//     //   }
//     // }
//   } else {
//     ///만약 data에 들어있는 파일 아니면, data.json파일에서 불러올 것

//     word_list.push(data.children[0].children[0].word);
//     //console.log(word_list);
//     console.log("HTTP-Error_2: " + response.status);
//   }
// }

// export function retrieveAllUserData() {
//   //Pusherman에서 API받아옴
//   getData("2019", "08", "20").then(() => {
//     neighborhood_list.forEach(element => {
//       sendData(element);
//     });
//   });
// }
