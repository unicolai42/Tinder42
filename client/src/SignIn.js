import React, { Component } from 'react';
import './SignIn.css';


class SignIn extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        valueUsername: '',
        valuePassword: '',
        users: [],
        validLog: '_'
      };

      this.changeUsername = this.changeUsername.bind(this);
      this.changePassword = this.changePassword.bind(this);
      this.submitForm = this.submitForm.bind(this);
      this.checkMatch = this.checkMatch.bind(this);
    }

    async componentDidMount() {
      const response = await fetch('/users')
      const users = await response.json()
      this.setState({users: users})
    }
  
    changeUsername(event) {
      this.setState({valueUsername: event.target.value}); 
    }

    changePassword(event) {
      this.setState({valuePassword: event.target.value});
    }

    checkMatch(valueUsername, valuePassword) {
      let users = this.state.users;
      let valueMatch = 0;

      users.forEach((user) => {
        console.log(user['username']);
        if (user['username'].toUpperCase() === valueUsername.toUpperCase()) {
          valueMatch = 1;
          console.log(user.password);
          if (user.password === valuePassword)
            valueMatch = 2;
          return;
        }
      });
      return valueMatch;
    }

    submitForm(event) {
      let match = this.checkMatch(this.state.valueUsername, this.state.valuePassword);
      console.log(match);
      if (match != 2) {
        event.preventDefault();
        this.setState({valuePassword: ''});

        if (match == 1)
          this.setState({validLog: 'Wrong password'});
        else
          this.setState({validLog: 'Username doesn\'t exist'});
      }
    }
  
    render() {
      let validLogColor;

      if (this.state.validLog === '_')
        validLogColor = 'SignIn_validNone';
      else
        validLogColor = 'SignIn_validRed';

      return (
        <div id='SignIn'>
          <form action='test.html' method='POST' id='SignIn_form' onSubmit={this.submitForm}>
              <div id='SignIn_emptyInput'></div>
              <input type="text" placeholder="Username" name='username' value={this.state.valueUsername} onChange={this.changeUsername} />
              <input type="password" placeholder="Password" name='password' value={this.state.valuePassword} onChange={this.changePassword} />
              <input id='submit' type="submit" value="SIGN IN" />
          </form>
          <div id='SignIn_validAndSentence'><span id='SignUp_signSentence' onClick={this.props.changeForSignUp}>Not member yet ? <span id='SignIn_signWord'>SIGN UP</span></span>
            <div id='SignIn_validLog' className={validLogColor}>{this.state.validLog}</div>
          </div>
        </div>
      );
    }
  }
  export default SignIn;