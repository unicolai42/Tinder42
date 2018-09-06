import React from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Logo from './Logo'
import './Landing.css'
import Landing_img from './ressources/computer+iphone.png'
import axios from 'axios'


class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      signIn: false,
      activateMail: ''
    }
    this.addSignUpUser = this.addSignUpUser.bind(this)
    this.changeSign = this.changeSign.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:3001/users')
    .then(response => {
        this.setState({
          users: response.data
        })
    })
  }

  addSignUpUser(newUser) {
    const newUsers = this.state.users
    newUsers.push(newUser)
    this.setState({
      users: newUsers
    })
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
    console.log(this.state.users)
    return (
      <div id='Landing_wrapper'>
        <div id='Landing_block'>
          <Logo className='Landing_logo'/>
          <div id='Landing_baseline'>
            We find your match<br/>
            You close the deal
          </div>
          {this.state.signIn ? <SignIn users={this.state.users} activateMail={this.state.activateMail} changeForSignUp={this.changeSign}/> : <SignUp users={this.state.users} addSignUpUser={this.addSignUpUser} changeForSignIn={this.changeSign}/>}
        </div>
        <img id='Landing_img' src={Landing_img} alt=""/>
      </div>
    );
  }
}
export default Landing;
