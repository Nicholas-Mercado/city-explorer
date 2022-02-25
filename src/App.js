import React from 'react';
import axios from 'axios';
import "./App.css"
import Map from './Map';
import WeatherDay from './WeatherDay';
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
  
  return(
    <>
      <Header/>
      <Input
        getCityData={this.getCityData}
        handleCityInput={this.handleCityInput}
      />
      <Map
        error={this.state.error}
        errorMessage = {this.state.errorMessage}
        cityData = {this.state.cityData}
      />
       <WeatherDay
        cityWeather = {this.state.cityWeather}
        city={this.state.city}
       />      
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



