var searchHistory = [];
var week = [];
var apiKey = "47dd8dc0b57d92f216ca16e0b5525723";
var rootURL = "https://api.openweathermap.org";
var searchForm = document.querySelector("#search-form");
var searchInput = document.querySelector("#search");
var currentDay = document.querySelector("#why");
var currentTemp = document.querySelector("#temp");
var currentHumidity = document.querySelector("#humid");
var currentUvi = document.querySelector("#UV");
var currentWind = document.querySelector("#wind");
var forecastWeather = document.querySelector("#forecast");
var searchHistory = document.querySelector("#history");


var currentDay2 = document.querySelector("#today2")
var currentTemp2 = document.querySelector("#temp2")
var currentWind2 = document.querySelector("#wind2")
var currentHumidity2 = document.querySelector("#humid2")




function getLatLong(event) {
    event.preventDefault();
    console.log(event);
    var city = search.value.trim();
    var coodinatesURL = rootURL + "/geo/1.0/direct?q=" + city + "&limit=5&appid=" + apiKey;
    console.log(city);
    makeHistory();

    fetch(coodinatesURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data[0].lat, data[0].lon)
            getWeather(data[0].lat, data[0].lon)
            coodinatesURL = rootURL + "/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&exclude=hourly,daily" + "&appid=" + apiKey;
            fetch(coodinatesURL)
            .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                console.log(data)
                var fTemp = (data.current.temp - 273.15) * (9/5) + 32;
                currentTemp.innerHTML = "Current Temp: " + fTemp.toFixed(2) + "°F";
                var windS = (data.current.wind_speed);
                currentWind.innerHTML = "Current Wind Speed: " + windS + "MPH";
                var humidity = (data.current.humidity);
                currentHumidity.innerHTML = "Current Humidity:" + humidity;
                var UV = (data.current.uvi);
                currentUvi.innerHTML = "Current UV Index: " + UV;
                var DT = moment().format("MM[/]DD[/]YYYY");
                currentDay.innerHTML = city + "\n" + DT;
            })


                fetch(rootURL + "/data/2.5/forecast?q=" + city + "&appid=" + apiKey).then(function(response) {
                    return response.json();
                })
                .then(function(data){
                    console.log(data);

                    for(var i=0; i < 5; i++){
                        var day = {
                            dayNum: i,
                            temp:((data.list[i].main.temp - 273.15) * (9/5) + 32).toFixed(2) + "°F",
                            wind: data.list[i].wind.speed,
                            humidity: data.list[i].main.humidity
                        }
                        week.push(day);
                        forecastWeather.children().eq(i).append();
                    }
                    for(var i=0; i < 5; i++){
                        var date = $('<h5></h5>').text(moment().add(i + 1,'days'));
                        var status = $('<h5></h5>').text("pic");
                        var temp = $('<h5></h5>').text(week[i].temp);
                        var wind = $('<h5></h5>').text(week[i].wind);
                        var humidText = $('<h5></h5>').text(week[i].humidity);
                        forecastWeather.children().eq(i).append(date, status, wind, temp, humidText)
                    }
                })

            });

        function makeHistory(lat, lon, city) {
            console.log(lat, lon, city);
            var historyButton = document.createElement('button');
            historyButton.textContent = city
            historyButton.classList.add('history-button');
            historyButton.setAttribute('data-lat:', lat);
            historyButton.setAttribute('data-lon:', lon);
            searchHistory.appendChild(historyButton)
        }


}
function getWeather(lat, lon) {
            console.log("inside getWeather() function")
            console.log(lat, lon)
        }

        searchForm.addEventListener("submit", getLatLong);