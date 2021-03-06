const weatherAPIKey = "c979757ff3364fdbc7788b954c2541a8";
const weatherData = document.querySelector('#weather-data');
// const flightData = document.querySelector('#flight-data');
const searchButton = document.querySelector('#search-button');
const datePicker = document.querySelector('.date-picker');
const cityList = document.querySelector('#prevCity');
const userInput = document.querySelector('#city-input')



// This function is a container to call other functions
function displayCityWeather(event) {
    event.preventDefault();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&appid=${weatherAPIKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var latitude = data.coord.lat;
            var longitude = data.coord.lon;

            console.log(data);
            // This fetch is for the current weather section
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,hourly,minutely,alerts&appid=${weatherAPIKey}`)
                .then(response => response.json())
                .then(data => {

                    console.log(data);


                })
        })
};

searchButton.addEventListener('click', displayCityWeather);



