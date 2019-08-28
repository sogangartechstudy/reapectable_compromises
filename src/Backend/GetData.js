var NODATA = Error("token holder has no usable data");
var BADREQUEST = Error("bad request (ex. invalid token)");
var word_list = [];

// from Amelia에서 받아오는 데이터 : 한 사람의 정보만을 받아오는 듯
export async function getData(userData) {
  const token = userData;
  const url =
    "https://staging.projectamelia.ai/pusherman/respectable_compromises/neighborhoods";
  const request = await fetch(`${url}?token=${token}`, {
    method: "GET",
    mode: "no-cors"
  });
  if (request.status == 200) {
    var copy = request.json();
    console.log("copy: ", copy);
    let result = await copy;

    if (result[0].children[0]) {
      console.log("has data");
      const name = result[0].children[0].city[0].name;
      const neighborhood = result[0].children[0].city[0].neighborhood;

      return { name: name, neighbor: neighborhood };
    } else {
      return NODATA;
    }
  } else if (request.status == 204) {
    // User has no usable data... this is a good time to make the appeal
    // that they go on the app and share more!
    console.log("User has no usable data");
    return [];
  } else {
    console.log("SOMETHING BAD HAPPENED!");
    console.log("bad token? CORB error? fetch returned null? broken endpoint?");
  }
}

//jihyun server에서 가져오는 데이터
//Neighborhood와 word를 비교해서 맞는 word를 리턴해준다.

export async function sendData(neighborhood) {
  let response = await fetch(
    "https://amelia-test-df1b2.firebaseio.com/children.json"
  );

  if (response.ok) {
    let startIndex = 0;
    let json = await response.json();
    for (var i = 0; i < json[0].children.length; i++) {
      if (json[0].children[i].neighbor.includes(neighborhood)) {
        word_list.push(json[0].children[i].word);
        break;
      } else {
        startIndex += 1;
      }

      if (startIndex === json[0].children.length - 1) {
        return json[0].children[0].neighbor["unknown but pittsburg!"];
      }
    }
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

export async function retrieveAllUserData(Input) {
  var Amelia_json = getData(Input);
  //각 neighborhood 에 해당하는 word를 리턴한다.
  var jihyun_json = await sendData(Amelia_json.neighbor);

  let singleData = await Amelia_json;
  console.log(word_list);
  console.log("singleData:", singleData);
}
