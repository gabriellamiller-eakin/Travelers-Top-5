// var APIkey = "KpVaSg6kM14fYZ4dJK7h0ORC8ZV45xl1bChFEVSmjPhlZq3m-NPcpw7vHplOo-E_G9-LmM5GLK_dUDJWBK1WHfgOW2OKnWYUD3GsW7IWyq0AUCc-pXZSWFKEioePX3Yx";
// empty array to save searched cities
var APIkey = "wQI1YB_KjttNT1PPg7zKwSKnHVv9r_Sy9KbRuD9mriRzd9GrekDWpbBU3RxXfajAialJr3uVtSRPckG4tJdS5CGiGU5FWh6vj2kqUH6yZS-hzOMCasKhGRqMpuWbX3Yx"
var cities = [];



// saves searched cities to local storage
function saveToStorage() {
    localStorage.setItem("cities", JSON.stringify(cities).toUpperCase());
};

// get cities from local storage
function loadFromStore() {
    cities = JSON.parse(localStorage.getItem("cities")) || [];
    // getCityInfo(cities[cities.length-1]);
};
loadFromStore();

// displays cities in local storage to user in History tab
function dislayStorage() {
    $("#history").empty();
    // let allCities = $(".vertical")

    var limit = cities.length;
    // console.log(limit)
    for (let c = 0; c < limit; c++) {
        // console.log(c);
        // console.log(cities)
        let cityViewed = $("<li>");
        cityViewed.attr("id", `${cities[c]}`);
        cityViewed.html(cities[c]);
        $("#history").prepend(cityViewed);

        cityViewed.on("click", function (event) {
            event.preventDefault();
            var currentCity = $(this).text();
            $("#input").val(currentCity);
            // console.log($(this).text());
            getCityInfo(currentCity)
          });
    };
};

dislayStorage();

var selectedOption = "";

$("#selector").on("click", "li", function(event) {
    selectedOption =$(this).attr("id");
    $(".option").text($(this).text());
});




//  runs when search button is clicked
$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    // city input by user
    var cityName = $("#input").val().toUpperCase();
    // console.log(cityName);
    // saves searched cities to local storage
    if(!cities.includes(cityName)){
        cities.push(cityName);
        saveToStorage();
    }

    getCityInfo(cityName)
    // console.log("button working");
});

// gets appropriate info from yelp APi
function getCityInfo(location) {
    var queryurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + selectedOption + "&location=" + location;
    
    $.ajax({
        url: queryurl,
        method: "GET",
        headers: {

            "Authorization": "Bearer " + APIkey
        }
        // displays JSON response to user
    }).then(function (response) {
        // console.log(response)

        // filtered list of response array to only capture businesses with a 4 star rating or higher
        var filteredList = response.businesses.filter(function(item) {
            return item.rating >= 4;
        });
        // console.log(filteredList);
        let results = $("#results");
        results.find(".myDiv").remove();

        // $(".results").html("");
        // for loop to get 5 results
        for (var i = 0; i < 5; i++) {
            var bizname = filteredList[i].name;
            var rating = filteredList[i].rating;
            var imgURL = filteredList[i].image_url;
            var url = filteredList[i].url;
            var reviewCount = filteredList[i].review_count;
            var city = filteredList[i].location.city;
            var state = filteredList[i].location.state;

            // console.log(bizname);
            // console.log(rating);
            // console.log(imgURL);
            // console.log(url);
            // console.log(reviewCount);
            // console.log(city);
            // console.log(state);



            // main div where I am dumping other divs and p tags
            var myDiv = $("<div>");
            myDiv.attr("id", `${bizname}`);
            myDiv.attr("class", "cell small-2 medium-cell-block-container btnGroup myDiv");

            // framework div
            var frameworkDiv = $("<div>");
            frameworkDiv.attr("class", "grid-x")

            //thumbnail div
            var thumbnail = $("<div>");
            thumbnail.attr("class", "small-3");
            var img = $("<img>");
            img.attr("class", "thumbnail").attr("src", `${imgURL}`).attr("id", "thumb");
            thumbnail.append(img);

            // p tag with business name
            var p = $("<p>");
            p.attr("class", "small-6");
            // p.attr("id", "");
            p.text(`${bizname}`);

            // third div
            var ratingDisplay = $("<div>");
            // var reviewCount = $("<p>").text(reviewCount);
            ratingDisplay.attr("class", "small-3");
            var rateImg = $("<img>");
            rateImg.attr("class", "rating").attr("id","stars");

            if (rating == 4) {
                rateImg.attr("src", "./assets/small_4.png");
            } else if (rating == 4.5) {
                rateImg.attr("src", "./assets/small_4_half.png");
            } else {
                rateImg.attr("src", "./assets/small_5.png");
            }
            ratingDisplay.append(rateImg);
            // ratingDisplay.append(reviewCount);

            // append everthing to main div
            frameworkDiv.append(thumbnail);
            frameworkDiv.append(p);
            frameworkDiv.append(ratingDisplay);

            myDiv.append(frameworkDiv);

            $("#results").append(myDiv);     
        };
        
  
        $(".btnGroup").on("click", function(event) {
            $(".myDiv").remove();
            var venue = $(this).attr("id").replace(/ /g,"+").trim();
            var mapsURL= "https://www.google.com/maps/embed/v1/place?key=AIzaSyCS9GaYIm_FR-7orrqrXwtQFIHnro7MfVk&q=" + venue + "," + city + "+" + state;
            var myDiv = $("<div>");
            myDiv .attr("class", "grid-y cell myDiv").attr("style", "height: 100%;");
            var iframe = $("<iframe>");
            iframe.attr("src", mapsURL);
            myDiv.append(iframe);
            $("#results").append(myDiv);
            
           
            // console.log(venue);
            // console.log(mapsURL);
            
            
            
            
        });
    });

};

