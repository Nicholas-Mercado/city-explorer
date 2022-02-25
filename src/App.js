import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import "./App.css"
import Weather from './Weather';
import Input from './Input';
import Movie from './Movie';
import Header from './Header';
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
      
      let cityMovie = await axios.get(`${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.city}`);
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
  let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=14`;
  return(
    <>
      <Header/>
      <Input
        getCityData={this.getCityData}
        handleCityInput={this.handleCityInput}
      />
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
              {this.state.cityWeather.map((cityWeather, index) => (
                <Col key={index}>
                  <Weather 
                    cityWeather={cityWeather}
                    city={this.state.city}
                    />
                </Col>
              ))}
            </Row> 
            <Row xs={1} sm={2} md={3} lg={3} className="mt-5">
              {this.state.cityMovie.map((cityMovie, index) => (
                <Col key={index}>
                  <Movie 
                    cityMovie={cityMovie}
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



