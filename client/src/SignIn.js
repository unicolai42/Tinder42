import React from 'react'
import './SignIn.css'
import axios from 'axios'
// import { domainName } from './domain_name';
import Cookies from 'js-cookie'
import socketIOClient from "socket.io-client"


const socket = socketIOClient('http://127.0.0.1:3002')


class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueMail: '',
      valuePassword: '',
      validLog: '_',
      validMessage: '_'
    };

    this.changeMail = this.changeMail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.resendPassword = this.resendPassword.bind(this)
    this.resendValidationMail = this.resendValidationMail.bind(this)
  }

  componentDidMount() {
    if (typeof this.props.activateMail !== 'object')
      this.setState({validMessage: `A link to validate your inscription has been sent at : ${this.props.activateMail}`});
  }

  changeMail(event) {
    this.setState({valueMail: event.target.value}); 
  }

  changePassword(event) {
    this.setState({valuePassword: event.target.value});
  }

  resendPassword() {
    fetch(`/mail_change_password?mail=${this.state.valueMail}`)
    .then(response => response.json())
    .then(data => {
      this.setState({ validMessage: `A link to change your password has been sent at : ${data.mail}` })
      this.setState({ validLog: '_'})
    })
  }

  resendValidationMail() {
    axios.post('http://localhost:3001/resend_activation_mail', {
      "mail": this.state.valueMail
    })
    .then(response => {
      this.setState({ validMessage: `A link to change validate your account has been sent at : ${response.data.mail}` })
      this.setState({ validLog: '_'})
    })
  }

  submitForm(event) {
    event.preventDefault()
    this.setState({valuePassword: ''})
    axios.post('http://localhost:3001/check_valid_user', {
      "mail": this.state.valueMail,
      "password": this.state.valuePassword
    })
    .then(response => {
      let match = response.data
      if (match === 1) {
        this.setState({validLog: 'Wrong password'});
        this.setState({validMessage: 'Forgot it ? Click here'})
      }
      else if (match === 2) {
        Cookies.set('mail', this.state.valueMail)
        axios.post('http://localhost:3001/find_id_user', {
          "mail": this.state.valueMail
        })
        .then(response => {
          Cookies.set('id', response.data)
          socket.emit('getId', {
            userId: Cookies.get('id')
          })
          window.location = 'http://localhost:3000'
        })
      }
      else if (match === 3) {
        this.setState({validLog: 'User not activ yet'});
        this.setState({validMessage: 'Resend me the activation link'})
      }
      else
        this.setState({validLog: 'Mail doesn\'t exist'})
    })
  }

  render() {
    let validLogColor;
    let validMessageColor;
    let validMessage = this.state.validMessage;

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
    else if (this.state.validMessage === 'Resend me the activation link') {
      validMessageColor = 'SignIn_validBlack'
      validMessage = <div onClick={this.resendValidationMail}>{this.state.validMessage}</div>
    }
    else
      validMessageColor = 'SignIn_validBlue'


    return (
      <div id='SignIn'>
        <form action='/connect_user' method='POST' id='SignIn_form' onSubmit={this.submitForm}>
            <div id='SignIn_emptyInput'></div>
            <input type="text" placeholder="Mail" name='mail' value={this.state.valueMail} onChange={this.changeMail} />
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
export default SignIn