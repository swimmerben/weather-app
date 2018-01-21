import React, { Component } from 'react';
import Header from "./Header.js"
import WeatherContainer from "./WeatherContainer.js"


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <WeatherContainer />
      </div>
    );
  }
}

export default App;
