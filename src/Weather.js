import React from 'react';
import Card from 'react-bootstrap/Card';




class Weather extends React.Component{
render(){
  return(
    <>
      <Card>
        <Card.Body>
          <Card.Text>{this.props.cityWeather.date}</Card.Text>
          <Card.Text>{this.props.cityWeather.description}</Card.Text>
          <Card.Text>{this.props.cityWeather.low}</Card.Text>
          <Card.Text>{this.props.cityWeather.high}</Card.Text>
        </Card.Body>    
      </Card>
    </>
  )
};
}
export default Weather;