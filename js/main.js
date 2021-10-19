
    
let API = "https://rickandmortyapi.com/api/character";

// fetch(API)
//   .then((res) => res.json())
//   .then((response) => renderList(response));

async function getallData() {
    let res = await axios.get(API);
    return res.data;
}
getallData().then((data) => renderList(data));

function renderList(response) {
    let charList = response.results;
    //postToJsonServer(response.results);
    for (let i = 0; i < charList.length; i++) {
        $(".listlist").append(
            `<li class="listItem${i}"><h2>${charList[i].name}</h2></li>`
        );
        getCharInfo(charList[i].url, `listItem${i}`);
    }
}

async function getCharInfo(api, listItem) {
    let res = await axios
        .get(api)
        .then((response) =>
            $("." + listItem).append(
                `<img class="charImg" src="${response.data.image}"/><ul class="moreInfo"><li>Species: ${response.data.species}</li><li>Status: ${response.data.status}</li><li>Location: ${response.data.location.name}</li><li>Origin: ${response.data.origin.name}</li><li>Gender: ${response.data.gender}</li></ul>`
            )
        );
    // fetch(api)
    //   .then((res) => res.json())
    //   .then(
    //     (response) =>
    //       $("." + listItem).append(
    //         `<img class="charImg" src="${response.image}"/><ul class="moreInfo"><li>Species: ${response.species}</li><li>Status: ${response.status}</li><li>Location: ${response.location.name}</li><li>Origin: ${response.origin.name}</li><li>Gender: ${response.gender}</li></ul>`
    //       )
    //console.log(response)
    // );
}

// function postToJsonServer(items) {
//   console.log(items);
//   for (let i = 0; i < items.length; i++) {
//     fetch("http://localhost:3000/characters", {
//       method: "POST",
//       body: JSON.stringify(items[i]),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }).then((res) => console.log(res));
//   }
// }

async function postToJsonServer(items) {
    for (let i = 0; i < items.length; i++) {
        await axios.post("http://localhost:3000/characters", items[i]);
    }
}

async function getItems() {
    await axios
        .get("http://localhost:3000/characters")
        .then((res) => renderList2(res.data));
}

getItems();

function renderList2(results) {
    //postToJsonServer(response.results);
    console.log(results);
    for (let i = 0; i < results.length; i++) {
        $(".listlist2").append(
            `<li class="listItem${i}"><h2>${results[i].name}</h2></li>`
        );
        //getCharInfo(results[i].url, `listItem${i}`);
    }
}
