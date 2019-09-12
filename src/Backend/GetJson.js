import { async } from "q";
// // TODO: year-month-day 공연 날짜에 맞춰 받아올 것

// export async function getData() {
//   let response = await fetch(
//     `https://staging.projectamelia.ai/pusherman/respectable_compromises/neighborhoods?showdate=2019-08-17&token=jdkfsniu43rf8329rfiewj382ru398ewwfu98a3rliuh3roiq3298fydasd32riu32hrd3298dh938fh2380rfhiufq`
//   ); //should be changed after launching the show

//   if (response.ok) {
//     // var data = {
//     //   main: "all",
//     //   children: []
//     // };
//     //Json 파일로 parsing

//     let json_ = await response.json();

//     // let commit = await json_.children.forEach(element => {
//     //   data.children.push(element);
//     //   getReady().then(function(result) {
//     //     for (var i = 0; i < data.children.length; i++) {
//     //       for (var j = 0; j < data.children[i].children.length; j++) {
//     //         if (data.children[i].children[j].neighbor === result.neighbor) {
//     //           data.children[i].children[j].word = result.word;
//     //         } else data.children[i].children[j].word = ["a...", "b..."];
//     //       }
//     //     }
//     //   });
//     // });
//     //console.log(json_.children);
//     return json_.children;
//     // return data;
//   } else {
//     console.log("HTTP-Error_1: " + response.status);
//   }
// }

// export async function sendData(neighbor) {
//   const word2vec = {
//     neighbor: neighbor
//   };
//   let response = await fetch(`http://52.42.89.244:5000/estimator`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(word2vec)
//   });

//   let postresult = await response.json();

//   let post_word_list = [];
//   let post_data;

//   for (var i = 0; i < postresult.word.length; i++) {
//     post_word_list.push(postresult.word[i][0]);

//     post_data = { neighborhood: neighbor, word: post_word_list };
//   }

//   //onsole.log(post_data);
//   return post_data;
// }

export async function getNeighbor() {
  let ids = await (await fetch(
    `https://staging.projectamelia.ai/pusherman/respectable_compromises/neighborhoods?showdate=2019-08-17&token=jdkfsniu43rf8329rfiewj382ru398ewwfu98a3rliuh3roiq3298fydasd32riu32hrd3298dh938fh2380rfhiufq`
  )).json();
  let ids_b = Object.assign({}, ids);
  let ids_b_child = ids_b.children.map(neighbor => neighbor.children);
  let ids_b_neighbor = ids_b_child.map(neighbor => neighbor[0].neighborhood);

  let neighbor_ids = ids.children.map(neighbor => neighbor.children);
  neighbor_ids = neighbor_ids.map(neighbor => neighbor[0].neighborhood);
  var index = 0;
  const data = Promise.all(
    neighbor_ids.map(
      async i =>
        await (await fetch(`http://52.42.89.244:5000/estimator`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ neighbor: i })
        }))
          .json()
          .then(contents => {
            let word_ = contents.word.map(element => element[0]);

            if (i === ids_b_neighbor[index]) {
              ids_b_child[index][0].word = word_;
              ids_b_child[index][0].names = word_;
              index++;
            }

            return ids_b;
          })
    )
  );

  return data;
}
