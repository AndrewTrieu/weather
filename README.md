# Simple Weather App

This app allows users to search for the weather in a given location. It consists of an HTML file and a JavaScript file. Check it out [here](https://andrewtrieu.github.io/weather-deploy/).

## Instructions

To use the app, simply enter a location (city, state, and country) in the form and click the "Get Weather" button. The app will display the details of the current weather of that location. If no location is provided, the app will display the weather for the user's current location as determined by their IP address.

However, due to the nature of GitHub Pages, the deployment will not work correctly. Please test it locally as the link above is for reference purpose only. Actual usage is demonstrated in the following video:

[New video.webm](https://user-images.githubusercontent.com/68151686/210859583-0eaa11bd-1ba7-4f54-9de2-866a99fc65d8.webm)

## API

This app uses the OpenWeatherMap API to retrieve weather data and the Rest Countries API to retrieve country names. It also uses the ipapi API to determine the user's current location.

## Notes

This app was built using Bootstrap for styling and layout. It also utilizes fetch() and async/await to handle API calls.
