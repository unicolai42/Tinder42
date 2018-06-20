import React, { Component } from 'react';
import './SignIn.css';


class SignIn extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: ''
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form id='SignIn_form' onSubmit={this.handleSubmit}>
            <div id='SignIn_emptyInput'></div>
            <input type="text" placeholder="Username" value={this.state.value} onChange={this.handleChange} />
            <input type="password" placeholder="Password" value={this.state.value} onChange={this.handleChange} />
            <input id='submit' type="submit" value="SIGN IN" />
        </form>
      );
    }
  }
  export default SignIn;