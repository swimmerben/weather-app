import React from 'react'
import PropTypes from 'prop-types';

const WeatherDay = (props) => {
  let style = {
    marginTop: "15px",
    background: "#fff",
    borderRadius: "3px",
    border: "1px solid #bdbab9",
    padding: 15,
    overflowX: "scroll",
  }

  return (
    <div style={style}>
      <p>{`${props.dayData.time[0].weekday_name}, ${props.dayData.time[0].month_name} ${props.dayData.time[0].mday} `}</p>

      <table className="forecast forecast-table">
        <thead>
          <tr>
            <th>TIME</th>
            {props.dayData.time.map((e, idx) => <th key={idx}>{e.civil}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Temp (°{props.scale})</td>
            {props.dayData.temp.map((e, idx) => (
              <td data-label={props.dayData.time[idx].civil} key={idx}>
                <div data-label={props.dayData.condition[idx].condition}>{props.scale==="F" ? e.english : e.metric}
                <img style={{ position: "relative", top:4, width:20, height:20}} src={props.dayData.condition[idx].icon_url} alt="conditions" />
                </div>
              </td>)
            )}
          </tr>
          <tr className="hide-on-mobile">
            <td>Forecast</td>
            {props.dayData.condition.map((e, idx) => <td title={e.condition} key={idx}>{e.condition}</td>)}
          </tr>
        </tbody>
      </table>
    </div>

  )
}

WeatherDay.propTypes = {
  dayData: PropTypes.object,
  scale: PropTypes.string.isRequired,
};


export default WeatherDay