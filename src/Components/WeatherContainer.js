import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete'
import { fetchUrlWithCb } from '../Utilities/FetchHelper'
import WeatherForecast from './WeatherForecast.js'
import WeatherCurrent from './WeatherCurrent.js'
import Toggle from './Toggle.js'


class WeatherContainer extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: "",
      locationData: {},
      value: '',
      dropdownItems: [],
      scale: "F",
      error: "",
    }

    //conveniently autodetect location from ip geolookup
    fetchUrlWithCb("//api.wunderground.com/api/1d6b5c9311caaa12/conditions/hourly10day/q/autoip.json",
      response => this.transformResponse(response),
      error => {
        this.setState({ error: error.message, dropdownItems: [] })
      }
    )
  }

  changeScale = (isFarenheit) => {
    this.setState({ scale: isFarenheit ? "F" : "C" })
  }

  goToForecast = () => this.setState({ activeTab: "forecast" })
  goToCurrent = () => this.setState({ activeTab: "current" })

  bottomSegment = () => {
    const buttonStyle = {
      border: "1px solid #bbb",
      borderBottom: "",
      padding: 15,
      paddingBottom: 7,
      margin: 5,
      marginTop: 15,
      cursor: "pointer"
    }
    if (this.state.forecast !== "") {
      return (
        <div style={{ width: "90%", margin: "auto" }}>
          <div style={{ marginTop: 25 }}>
            <a style={{ ...buttonStyle, backgroundColor: this.state.activeTab === "forecast" ? "#eee" : "" }} onClick={this.goToForecast}>Forecast</a>
            <a style={{ ...buttonStyle, backgroundColor: this.state.activeTab === "current" ? "#eee" : "" }} onClick={this.goToCurrent}>Current</a>
            {this.state.activeTab === "forecast" ?
              <WeatherForecast scale={this.state.scale} locationData={this.state.locationData} forecastData={this.state.forecast} /> :
              <WeatherCurrent scale={this.state.scale} locationData={this.state.locationData} currentData={this.state.conditions} />}
          </div>
        </div>
      )
    }
  }

  transformResponse = (response) => {
    let days = {}
    let forecast = response.hourly_forecast;

    forecast.map(e => {
      let key = e.FCTTIME.mon_padded + "," + e.FCTTIME.mday_padded
      if (days[key]) {
        days[key].push(e);
      } else {
        days[key] = [e];
      }
      return e
    })

    Object.keys(days).forEach(day => {
      let rotated = {
        time: [],
        condition: [],
        temp: [],
        humidity: [],
      }

      days[day].forEach((e) => {
        rotated["time"].push(e.FCTTIME)
        rotated["condition"].push({ condition: e.condition, icon_url: e.icon_url })
        rotated["temp"].push(e.temp)
        rotated["humidity"].push(e.humidity)
      })

      days[day] = rotated;
    })

    this.setState({ activeTab: "current", forecast: days, conditions: response.current_observation, locationData: response.current_observation.display_location })
  }

  autocompleteSelect = (value, item) => {
    this.setState({ value, dropdownItems: [item], error: "", activeTab: "forecast", forecast: null, conditions: null })

    fetchUrlWithCb(`//api.wunderground.com/api/1d6b5c9311caaa12/conditions/hourly10day/q/zmw:${item.zmw}.json`,
      response => this.transformResponse(response),
      error => {
        if (error.message === "forecast is undefined") {
          this.setState({ error: error.message + " for this location. please try selecting a different location", dropdownItems: [] })
        }
        else {
          this.setState({ error: error.message, dropdownItems: [] })
        }
      }
    )
  }

  autocompleteChange = (event, value) => {
    this.setState({ value })
    if (value.length === 0) {
      this.setState({ value: "", error: "" })
    } else {
      fetchUrlWithCb(`https://cors-anywhere.herokuapp.com/http://autocomplete.wunderground.com/aq?query=${value}`,
        places => this.setState({ dropdownItems: places.RESULTS, error: "" }),
        error => this.setState({ error: error.message, dropdownItems: [] })
      )
    }
  }


  render() {
    return (

      <div style={{
        backgroundColor: "#DDD",
        width: "100%",
        maxWidth: "1300",
        margin: "auto",
        height: "auto",
      }}>
        <div style={{ width: "90%", margin: "auto" }}>
          <label htmlFor="location-autocomplete">Type in a Zip Code or City to get started</label>

          <Autocomplete
            inputProps={{
              id: 'location-autocomplete', style: {
                minWidth: 300,
                boxSizing: "border-box",
                width: "90%"
              }
            }}
            wrapperStyle={{ position: 'relative', display: 'inline-block' }}
            value={this.state.value}
            items={this.state.dropdownItems}
            getItemValue={(item) => item.name}
            onSelect={this.autocompleteSelect}
            onChange={this.autocompleteChange}
            renderMenu={children => (
              <div style={{
                position: "absolute",
                boxSizing: "border-box",
                width: "100%",
                border: "1px solid #cccccc",
                zIndex: 1,
              }}>
                {children}
              </div>
            )}
            renderItem={(item, isHighlighted) => (
              <div
                style={{
                  padding: "2px 6px",
                  cursor: isHighlighted ? "" : "default",
                  backgroundColor: isHighlighted ? "#4095bf" : "white",
                  color: isHighlighted ? "white" : ""
                }}
                key={item.zmw}
              >{item.name}</div>
            )}
          />
          <div style={{ marginTop: 5 }}>
            <Toggle onLabel="°F" offLabel="°C" changeHandler={this.changeScale} />
          </div>
          <span style={{ color: "red" }}> {this.state.error} </span>
        </div>
        {this.bottomSegment()}
      </div>
    )
  }
}


export default WeatherContainer;