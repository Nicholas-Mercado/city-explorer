import React from 'react';
import Card from 'react-bootstrap/Card';



class Weather extends React.Component{
render(){
  // console.log(this.props.cityWeather);
  return(
    <>
      
      <Card>
        <Card.Body>
          <Card.Text>{this.props.cityWeather.date}</Card.Text>
          <Card.Text>{this.props.cityWeather.description}</Card.Text>
        </Card.Body>    
      </Card>
    </>
  )
};
}
export default Weather;