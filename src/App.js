import React, { Component } from 'react';
import WeatherHeader from "./WeatherHeader.js"
import WeatherContainer from "./WeatherContainer.js"


class App extends Component {
  render() {
    return (
      <div>
        <WeatherHeader />
        <WeatherContainer />
      </div>
    );
  }
}

export default App;
