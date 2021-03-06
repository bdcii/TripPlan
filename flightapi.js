const flightAPIKey = "a2157c756amshb130de370f4d44ep16abf7jsn25ad32462e8e";
const flightData = document.querySelector('#flight-data');
const searchButtonFlight = document.querySelector('#search-button');
const userInputFlight = document.querySelector('#city-input');

fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/referral/v1.0/%7Bcountry%7D/%7Bcurrency%7D/%7Blocale%7D/%7Boriginplace%7D/%7Bdestinationplace%7D/%7Boutboundpartialdate%7D/%7Binboundpartialdate%7D?shortapikey=ra66933236979928&apiKey=%7Bshortapikey%7D", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": flightAPIKey,
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});


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
