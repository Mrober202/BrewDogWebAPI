var app = function(){
  var url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestComplete)

  showList(JSON.parse(localStorage.getItem("savedThatBeer")))
}

var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
};

var requestComplete = function() {
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var beers = JSON.parse(jsonString);
  var beer = beers[0];
  populateList(beers);
};

var populateList = function(beers) {
  var select = document.querySelector("select");
  beers.forEach(function(beer) {
    var li = document.createElement("option");
    li.text = beer.name;
    select.appendChild(li);
  })
  select.addEventListener("change", function(){
    showList(beers[this.selectedIndex - 1]);
    save(beers[this.selectedIndex - 1]);
  })
};

var showList = function(beer) {
  var ul = document.getElementById("beer-list");
  ul.innerHTML = '';
  var listItem1 = document.createElement("ul");
  listItem1.innerText = "Name: " + beer.name 
  var listItem2 = document.createElement("ul");
  listItem2.innerText = "Description: " + beer.description 
  var listItem3 = document.createElement("ul");
  listItem3.innerText = "Percentage: " + beer.abv + "%"
  var listItem4 = document.createElement("img");
  listItem4.src = beer.image_url  
  listItem4.className = "photo";

  ul.appendChild(listItem1);
  ul.appendChild(listItem2);
  ul.appendChild(listItem3);
  ul.appendChild(listItem4);
  }

  var save = function(beer) {
    var jsonThatBeer = JSON.stringify(beer)
    localStorage.setItem("savedThatBeer", jsonThatBeer);
  }

window.addEventListener('load', app);