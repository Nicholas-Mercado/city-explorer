import React from 'react';
import Card from 'react-bootstrap/Card';



class Movie extends React.Component{
render(){
  return(
    <>
      <Card>
        <Card.Body>
          <Card.Text>{this.props.cityMovie.title}</Card.Text>
          <Card.Text>{this.props.cityMovie.release_date}</Card.Text>
          <Card.Text>{this.props.cityMovie.overview}</Card.Text>
        </Card.Body>    
      </Card>
    </>
  )
};
}
export default Movie;