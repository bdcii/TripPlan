const eventAPIKey = 'gE0vIThWEHkWajQ5c8zJtOurSipLrsoy';
const eventData = document.querySelector('#flight-data');
const searchButtonEvent = document.querySelector('#search-button');
const userInputEvent = document.querySelector('#city-input');


function displayEvents(event) {
    event.preventDefault();

    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=gE0vIThWEHkWajQ5c8zJtOurSipLrsoy&city=${userInputEvent.value}`)
        .then(response => response.json())
        .then(data => {
            var today = new Date();
            for (i = 0; i < data._embedded.events.length; i++) {
                var date = data._embedded.events[i].dates.start.localDate;
                if (isWithinTimeSpan(date, today, 8)) {

                    var div = document.createElement("div");
                    // Add more HTML here Kristen
                    div.innerHTML = `<img src = ${data._embedded.events[i].images[0].url} style="height:200px"></img><br><br>`;

                    eventData.appendChild(div);
                }
            };
        });
};

function isWithinTimeSpan(eventDate, currentDate, numberOfDaysAfterCurrentDate) {
    for (days = 0; days <= numberOfDaysAfterCurrentDate; days++) {
        var nextDate = getNewDateAfterNDays(currentDate, days);
        if (nextDate == eventDate) {
            return true;
        }
    }
    return false;
};

function getNewDateAfterNDays(currentDate, days) {
    var newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    var formattedNewDate = formatDate(newDate);
    return formattedNewDate;
};


function formatDate(date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    formatedDate = yyyy + '-' + mm + '-' + dd;
    return formatedDate;
}

searchButtonEvent.addEventListener('click', displayEvents);
