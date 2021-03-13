const weatherAPIKey = "c979757ff3364fdbc7788b954c2541a8";
const searchButton = document.querySelector('#search-button');
const datePicker = document.querySelector('.date-picker');
const userInput = document.querySelector('#city-input');

var cityList = [];
var cityStorage = localStorage;

// When the user searches for a city, this function adds it to the list of previously searched cities in the form of a clickale button.
function retrievePrevSearch() {
    if (cityStorage.getItem("pastCitySearch") != undefined) {
        cityList = JSON.parse(cityStorage.getItem("pastCitySearch"));

        var newRecentSearchLink = $("<a href=\"\#\"></a>");
        // cityList.Length-1 prevents a city for showing up in the previously searched list multiple times
        newRecentSearchLink.attr("data-city", cityList[cityList.length - 1]);
        newRecentSearchLink.text(cityList[cityList.length - 1]);
        newRecentSearchLink.attr("id", 'recentSearchItemID');
        newRecentSearchLink.attr("class", "recentSearchItem list-group-item list-group-item-action");
        $("#prevCity").prepend(newRecentSearchLink);
    };
};

// This function saves the city search to local storage.
function savePrevSearch() {
    cityStorage.setItem("pastCitySearch", JSON.stringify(cityList));
};

// This function fetches the API based on the user city input and then calls the week's forecast function.
function getCityWeather(eventOrString) {

    //We run the getCityWeather function two ways in our js file.  One is via the user input string of the city name, and one is on the click event when the city storage button is pushed.
    //This if/else statement determines how to "get" the city name (based on whether it is accessed via the event or string) when getCityWeather is called.
    if (eventOrString instanceof Event) {
        var city = userInput.value;
        eventOrString.preventDefault();
    } else {
        var city = eventOrString;
    }


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}`)
        .then(response => response.json())
        .then(data => {
            var cityName = document.querySelector('.city-name');
            var nameVal = data.name;
            cityName.innerHTML = `${nameVal} Weather Forecast`;

            cityList.push(nameVal);
            savePrevSearch();

            //This if/else statement says if the eventOrString is running the instance of the button click of the previously searched cities, then call the retrievePrevSearch funciton.
            // We need this because we only want the retrievePrevSearch to run one time (in the instance of when the user originally inputs the city name). 
            // If we didn't have this, when the user clicked the previous city button, it would keep appending that city to the previous searched button list.
            if (eventOrString instanceof Event) {
                retrievePrevSearch();
            };

            displayWeekForecast(data);
        });
};

// Week forecast function that is called above within the above function of the search event listener
function displayWeekForecast(data) {
    var latitude = data.coord.lat;
    var longitude = data.coord.lon;

    var cardDate0 = document.querySelector('.day-0-date');
    var cardIcon0 = document.querySelector('.day-0-icon');
    var cardTemp0 = document.querySelector('.day-0-temp');
    var cardHum0 = document.querySelector('.day-0-humidity');

    var cardDate1 = document.querySelector('.day-1-date');
    var cardIcon1 = document.querySelector('.day-1-icon');
    var cardTemp1 = document.querySelector('.day-1-temp');
    var cardHum1 = document.querySelector('.day-1-humidity');

    var cardDate2 = document.querySelector('.day-2-date');
    var cardIcon2 = document.querySelector('.day-2-icon');
    var cardTemp2 = document.querySelector('.day-2-temp');
    var cardHum2 = document.querySelector('.day-2-humidity');

    var cardDate3 = document.querySelector('.day-3-date');
    var cardIcon3 = document.querySelector('.day-3-icon');
    var cardTemp3 = document.querySelector('.day-3-temp');
    var cardHum3 = document.querySelector('.day-3-humidity');

    var cardDate4 = document.querySelector('.day-4-date');
    var cardIcon4 = document.querySelector('.day-4-icon');
    var cardTemp4 = document.querySelector('.day-4-temp');
    var cardHum4 = document.querySelector('.day-4-humidity');

    var cardDate5 = document.querySelector('.day-5-date');
    var cardIcon5 = document.querySelector('.day-5-icon');
    var cardTemp5 = document.querySelector('.day-5-temp');
    var cardHum5 = document.querySelector('.day-5-humidity');

    var cardDate6 = document.querySelector('.day-6-date');
    var cardIcon6 = document.querySelector('.day-6-icon');
    var cardTemp6 = document.querySelector('.day-6-temp');
    var cardHum6 = document.querySelector('.day-6-humidity');

    var cardDate7 = document.querySelector('.day-7-date');
    var cardIcon7 = document.querySelector('.day-7-icon');
    var cardTemp7 = document.querySelector('.day-7-temp');
    var cardHum7 = document.querySelector('.day-7-humidity');

    // Fetches the 8-Day forecast and populates the HTML to the cooresponding cards
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,hourly,minutely,alerts&units=imperial&appid=${weatherAPIKey}`)
        .then(response => response.json())
        .then(data => {

            //Current Day
            var tempValue0 = data.daily[0].temp.day;
            var humidValue0 = data.daily[0].humidity;
            cardDate0.innerHTML = moment.unix(data.daily[0].dt).format("M/DD/YYYY");
            cardIcon0.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png">`;
            cardTemp0.innerHTML = `Temperature:<br> ${tempValue0} °F`;
            cardHum0.innerHTML = `Humidity:<br> ${humidValue0}%`;

            //Day One
            var tempValue1 = data.daily[1].temp.day;
            var humidValue1 = data.daily[1].humidity;
            cardDate1.innerHTML = moment.unix(data.daily[1].dt).format("M/DD/YYYY");
            cardIcon1.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png">`;
            cardTemp1.innerHTML = `Temperature: ${tempValue1} °F`;
            cardHum1.innerHTML = `Humidity: ${humidValue1}%`;

            //Day Two
            var tempValue2 = data.daily[2].temp.day;
            var humidValue2 = data.daily[2].humidity;
            cardDate2.innerHTML = moment.unix(data.daily[2].dt).format("M/DD/YYYY");
            cardIcon2.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png">`;
            cardTemp2.innerHTML = `Temperature: ${tempValue2} °F`;
            cardHum2.innerHTML = `Humidity: ${humidValue2}%`;

            //Day Three
            var tempValue3 = data.daily[3].temp.day;
            var humidValue3 = data.daily[3].humidity;
            cardDate3.innerHTML = moment.unix(data.daily[3].dt).format("M/DD/YYYY");
            cardIcon3.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png">`;
            cardTemp3.innerHTML = `Temperature: ${tempValue3} °F`;
            cardHum3.innerHTML = `Humidity: ${humidValue3}%`;

            //Day Four
            var tempValue4 = data.daily[4].temp.day;
            var humidValue4 = data.daily[4].humidity;
            cardDate4.innerHTML = moment.unix(data.daily[4].dt).format("M/DD/YYYY");
            cardIcon4.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png">`;
            cardTemp4.innerHTML = `Temperature: ${tempValue4} °F`;
            cardHum4.innerHTML = `Humidity: ${humidValue4}%`;

            //Day Five
            var tempValue5 = data.daily[5].temp.day;
            var humidValue5 = data.daily[5].humidity;
            cardDate5.innerHTML = moment.unix(data.daily[5].dt).format("M/DD/YYYY");
            cardIcon5.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}@2x.png">`;
            cardTemp5.innerHTML = `Temperature: ${tempValue5} °F`;
            cardHum5.innerHTML = `Humidity: ${humidValue5}%`;

            //Day Six
            var tempValue6 = data.daily[6].temp.day;
            var humidValue6 = data.daily[6].humidity;
            cardDate6.innerHTML = moment.unix(data.daily[6].dt).format("M/DD/YYYY");
            cardIcon6.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.daily[6].weather[0].icon}@2x.png">`;
            cardTemp6.innerHTML = `Temperature: ${tempValue6} °F`;
            cardHum6.innerHTML = `Humidity: ${humidValue6}%`;

            //Day Seven
            var tempValue7 = data.daily[7].temp.day;
            var humidValue7 = data.daily[7].humidity;
            cardDate7.innerHTML = moment.unix(data.daily[7].dt).format("M/DD/YYYY");
            cardIcon7.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.daily[7].weather[0].icon}@2x.png">`;
            cardTemp7.innerHTML = `Temperature: ${tempValue7} °F`;
            cardHum7.innerHTML = `Humidity: ${humidValue7}%`;
        });

};

$(document).on('click', "#recentSearchItemID", function () {
    getCityWeather(this.dataset.city);
    displayEvents(this.dataset.city);
});

// Listens for the search button click to then call the getCity Weather function
searchButton.addEventListener('click', getCityWeather);



