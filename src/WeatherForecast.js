import React from 'react'
import WeatherDay from './WeatherDay.js'
import LoadingAnimation from './LoadingAnimation.js'

const WeatherForecast = (props) => {
  let style = {
    marginTop: "15px",
    background: "#fff",
    borderRadius: "3px",
    border: "1px solid #bdbab9",
    padding: 15,
    overflowX: "scroll",
  }

  if (props.forecastData) {
    return (
      <div style={{ padding: 15, backgroundColor:"#eee", marginTop:5, borderRadius: "3px", border: "1px solid #bdbab9", }}>
        <div> The place you've selected is: {props.locationData.name} </div>
        This page contains 10 days worth of weather data:
        <div>
          {Object.keys(props.forecastData).map(param => {
            return (
              <WeatherDay dayData={props.forecastData[param]} key={param}/>
            )
          })}
        </div>
      </div>
    )
  } else {
    return <LoadingAnimation/>
  }

}

export default WeatherForecast