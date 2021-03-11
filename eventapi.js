const eventAPIKey = 'gE0vIThWEHkWajQ5c8zJtOurSipLrsoy';
const eventData = document.querySelector('#flight-data');
const searchButtonEvent = document.querySelector('#search-button');
const userInputEvent = document.querySelector('#city-input');


function displayEvents(event) {
    event.preventDefault();

    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=gE0vIThWEHkWajQ5c8zJtOurSipLrsoy&city=${userInputEvent.value}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data._embedded.events[0].images[0]);
            for (i=0; i < data._embedded.events.length; i++){
                var image = document.createElement("div");
                image.innerHTML = `<img src = ${data._embedded.events[i].images[0].url} style="height:200px"></img>`;
                eventData.appendChild(image);
            };
        });
};

searchButtonEvent.addEventListener('click', displayEvents);
