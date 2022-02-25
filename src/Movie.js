import React from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import "./Movie.css";


class Movie extends React.Component{
render(){
  return(
    <>
      <Container>
        <Card >
          <Card.Body>
            <Card.Text>{this.props.cityMovie.title}</Card.Text>
            <Card.Text>{this.props.cityMovie.release_date}</Card.Text>
            <Card.Text>{this.props.cityMovie.overview}</Card.Text>
          </Card.Body>    
        </Card>
      </Container>
    </>

  )
};
}
export default Movie;