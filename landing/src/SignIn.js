import React, { Component } from 'react';
import './SignIn.css';


class SignIn extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        valueUsername: '',
        valuePassword: '',
        users: []
      };

      this.changeUsername = this.changeUsername.bind(this);
      this.changePassword = this.changePassword.bind(this);
      this.submitForm = this.submitForm.bind(this);
      this.checkMatch = this.checkMatch.bind(this);
    }

    componentDidMount() {
      fetch('http://www.json-generator.com/api/json/get/bQoAKDnfWW?indent=2')
      .then(response => response.json())
      .then((data) => this.setState({users: data.users}));
    }
  
    changeUsername(event) {
      this.setState({valueUsername: event.target.value}); 
    }

    changePassword(event) {
      this.setState({valuePassword: event.target.value});
    }
  
    submitForm(event) {
      event.preventDefault();
      let username = this.changeUsername();
      let password = this.changePassword();
      console.log(username, password);
      if (username === password)
        alert('A name was submitted: ' + this.state.valueUsername);
    }

    checkMatch(elem, value) {
      let users = this.state.users;
      let valueMatch = 0;

      console.log(elem, value);
      users.forEach((user) => {
        console.log(user[elem]);
        if (user[elem] === value)
          valueMatch = user;
      });
      console.log('dw');
      return valueMatch;
    }
  
    render() {
      return (
        <form id='SignIn_form' onSubmit={this.submitForm}>
            <div id='SignIn_emptyInput'></div>
            <input type="text" placeholder="Username" value={this.state.valueUsername} onChange={this.changeUsername} />
            <input type="password" placeholder="Password" value={this.state.valuePassword} onChange={this.changePassword} />
            <input id='submit' type="submit" value="SIGN IN" />
        </form>
      );
    }
  }
  export default SignIn;