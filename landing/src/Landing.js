import React, { Component } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Logo from './Logo';
import './Landing.css';


class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: false
    }
    this.changeSign = this.changeSign.bind(this);
  }

  changeSign(event) {
    this.setState(
      (prevState) => ({
        signIn: !prevState.signIn
      })
    );
  }

  render() {
    let signInUp;

    if (!this.state.signIn)
      signInUp = <div id='Landing_signSentence' onClick={this.changeSign}>Already member ? <span id='Landing_signWord'>SIGN IN</span></div>;
    else
      signInUp = <div id='Landing_signSentence' onClick={this.changeSign}>Not member yet ? <span id='Landing_signWord'>SIGN UP</span></div>;
    return (
      <div id='wrapper'>
        <div id='block'>
          <Logo/>
          {this.state.signIn ? <SignIn/> : <SignUp/>}
          {signInUp}
        </div>
        <div id='img'>
        </div>
      </div>
    );
  }
}
export default Landing;
