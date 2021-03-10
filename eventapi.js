const eventAPIKey = '4b42a0d39fec9c53fd432a1594cb3bf5';
const eventData = document.querySelector('#flight-data');
const searchButtonEvent = document.querySelector('#search-button');
const userInputEvent = document.querySelector('#city-input');


function displayEvents(event) {
    event.preventDefault();

    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=     &city=${userInputEvent.value}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
        });
};

searchButtonFlight.addEventListener('click', displayEvents);
