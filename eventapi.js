const eventAPIKey = 'gE0vIThWEHkWajQ5c8zJtOurSipLrsoy';
const eventData = document.querySelector('#event-data');
const searchButtonEvent = document.querySelector('#search-button');
const userInputEvent = document.querySelector('#city-input');
const eventTitle = document.querySelector('.eventsTitle');

// Called on click and used to display the event elements pulled from the API
function displayEvents(event) {
    event.preventDefault();

    // Fetches the ticketmaster API based on the city the user inputs
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=gE0vIThWEHkWajQ5c8zJtOurSipLrsoy&city=${userInputEvent.value}`)
        .then(response => response.json())
        .then(data => {

            var today = new Date();

            // Loops through the events within the city searched and if the date of the event is within 8 days of the current date, then it displays the desired event elements
            for (i = 0; i < data._embedded.events.length; i++) {

                //This variable is getting the event date from the API
                var eventDate = data._embedded.events[i].dates.start.localDate;
                if (isWithinTimeSpan(eventDate, today, 8)) {
                    
                    var div1 = document.createElement("div");
                    var div2 = document.createElement("div");
                    var div3 = document.createElement("div");
                    var div4 = document.createElement("div");
                    
                    div1.innerHTML = `<h4>Event Name: ${data._embedded.events[i].name}</h4>`;
                    div2.innerHTML = `<p style="font-size:20px">Event Date: ${data._embedded.events[i].dates.start.localDate}</p>`;
                    div3.innerHTML = `<img src = ${data._embedded.events[i].images[0].url} style="height:200px"></img><br><br>`;
                    div4.innerHTML = `<a href = "${data._embedded.events[i].url}" style="font-size:20px" target="_blank">Get tickets here</a><br><br>`;
                    eventTitle.innerHTML = `${userInputEvent.value} Events`;

                    eventData.appendChild(div1);
                    eventData.appendChild(div2);
                    eventData.appendChild(div3);
                    eventData.appendChild(div4);
                
                }
            };
        });
};

// Function to check if a date is within a specific time span that is defined by the 3 inputs of event date, current date and number of days desired after current date
function isWithinTimeSpan(eventDate, currentDate, numberOfDaysAfterCurrentDate) {
    for (days = 0; days <= numberOfDaysAfterCurrentDate; days++) {
        var nextDate = getNewDateAfterNDays(currentDate, days);
        if (nextDate == eventDate) {
            return true;
        }
    }
    return false;
};

// Takes in the current date and adds the number of days desired to produce a new date.  It also formats that new date to match the API date format
function getNewDateAfterNDays(currentDate, days) {
    var newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    var formattedNewDate = formatDate(newDate);
    return formattedNewDate;
};

// Takes in a date and formats it so that it matches the way the API formats their event date
function formatDate(date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    formatedDate = yyyy + '-' + mm + '-' + dd;
    return formatedDate;
}

searchButtonEvent.addEventListener('click', displayEvents);
