import React from 'react'
import './SignIn.css'
// import { domainName } from './domain_name';


class SignIn extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        valueUsername: '',
        valuePassword: '',
        validLog: '_',
        validMessage: '_'
      };

      this.changeUsername = this.changeUsername.bind(this);
      this.changePassword = this.changePassword.bind(this);
      this.submitForm = this.submitForm.bind(this);
      this.checkMatch = this.checkMatch.bind(this);
      this.resendPassword = this.resendPassword.bind(this);
    }

    componentDidMount() {
      console.log(typeof this.props.activateMail)
      if (typeof this.props.activateMail !== 'object')
        this.setState({validMessage: `A link to validate your inscription has been sent at : ${this.props.activateMail}`});

      console.log(this.state.validMessage)
    }
  
    changeUsername(event) {
      this.setState({valueUsername: event.target.value}); 
    }

    changePassword(event) {
      this.setState({valuePassword: event.target.value});
    }

    checkMatch(valueUsername, valuePassword) {
      let users = this.props.users;
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

    resendPassword() {
      fetch(`/mail_change_password?username=${this.state.valueUsername}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ validMessage: `A link to change your password has been sent at : ${data.mail}` })
        this.setState({ validLog: '_'})
      })
    }

    submitForm(event) {
      let match = this.checkMatch(this.state.valueUsername, this.state.valuePassword);
      console.log(match);
      if (match !== 2) {
        event.preventDefault();
        this.setState({valuePassword: ''});

        if (match === 1) {
          this.setState({validLog: 'Wrong password'});
          this.setState({validMessage: 'Forgot it ? Click here'})
        }
        else
          this.setState({validLog: 'Username doesn\'t exist'});
      }
    }
  
    render() {
      let validLogColor;
      let validMessageColor;
      let validMessage = this.state.validMessage;
      console.log(this.props.activateMail)

      if (this.state.validLog === '_')
        validLogColor = 'SignIn_validNone';
      else
        validLogColor = 'SignIn_validRed';

      if (this.state.validMessage === '_')
        validMessageColor = 'SignIn_validNone'
      else if (this.state.validMessage === 'Forgot it ? Click here') {
        validMessageColor = 'SignIn_validBlack'
        validMessage = <div onClick={this.resendPassword}>{this.state.validMessage}</div>
      }
      else
        validMessageColor = 'SignIn_validBlue'


      return (
        <div id='SignIn'>
          <form action='/connect_user' method='POST' id='SignIn_form' onSubmit={this.submitForm}>
              <div id='SignIn_emptyInput'></div>
              <input type="text" placeholder="Username" name='username' value={this.state.valueUsername} onChange={this.changeUsername} />
              <input type="password" placeholder="Password" name='password' value={this.state.valuePassword} onChange={this.changePassword} />
              <input id='submit' type="submit" value="SIGN IN" />
          </form>
          <div id='SignIn_validAndSentence'><span id='SignUp_signSentence' onClick={this.props.changeForSignUp}>Not member yet ? <span id='SignIn_signWord'>SIGN UP</span></span>
            <div id='SignIn_validLog' className={validLogColor}>{this.state.validLog}</div>
            <div id='SignIn_validMessage' className={validMessageColor}>{validMessage}</div>
          </div>
        </div>
      );
    }
  }
  export default SignIn;