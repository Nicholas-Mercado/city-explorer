import React from 'react';
import axios from 'axios';
import "./App.css"
import Map from './Map';
import Weather from './Weather';
import Input from './Input';
import Movies from './Movies';
import Header from './Header';

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
   
    let cityWeather = await axios.get(`${process.env.REACT_APP_SERVER_LIVE}/weather?lat=${this.state.cityData.lat}&lon=${this.state.cityData.lon}`);
    this.setState({
      cityWeather: cityWeather.data,
    })
    console.log(cityWeather);
    } catch (error) {
      this.setState({
        error:true,
        errorMessage: `You have a Error: ${error.response.status}` 
      })

    }
  }

  handleMovie = async () => {
    try {             
      
      let cityMovie = await axios.get(`${process.env.REACT_APP_SERVER_LIVE}/movies?searchQuery=${this.state.city}`);
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
       <Weather
        cityWeather = {this.state.cityWeather}
        city={this.state.city}
       />      
       <Movies
        cityMovie ={this.state.cityMovie}
        city={this.state.city} 
       />     
    </>
  )
}
};

export default App;



