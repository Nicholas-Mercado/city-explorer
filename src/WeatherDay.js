import React from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import "./WeatherDay.css"



class WeatherDay extends React.Component{
render(){
  return(
  <>
    <Container>
      <Card>
        <Card.Body>
          <Card.Text>{this.props.cityWeather.date}</Card.Text>
          <Card.Text>{this.props.cityWeather.description}</Card.Text>
          <Card.Text>{this.props.cityWeather.low}</Card.Text>
          <Card.Text>{this.props.cityWeather.high}</Card.Text>
        </Card.Body>    
      </Card>
    </Container>
  </>

  )
};
}
export default WeatherDay;