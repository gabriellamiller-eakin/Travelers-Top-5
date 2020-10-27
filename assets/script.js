var APIkey = "KpVaSg6kM14fYZ4dJK7h0ORC8ZV45xl1bChFEVSmjPhlZq3m-NPcpw7vHplOo-E_G9-LmM5GLK_dUDJWBK1WHfgOW2OKnWYUD3GsW7IWyq0AUCc-pXZSWFKEioePX3Yx";
// empty array to save searched cities
var cities = [];

// saves searched cities to local storage
function saveToStorage() {
    localStorage.setItem("cities", JSON.stringify(cities));
};


//  runs when search button is clicked
$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    // city input by user
    var cityName = $("#input").val();
    console.log(cityName);
    // saves searched cities to local storage
    if(!cities.includes(cityName)){
        cities.push(cityName);
        saveToStorage();
    }
    
    getCityInfo(cityName)
});

// gets appropriate info from yelp APi
function getCityInfo() {
    var queryurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + activity + "&location=" + location;

    $.ajax({
        url: queryurl,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + APIkey
        }
        // displays JSON response to user
    }).then(function(response){
        console.log(response)
    });
};

// displays current searched city to user
function displayCityInfo() {
    // create buttons to append to div
    // 
}







