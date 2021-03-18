// ===================
// Samuel Maddox Notes
// ===================
// Good job with splitting up code across multiple JS files. This can aid in readability. If you're
// not already aware, code that is imported first index.html gets ran first. Also, code imported 
// later in the index.html file can reference variables and functions that are defined in previously
// imported files. It's a good idea to make a comment at the top of JS files as to what 
// variables/functions it will use from other files, and what those files are. Later on we'll
// show you better ways to make use of multiple JS files.
// ===================
// End Samuel Notes
// ===================

const eventAPIKey = 'gE0vIThWEHkWajQ5c8zJtOurSipLrsoy';
const eventData = document.querySelector('#event-data');
const searchButtonEvent = document.querySelector('#search-button');
const userInputEvent = document.querySelector('#city-input');
const eventTitle = document.querySelector('.eventsTitle');

// Called on click and used to display the event elements pulled from the API
function displayEvents(eventOrString) {

    // ===================
    // Samuel Maddox Notes
    // ===================
    // The comment I have in the weatherapi.js file about the if/else statement can also apply
    // below.
    // ===================
    // End Samuel Notes
    // ===================

    //The displayEvents function is run via two different ways.  One is via the user input string of the city name, and one is on the click event when the previously searched cities list button is pushed.
    //This if/else statement determines how to "get" the city name (based on whether it is accessed via the click event or string user input) when displayEvents is called.
    if (eventOrString instanceof Event) {
        var city = userInput.value;
        eventOrString.preventDefault();
    } else {
        var city = eventOrString;
    }

    eventData.innerHTML = '';

    // Fetches the ticketmaster API based on the city the user inputs
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=gE0vIThWEHkWajQ5c8zJtOurSipLrsoy&city=${city}`)
        .then(response => response.json())
        // ===================
        // Samuel Maddox Notes
        // ===================
        // I sometimes fine it easier to write named functions in global scope and pass them in to
        // the .then(), instead of defining an annonymous function in line; especial when the 
        // function will contain many lines.
        // Also, good use of the arrow functions here.
        // ===================
        // End Samuel Notes
        // ===================
        .then(data => {

            var today = new Date();


            // ===================
            // Samuel Maddox Notes
            // ===================
            // See example code I wrote in the weatherapi.js file for an example of an 
            // array.forEach() function. Could be useful here.
            // ===================
            // End Samuel Notes
            // ===================
            // Loops through the events within the city searched and if the date of the event is within 8 days of the current date, then it displays the desired event elements
            for (i = 0; i < data._embedded.events.length; i++) {

                //This variable is getting the event date from the API
                var eventDate = data._embedded.events[i].dates.start.localDate;

                // ===================
                // Samuel Maddox Notes
                // ===================
                // The hard coded 8 here is what we'd call a magic number. A magic number is a 
                // hardcoded whose existence is not easily determined. Why is this 8? Why can or 
                // can't it be 9, 10, 7. 6.5? It is almost always better to save a number into a 
                // named variable. Example: const NUMBER_OF_CARDS_IN_DECK = 52. In your case you
                // could write const NUMBER_OF_EVENT_DAYS_TO_SHOW = 8. Passing the number into a 
                // function, which has a paramter name for that slot, gave me a clue to it's 
                // significance. Otherwise I would have really been left guessing.
                // 
                // As a general rule, in most cases 0 and 1 are not magic numbers, as they are 
                // constaly used as a starting value or used to increment. Sometimes 2 is not a 
                // magic number. Example, we can use 2 to determine if a value is even or 
                // odd (if x % 2 === 0 then number is even). In this case it's obvious what the 
                // number 2 is used for. All other numbers are almost always a magic number.
                // ===================
                // End Samuel Notes
                // ===================
                if (isWithinTimeSpan(eventDate, today, 8)) {
                  
                    var div1 = document.createElement("div");
                    var div2 = document.createElement("div");
                    var div3 = document.createElement("div");
                    var div4 = document.createElement("div");
                    
                    div1.innerHTML = `<h4>Event Name: ${data._embedded.events[i].name}</h4>`;
                    div2.innerHTML = `<p style="font-size:20px">Event Date: ${data._embedded.events[i].dates.start.localDate}</p>`;
                    div3.innerHTML = `<img src = ${data._embedded.events[i].images[0].url} style="height:200px"></img><br><br>`;
                    div4.innerHTML = `<a href = "${data._embedded.events[i].url}" style="font-size:25px" target="_blank">Get Tickets Here</a><br><br>`;
                    eventTitle.innerHTML = `${city} Events`;

                    eventData.appendChild(div1);
                    eventData.appendChild(div2);
                    eventData.appendChild(div3);
                    eventData.appendChild(div4);

                } 
            };
            if (eventData.innerHTML == "") {
                var div5 = document.createElement("div");
                div5.innerHTML = `<h5>No Events Occuring This Week</h5>`;
                eventData.appendChild(div5);
            }
        });
};

// ===================
// Samuel Maddox Notes
// ===================
// Good job making small helper functions. Functions that do a single thing are always good. Keeping
// them small can aid in debugging. It also helps readability. It is easier to determine the 
// purpouse of a function if it is small. Bigger functions requires me to remember more about what
// that function is doing. If a function gets too big it might be better for that function
// to act more as a manager, delegating work to smaller helper functions.
// ===================
// End Samuel Notes
// ===================

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
    // .padStart is formatting the day and month to be in 2-digit formatting to match the API format.
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    formatedDate = yyyy + '-' + mm + '-' + dd;
    return formatedDate;
}

searchButtonEvent.addEventListener('click', displayEvents);
