import React from 'react'
// import axios from 'axios'
import queryString from 'query-string'
import { Navigation } from 'react-router'


class ResetPwd extends React.Component {
  constructor(props) {
    super(props)  
    
    this.state = {
      valuePwd: '',
      validPwd: ''
    }
    this.onEnterPressPwd = this.onEnterPressPwd.bind(this)
    this.changePwdValue = this.changePwdValue.bind(this)
    this.submitChangePwd = this.submitChangePwd.bind(this)
  }

  componentDidMount() {
    const param = queryString.parse(this.props.location.search)

    console.log(param)
    // axios.post('http://localhost:3001/compare_old_pwd', {
    //   "username": decodeURI(param.username),
    //   "oldPwd": decodeURI(param.key)
    // })
    fetch(`http://localhost:3001/compare_old_pwd?username=${param.username}&key=${param.key}`, {      
      headers: {
        'Access-Control-Allow-Origin': "*"
      },
      mode: 'cors'
    })
    // .then(response => response.json())
    // .then(data => {
    //   console.log(data)
    //   if (data === 'redirect')
    //     Navigation.transitionTo('/')
    // })
  }

  onEnterPressPwd(event) {
    if(event.keyCode === 13) {
        event.preventDefault()
        this.submitChangePwd()
    }
  }

  changePwdValue(e) {
    this.setState({
      valuePwd: e.target.value,
      validPwd: ''
    })
  }

  submitChangePwd() {
    console.log('ppppp')
    const param = queryString.parse(this.props.location.search)
    
  
    if (this.state.valuePwd.length > 15)
      this.setState({validPwd: 'The new password is too long'})

    else if (!new RegExp(/.{4,}/).test(this.state.valuePwd))
      this.setState({validPwd: 'New password too weak'})
    
    else {
      console.log('ok')
      this.setState({validPwd: 'Password has been modify'})
      // axios.post('http://localhost:3001/change_new_pwd', {
      //   "username": decodeURI(param.username),
      //   "pwd": this.state.valuePwd
      // })
      fetch('/change_new_pwd', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "username": decodeURI(param.username),
          "pwd": this.state.valuePwd
        })
      })
    }
  }

  render() {
    return (
        <div>
            <input className='ResetPwd_changePwd' onChange={this.changePwdValue} value={this.state.valuePwd} onKeyDown={this.onEnterPressPwd} type="password"/>          
            <input id='ResetPwd_submitPwd' value="Change password" onClick={this.submitChangePwd} type='submit'/>
            <div id='ResetPwd_validPwd'>{this.state.validPwd}</div>
        </div>
    )
  }
}
export default ResetPwd
