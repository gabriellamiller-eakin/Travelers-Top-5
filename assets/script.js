var APIkey = "KpVaSg6kM14fYZ4dJK7h0ORC8ZV45xl1bChFEVSmjPhlZq3m-NPcpw7vHplOo-E_G9-LmM5GLK_dUDJWBK1WHfgOW2OKnWYUD3GsW7IWyq0AUCc-pXZSWFKEioePX3Yx";
// var clientID = "Oim9OxLlDH-gpJYFIJC0mA";
var location = $("#city-input");
var activity = $("#activity");
var searchBtn = $("#search");

var queryurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + activity + "&location=" + location;

$.ajax({
    method: "Get",
    url: queryurl,
    headers: {
        "Authorization": "Bearer " + APIkey
    }
}).then(function(response){
    console.log(response)
});