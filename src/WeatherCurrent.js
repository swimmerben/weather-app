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




  if (props.currentData) {
    return (
      <div style={{ ...style, background: "#eee" }}>  The current weather:
        <div style={style}>
          <img src={props.currentData.icon_url} />
          Right now the weather in {props.currentData.display_location.full} is {props.currentData.weather} and the temperature is {props.currentData.temp_f} F

        </div>
      </div>
    )
  } else {
    return <LoadingAnimation />
  }

}

export default WeatherCurrent