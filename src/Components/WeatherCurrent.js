import React from 'react'
import LoadingAnimation from './LoadingAnimation.js'

const WeatherCurrent = (props) => {
  let style = {
    marginTop: 5,
    background: "#fff",
    borderRadius: 3,
    border: "1px solid #bdbab9",
    padding: 15,
    overflowX: "scroll",
  }

  if (!props.currentData) {
    return <LoadingAnimation />
  } else {
    return (
      <div style={{ ...style, background: "#eee" }}>  The current weather in {props.locationData.full}:
        <div style={style}>
          <img src={props.currentData.icon_url} />
          Right now the weather in {props.currentData.display_location.full} is {props.currentData.weather} and the temperature is {props.scale === "F" ? props.currentData.temp_f + "°F" : props.currentData.temp_c + "°C"}
          <table>
            <thead>
              <tr><th colSpan="2">{props.currentData.observation_time}</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Humidity</td>
                <td>{props.currentData.relative_humidity}</td>
              </tr>
              <tr>
                <td>UV Index</td>
                <td>{props.currentData.UV}</td>
              </tr>
              <tr>
                <td>Wind Direction</td>
                <td>{props.currentData.wind_dir}</td>
              </tr>
              <tr>
                <td>Wind Speed</td>
                <td>{props.currentData.wind_mph} MPH</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}

export default WeatherCurrent