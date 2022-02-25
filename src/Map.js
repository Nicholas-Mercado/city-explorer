import React from 'react';
import Card from 'react-bootstrap/Card';

class Map extends React.Component{
  render(){
    let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.props.cityData.lat},${this.props.cityData.lon}&zoom=14`;
    return(
      <>
      {
        this.props.error 
        ? 
        
        <p>{this.props.errorMessage}</p>
        :
       <Card style={{ width: '36rem' }}>
          {
            this.props.cityData.lat 
            ?
            <Card.Img variant="top" src= {cityMap} />
            :
            <Card.Img/>
          }
          <Card.Body>
            <Card.Title>{this.props.cityData.display_name}</Card.Title>
            <Card.Text>{this.props.cityData.lon}</Card.Text>
            <Card.Text>{this.props.cityData.lat}</Card.Text>
        </Card.Body>
      </Card>
      }
      </>
    )
  };
  }
export default Map;