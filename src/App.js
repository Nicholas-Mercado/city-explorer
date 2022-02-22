import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import "./App.css"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      city: '',
      cityData: {}
    }
  }

  handleCityInput = (e) => {
    e.preventDefault();
    this.setState({
      city: e.target.value
    })
  };
  
  getCityData = async (e) => {
    e.preventDefault();
    

    let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);
    
    this.setState({
      cityData: cityData.data[0]
    })
    console.log(cityData.data[0]);
  }

  
render(){
  // console.log(process.env.REACT_APP_LOCATIONIQ_API_KEY)
  let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=14`;
  

  return(
    <>
      <h1> City Explorer 4</h1>
      <Form onSubmit={this.getCityData}>
        <Form.Label>
          <Form.Control type="text" onInput={this.handleCityInput}/>
        </Form.Label>
          <Button type="submit">Explore!</Button>
      </Form>
      <Card style={{ width: '40rem' }}>
      {
        this.state.cityData.lat 
        ?
        <Card.Img variant="top" src= {cityMap} />
        :
        <Card.Img/>
      }
          <Card.Body>
          <Card.Title>{this.state.cityData.display_name}</Card.Title>
          <Card.Text>{this.state.cityData.lon}</Card.Text>
          <Card.Text>{this.state.cityData.lat}</Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}
};

export default App;



