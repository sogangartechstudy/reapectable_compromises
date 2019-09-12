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
