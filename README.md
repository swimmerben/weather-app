This project was created with [Create React App](https://github.com/facebookincubator/create-react-app) because I didn't want to spend time configuring a lot of the stuff that comes bundled by default in create react app



## A couple notes
I am using the [wunderground weather api](https://www.wunderground.com/weather/api/) which has been great... but for whatever reason they didn't configure their autocomplete to allow cross domain requests so I had to set up the app to use a proxy-anywhere service that may or may not work... I don't own it.  Setting up my own proxy might be a good future enhancement

I'm not using redux or any other kind of state management (apart from just generally trying to write functional code) nor am I using any kind of router as both of those would limit what could be accomplished in a 1 day period.  They could be good avenues for future enhancements.

I tried to write all of the styles directly within the JSX to keep it simple, but for some of the responsive or global stuff (like fonts) I have a single css file.  Having a better CSS strategy would also be a good future enhancement

A [demo is available here](https://weather-a4395.firebaseapp.com/) 


