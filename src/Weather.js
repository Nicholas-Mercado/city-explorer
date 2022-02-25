import React from 'react';
import WeatherDay from './WeatherDay';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Weather extends React.Component{
  render(){
    return(
      <>
      <Row xs={1} sm={2} md={3} lg={3} className="mt-5">
        {this.props.cityWeather.map((cityWeather, index) => (
          <Col key={index}>
            <WeatherDay 
              cityWeather={cityWeather}
              city={this.props.city}
             />
          </Col>
              ))}
        </Row>
      </>
    )
  };
  }
export default Weather;