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

  if (!props.forecastData) {
    return <LoadingAnimation />
  } else {
    return (
      <div style={{ padding: 15, backgroundColor: "#eee", marginTop: 5, borderRadius: "3px", border: "1px solid #bdbab9", }}>
        This page contains 10 days worth of weather forecast data for {props.locationData.full}:
        <div>
          {Object.keys(props.forecastData).map(param => {
            return (
              <WeatherDay scale={props.scale} dayData={props.forecastData[param]} key={param} />
            )
          })}
        </div>
      </div>
    )
  }

}

export default WeatherForecast