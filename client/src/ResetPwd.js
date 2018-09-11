import React from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'




class ResetPwd extends React.Component {
  constructor(props) {
    super(props)  
    
    this.state = {
      users: []
    }
    this.onEnterPressPwd = this.onEnterPressPwd.bind(this)
    this.changePwdValue = this.changePwdValue.bind(this)    
  }

  componentDidMount() {
    axios.get('http://localhost:3001/users')
    .then(response => {
      this.setState({
        users: response.data
      })   
    })
  }

  onEnterPressPwd(event) {
    if(event.keyCode === 13) {
        event.preventDefault()
        this.submitChangePwd()
    }
  }

  changePwdValue(e) {
    this.setState({
      valueNewPwd2: e.target.value,
      validPwd: ''
    })
  }

  submitChangePwd() {
    axios.post('http://localhost:3001/check_old_pwd', {
      "pwd": this.state.user.password,
      "input": this.state.valueOldPwd
    })
    .then(response => {
      if (response.data === false)
        this.setState({validPwd: 'Password wrong. Retry or click on Forget Password'})

      else if (this.state.valueNewPwd1 !== this.state.valueNewPwd2)
        this.setState({validPwd: 'The second password isn\'t the same than the first'})

      else if (this.state.valueNewPwd1.length > 15)
        this.setState({validPwd: 'The new password is too long'})

      else if (!new RegExp(/.{4,}/).test(this.state.valueNewPwd1))
        this.setState({validPwd: 'New password too weak'})
      
      else {
        this.setState({validPwd: 'Password has been modify'})
        axios.post('http://localhost:3001/change_pwd', {
          "userId": Cookies.get('id'),
          "pwd": this.state.valueNewPwd1
        })
        .then(response => {
          this.setState({user: {password: response.data}})
        })
      }
    })
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
