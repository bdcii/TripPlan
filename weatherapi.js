// ===================
// Samuel Maddox Notes
// ===================
// It is advisable to limit the number of characters on any given line. 80 or 100 are standards I've
// Seen. I helps when viewing code on smaller screens, or side by side. VSCode has a setting to add 
// a verticle ruler where you want to stop your lines. Search your setting for "ruler" and you'll 
// find it. It may have to be edited in the JSON version of your settings. Google if interested.
//
// I'm also seeing you use both vanilla JavaScript DOM functions and JQuery DOM functions. I'd
// recomend choising one or the other. It would be easy for bugs to come into play because you 
// selected an element using JavaScript DOM and tried to edit it using JQuery DOM. It also can make
// code harder to follow because my head is having to context switch betwen the two.
//
// NOTE: All code I've provided below has not been tested and may have syntax errors. Use it more
// as pseudocode trying to get a point across rather than 100% functional code.
// ===================
// End Samuel Notes
// ===================

const weatherAPIKey = "c979757ff3364fdbc7788b954c2541a8";
const searchButton = document.querySelector('#search-button');
const datePicker = document.querySelector('.date-picker');
const userInput = document.querySelector('#city-input');

var cityList = [];
var cityStorage = localStorage;

// When the user searches for a city, this function adds it to the list of previously searched 
// cities in the form of a clickale button.
function retrievePrevSearch() {
    // ===================
    // Samuel Maddox Notes
    // ===================
    // It's better to use the strictily not equal operator (!==). Google the following:
    // "javascript loose vs strict equality"
    // ===================
    // End Samuel Notes
    // ===================
    if (cityStorage.getItem("pastCitySearch") !== undefined) {
        cityList = JSON.parse(cityStorage.getItem("pastCitySearch"));

        var newRecentSearchLink = $("<a href=\"\#\"></a>");
        // cityList.Length-1 prevents a city for showing up in the previously searched list 
        // multiple times
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

// This function fetches the API based on the user city input and then calls the week's forecast 
// function.
function getCityWeather(eventOrString) {

    // ===================
    // Samuel Maddox Notes
    // ===================
    // Good job explaining why this if/else statement is needed. That certainly helps since this is 
    // an odd scenario. I think a better way to do this would be a 3 function solution.
    // Function 1: Strictly a wrapper for the fetch call with a city parameter
        function getCityWeather(city) {
            fetch(/*...city param used here...*/).then(/*...*/);
        }
    // Function 2: Handle event listner and call Function 1.
        function handleEvent(event) {
            event.preventDefault();
            getCityWeather(userInput.value);
        }
    // Function 3: City Storage Button (this one I don't think you got around to flushing out)
        function pullFromLocalStorage() {
            // Get City String from local storage, or some other way, and save to variable 'city'
            getCityWeather(city);
        }
    // ===================
    // End Samuel Notes
    // ===================


    // We run the getCityWeather function two ways in our js file.  One is via the user input string 
    // of the city name, and one is on the click event when the city storage button is pushed.
    // This if/else statement determines how to "get" the city name (based on whether it is 
    // accessed via the event or string) when getCityWeather is called.
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
// ===================
// Samuel Maddox Notes
// ===================
// HINT: If you notice yourself repeating similiar lines of code, there is probably a way to 
// simplify it. The function you wrote below my comment could be simplified to the following (and 
// some of the html in index.html could also be removed)
    function buildWeatherCards(data) {
        // NOTE: () => {...} is called an arrow function (Google it). It's the same as \
        // writing function() {...}
        // NOTE: arrays have functions. the other way we could have done this is using a for loop.
        data.daily.forEach((day) => {
            var date = moment.unix(day.dt).format("M/DD/YYYY");
            var icon = day.weather[0].icon;
            var temp = day.temp.day;
            var humidity = day.humidity;

            // Create Data Elements
            var headingEl = document.createElement('H5').setAttribute('class', 'card-title date');
            headingEl.innerHTML = date;
            
            var iconEl = document.createElement('P').setAttribute('class', 'card-text');
            iconEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png">`;
            
            var tempEl = document.createElement('P').setAttribute('class', 'card-text');
            tempEl.innerHTML = `Temperature:<br> ${temp} °F`;
            
            var humidityEl = document.createElement('P').setAttribute('class', 'card-text');
            humidityEl.innerHTML = `Humidity:<br> ${humidity}%`;

            // Create weatherCardBody and append data elements
            var weatherCardBody = document.createElement('DIV')
            weatherCardBody
                .setAttribute('class', 'card-body')
                .appendChild(headingEl)
                .appendChild(iconEl)
                .appendChild(tempEl)
                .appendChild(humidityEl)

            // Create weatherCard list item and append weatherCardBody
            var weatherCard = document.createElement('LI')
                .setAttribute('class', 'card')
                .appendChild(weatherCardBody);

            // Append weatherCard to card deck list
            document.getElementById('weather-card')
                .getElementsByClassName('card-deck')[0]
                .appendChild(weatherCard);
        });
    }   

    function displayWeekForecast(data) {
        var latitude = data.coord.lat;
        var longitude = data.coord.lon;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,hourly,minutely,alerts&units=imperial&appid=${weatherAPIKey}`)
            .then(response => response.json())
            .then(buildWeatherCards);

        document.createElement('LI')
    }
// ===================
// End Samuel Notes
// ===================

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
        // ===================
        // Samuel Maddox Notes
        // ===================
        // This function displayWeekForecast(data) defines a parameter 'data' that is a varaible 
        // that can be used anywhere within this function. Below the .then(data) also defines a 
        // parameter 'data' that may conflict with the 'data' variable defined in the above scope.
        // Be carefull to use unique names within a certain scope else you may come across 
        // unexpected errors in the future 
        // ===================
        // End Samuel Notes
        // ===================
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

// ===================
// Samuel Maddox Notes
// ===================
// This function does work because for 2 reasons. First, it should be written as follows:
    $("#recentSearchItemID").on('click', function () {
        // ...
    })
// Second, #recentSearchItemID doesn't exist on any element in the index.html
// ===================
// End Samuel Notes
// ===================

$(document).on('click', "#recentSearchItemID", function () {
    getCityWeather(this.dataset.city);
    displayEvents(this.dataset.city);
});

// Listens for the search button click to then call the getCity Weather function
searchButton.addEventListener('click', getCityWeather);



