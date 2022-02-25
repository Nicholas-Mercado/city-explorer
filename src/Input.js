import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Input extends React.Component{
  render(){
    return(
      <>
      <Form onSubmit={this.props.getCityData}>
        <Form.Label>
          <Form.Control type="text" onInput={this.props.handleCityInput}/>
        </Form.Label>
          <Button type="submit">Explore!</Button>
      </Form>
      </>
    )
  };
  }
export default Input;