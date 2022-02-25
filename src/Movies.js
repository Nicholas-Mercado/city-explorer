import React from 'react';
import Movie from './Movie';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Movies.css"

class Movies extends React.Component{
  render(){
    return(
      <>
      <Row xs={1} sm={2} md={3} lg={3} className="mt-5">
              {this.props.cityMovie.map((cityMovie, index) => (
                <Col key={index}>
                  <Movie 
                    cityMovie={cityMovie}
                    city={this.props.city}
                    />
                </Col>
              ))}
            </Row> 
      </>
    )
  };
  }
export default Movies;