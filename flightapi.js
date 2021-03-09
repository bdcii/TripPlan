// const flightAPIKey = "4b42a0d39fec9c53fd432a1594cb3bf5"
// const flightData = document.querySelector('#flight-data');
// const searchButtonFlight = document.querySelector('#search-button');
// const userInputFlight = document.querySelector('#city-input');


// function displayFlights(event) {
//     event.preventDefault();

//     fetch(`http://api.aviationstack.com/v1/cities?access_key=4b42a0d39fec9c53fd432a1594cb3bf5`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
            
//         })
// };

// searchButton.addEventListener('click', displayFlights);


// $.ajax({
//     url: 'http://api.aviationstack.com/v1/cities',
//     data: {
//       access_key: flightAPIKey
//     },
//     dataType: 'json',
//     success: function(apiResponse) {
//       if (Array.isArray(apiResponse['results'])) {
//         apiResponse['results'].forEach(flight => {
//           if (!flight['live']['is_ground']) {
//             console.log(`${flight['airline']['name']} flight ${flight['flight']['iata']}`,
//                 `from ${flight['departure']['airport']} (${flight['departure']['iata']})`,
//                 `to ${flight['arrival']['airport']} (${flight['arrival']['iata']}) is in the air.`);
//           }
//         });
//       }
//     }
//   });

