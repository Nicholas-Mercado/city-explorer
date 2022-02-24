import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import "./App.css"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Weather from './Weather';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      city: '',
      cityData: {},
      error: false,
      errorMessage: '',
      cityWeather:[],
      cityMovie:[],
    }
    // console.log(this.state);
  }
  
  handleCityInput = (e) => {
    e.preventDefault();
    this.setState({
      city: e.target.value
    })
  };
  
  getCityData = async (e) => {
    e.preventDefault();
    
  try {
    let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);
    
    this.setState({
      cityData: cityData.data[0] 
    })
    } catch (error) {

      this.setState({
        error:true,
        errorMessage: `You have a Error: ${error.response.status}` 
      })
    }

    this.handleWeather();
    this.handleMovie();
  }
  handleWeather = async () => {
  try {    
   
    let cityWeather = await axios.get(`${process.env.REACT_APP_SERVER}/weather?lat=${this.state.cityData.lat}&lon=${this.state.cityData.lon}`);
    // console.log(cityWeather);
    this.setState({
      cityWeather: cityWeather.data,
    })
    } catch (error) {
      this.setState({
        error:true,
        errorMessage: `You have a Error: ${error.response.status}` 
      })

    }
  }

  handleMovie = async () => {
    try {             
      // changed queary to searchQueary
      let cityMovie = await axios.get(`${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.city}`);
      console.log(cityMovie);
      this.setState({
        cityMovie: cityMovie.data,
      })
      
      } catch (error) {
        this.setState({
          error:true,
          errorMessage: `You have a Error: ${error.response.status}` 
        })
  
      }
    }


render(){
  // console.log(this.state.cityWeather);
  let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=14`;
  // console.log("app state" ,this.state);
  return(
    <>
      <h1> City Explorer 4</h1>
      <Form onSubmit={this.getCityData}>
        <Form.Label>
          <Form.Control type="text" onInput={this.handleCityInput}/>
        </Form.Label>
          <Button type="submit">Explore!</Button>
      </Form>
      {
        this.state.error 
        ? 
        
        <p>{this.state.errorMessage}</p>
        :
       <Card style={{ width: '36rem' }}>
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
      }
      <Row xs={1} sm={2} md={3} lg={3} className="mt-5">
      {/* can i cahnge day to cityWeather */}
              {this.state.cityWeather.map((day, index) => (
                <Col key={index}>
                  <Weather 
                    cityWeather={day}
                    city={this.state.city}
                    />
                </Col>
              ))}
            </Row> 
    </>
  )
}
};

export default App;



