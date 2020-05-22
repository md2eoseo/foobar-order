const endpoint = "https://sojuapp.herokuapp.com/";
let beerData = [];
fetchData();
function fetchData() {
  fetch(endpoint + "beertypes")
    .then((res) => res.json())
    .then((data) => data.forEach(showSingle));
}
function showSingle(data) {
  // console.log(data);
  beerData.push(data);
}

export default beerData;
