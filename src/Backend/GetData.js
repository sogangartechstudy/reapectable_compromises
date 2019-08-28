var posts = [];
var NODATA = Error("token holder has no usable data");
var BADREQUEST = Error("bad request (ex. invalid token)");
var NEIGHBORHOODS = [];

// from Amelia에서 받아오는 데이터

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
      const attendee = result[0].children[0].city[0].attendee;

      return { neighbor: this.neighborhood, attendee: this.attendee };
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

export async function retrieveAllUserData(Input) {
  var json = getData(Input);
  let singleData = await json;
  console.log("singleData:", singleData);
}

//jihyun server에서 가져오는 데이터 :WORD와 NEIGHBORHOOD를 키-VALUE로 같이 저장할 것

export async function sendData(neighborhood) {
  let response = await fetch(
    "https://amelia-test-df1b2.firebaseio.com/children.json"
  );

  if (response.ok) {
    let json = await response.json();
    for (var i = 0; i < json[0].children.length; i++) {
      NEIGHBORHOODS.push(json[0].children[i].neighbor);
    }
    console.log(NEIGHBORHOODS);
  } else {
    alert("HTTP-Error: " + response.status);
  }
}
