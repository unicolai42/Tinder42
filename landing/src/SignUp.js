import React, { Component } from 'react';
import './SignUp.css';


class SignUp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        valueMail: '',
        valuePassword: '',
        valueUsername: '',
        validMail: 'false',
        validPassword: 'unsafe',
        validUsername: 'true',
        users: []
      };
  
      this.changeMail = this.changeMail.bind(this);
      this.changePassword = this.changePassword.bind(this);
      this.changeUsername = this.changeUsername.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.checkValid = this.checkValid.bind(this);
    }

    componentDidMount() {
      fetch('http://www.json-generator.com/api/json/get/bQoAKDnfWW?indent=2')
      .then(response => response.json())
      .then((data) => this.setState({users: data.users}));
    }
  
    changeMail(event) {
      this.setState({valueMail: event.target.value});
      this.checkValid('mail', event.target.value);
    }

    changePassword(event) {
      this.setState({valuePassword: event.target.value});
      this.checkValid('password', event.target.value);
    }

    changeUsername(event) {
      this.setState({valueUsername: event.target.value}); 
      this.checkValid('username', event.target.value);
    }
  
    handleSubmit(event) {
      // alert('A name was submitted: ' + this.state.value);
      // event.preventDefault();
    }

    checkValid(elem, value) {

      if (elem == 'mail' && value) {
        let checkMail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (value.length > 30)
          this.setState({validMail: 'tooLong'});
        else if (checkMail.test(value))
          this.setState({validMail: true});
        else
          this.setState({validMail: false});
      }
      else if (elem == 'password' && value) {
        let checkPasswordWeak = new RegExp(/.{4,}/);
        let checkPasswordSecure = new RegExp(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,}$/);
        if (value.length > 30)
          this.setState({validPassword: 'tooLong'});
        else if (checkPasswordSecure.test(value))
          this.setState({validPassword: 'secure'});
        else if (checkPasswordWeak.test(value))
          this.setState({validPassword: 'weak'});
        else
          this.setState({validPassword: 'unsafe'});
      }
      else if (elem == 'username' && value) {
        let checkUsernameCaracters = new RegExp(/^[^\s!@#$&*.><?`~%^()+=§"'|\\\/]+$/);
        if (value.length > 30)
          this.setState({validUsername: 'tooLong'});
        else if (!checkUsernameCaracters.test(value))
          this.setState({validUsername: false});
        else
          this.setState({validUsername: true});
      }


      if (elem == 'mail' || elem == 'username') {
        let users = this.state.users;
        users.forEach((user) => {
          if (user[elem].toUpperCase() === value.toUpperCase()) {
            if (elem == 'mail')
              this.setState({validMail: 'taken'});
            else if (elem == 'username')
              this.setState({validUsername: 'taken'});
            return;
          }
        });
      }

      
    }
  
    render() {

      let validMail;
      let validMailColor;
      let checked = '\u2713';
      let wrong = '\u2717';

      if (this.state.valueMail && this.state.validMail === true) {
        validMail = 'Valid mail ' + checked;
        validMailColor = 'SignUp_validGreen';
      }
      else if (this.state.valueMail && this.state.validMail === 'taken') {
        validMail = 'Mail already used ' + wrong;
        validMailColor = 'SignUp_validRed';
      }
      else if (this.state.valueMail && this.state.validMail === 'tooLong') {
        validMail = 'Mail incorect ' + wrong;
        validMailColor = 'SignUp_validRed';
      }
      else {
        validMail = '_';
        validMailColor = 'SignUp_validNone';
      }

      
      let validPassword;
      let validPasswordColor;

      if (this.state.valuePassword && this.state.validPassword === 'tooLong') {
        validPassword = 'Password too long ' + wrong;
        validPasswordColor = 'SignUp_validRed';
      }
      else if (this.state.valuePassword && this.state.validPassword === 'unsafe') {
        validPassword = 'Unsafe password ' + wrong;
        validPasswordColor = 'SignUp_validRed';
      }
      else if (this.state.valuePassword && this.state.validPassword === 'weak') {
        validPassword = 'Password weak ~';
        validPasswordColor = 'SignUp_validOrange';
      }
      else if (this.state.valuePassword && this.state.validPassword === 'secure') {
        validPassword = 'Secure password ' + checked;
        validPasswordColor = 'SignUp_validGreen';
      }
      else {
        validPassword = '_';
        validPasswordColor = 'SignUp_validNone';
      }


      let validUsername;
      let validUsernameColor;

      if (this.state.valueUsername && this.state.validUsername === true) {
        validUsername = 'Valid Username ' + checked;
        validUsernameColor = 'SignUp_validGreen';
      }
      else if (this.state.valueUsername && this.state.validUsername === 'taken') {
        validUsername = 'Username already used ' + wrong;
        validUsernameColor = 'SignUp_validRed';
      }
      else if (this.state.valueUsername && this.state.validUsername === 'tooLong' || this.state.valueUsername && this.state.validUsername === false) {
        validUsername = 'Username incorect ' + wrong;
        validUsernameColor = 'SignUp_validRed';
      }
      else {
        validUsername = '_';
        validUsernameColor = 'SignUp_validNone';
      }
        
      

      return (
        <div id='SignUp'>
          <form id='SignUp_form' onSubmit={this.handleSubmit}>
              <input type="text" placeholder="Mail" value={this.state.valueMail} onChange={this.changeMail} />
              <input type="password" placeholder="Password" value={this.state.valuePassword} onChange={this.changePassword} />
              <input type="text" placeholder="Username" value={this.state.valueUsername} onChange={this.changeUsername} />
              <input id='submit' type="submit" value="SIGN UP" />
          </form>
          <div id='SignUp_signSentence' onClick={this.props.changeForSignIn}>Already member ? <span id='SignUp_signWord'>SIGN IN</span>
            <div id='SignUp_validMail' className={validMailColor}>{validMail}</div>
            <div id='SignUp_validPassword' className={validPasswordColor}>{validPassword}</div>
            <div id='SignUp_validUsername' className={validUsernameColor}>{validUsername}</div>
          </div>
        </div>
      );
    }
  }
  export default SignUp;