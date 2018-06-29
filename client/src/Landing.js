import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Logo from './Logo';
import './Landing.css';
import Landing_img from './ressources/computer+iphone.png';


class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: false,
      activateMail: ''
    }
    this.changeSign = this.changeSign.bind(this);
  }

  changeSign(activateMail) {
    this.setState(
      (prevState) => ({
        signIn: !prevState.signIn,
        activateMail: activateMail
      })
    );
  }

  render() {
    return (
      <div id='Landing_wrapper'>
        <div id='Landing_block'>
          <Logo/>
          <div id='Landing_baseline'>
            We find your match<br/>
            You close the deal
          </div>
          {this.state.signIn ? <SignIn activateMail={this.state.activateMail} changeForSignUp={this.changeSign}/> : <SignUp changeForSignIn={this.changeSign}/>}
        </div>
        <img id='Landing_img' src={Landing_img} alt=""/>
      </div>
    );
  }
}
export default Landing;
