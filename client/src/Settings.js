import React from 'react'
import './Settings.css'
import Cookies from 'js-cookie'
import axios from 'axios'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'
import ReactTags from 'react-tag-autocomplete'


class Settings extends React.Component {
  constructor(props) {
    super(props)  
    
    this.state = {
      users: [],
      user: {},
      ageMin: 16,
      ageMax: 70,
      maxDistance: 1,
      popularity: 0,
      maxPopularity: 0,
      sex: 2,
      tags: [],
      sugggestions: [],
      valueMail: '',
      valueOldPwd: '',
      valueNewPwd1: '',
      valueNewPwd2: '',
      validPwd: '',
      validMail: '',
    }
    this.changeValuesAge = this.changeValuesAge.bind(this)
    this.changeValuesMaxDistance = this.changeValuesMaxDistance.bind(this)
    this.changeValuesPopularityMin = this.changeValuesPopularityMin.bind(this)
    this.setValuesDb = this.setValuesDb.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAddition = this.handleAddition.bind(this)
    this.changeMailValue = this.changeMailValue.bind(this)
    this.changeOldPwdValue = this.changeOldPwdValue.bind(this)
    this.changeNewPwd1Value = this.changeNewPwd1Value.bind(this)
    this.changeNewPwd2Value = this.changeNewPwd2Value.bind(this)    
    this.submitChangeMail = this.submitChangeMail.bind(this)
    this.submitChangePwd = this.submitChangePwd.bind(this)    
    this.onEnterPressMail = this.onEnterPressMail.bind(this)
    this.onEnterPressPwd = this.onEnterPressPwd.bind(this)
    this.submitForgotPwd = this.submitForgotPwd.bind(this)

  }

  componentDidMount() {
    axios.get('http://localhost:3001/users')
    .then(response => {
      let popularityMax = 0
      response.data.forEach(elem => {
        if (elem.popularity > popularityMax)
          popularityMax = elem.popularity
      })
      this.setState({
        users: response.data,
        maxPopularity: popularityMax
      })
    })

    axios.post('http://localhost:3001/load_user_info', {
      "userId": Cookies.get('id')
    })
    .then(response => {
      this.setState({
        user: response.data,
        valueMail: response.data.mail
      })   
    })
    
    axios.post('http://localhost:3001/load_preferences', {
        "userId": Cookies.get('id')
    })
    .then(response => {
        this.setState({
            ageMin: response.data.age_min,
            ageMax: response.data.age_max,
            maxDistance: response.data.max_distance / 1000,
            sex: response.data.sex,
            tags: response.data.hashtags,
            suggestions: response.data.suggestions,
            popularity: response.data.popularity_min
        })
    })
  }

  changeValuesAge(values) {
    this.setState({
      ageMin: values[0],
      ageMax: values[1]
    })
  }

  changeValuesMaxDistance(value) {
    this.setState({
      maxDistance: value
    })
  }

  changeValuesPopularityMin(value) {
    this.setState({
      popularity: value
    })
  }

  changeSex = async (value) => {
    if (value === 0 && this.state.sex === 1)
      await this.setState({sex: 0})
    else if (value === 2 && this.state.sex === 1)
      await this.setState({sex: 2})
    else if ((value === 0 && this.state.sex === 2) || (value === 2 && this.state.sex === 0))
      await this.setState({sex: 1})
    else
      return
    
    this.setValuesDb()
  }

  setValuesDb() {
    axios.post('http://localhost:3001/set_preferences', {
      "userId": Cookies.get('id'),
      "ageMin": this.state.ageMin,
      "ageMax" : this.state.ageMax,
      "maxDistance": this.state.maxDistance * 1000,
      "sex": this.state.sex,
      "popularityMin": this.state.popularity
    })
  }

  handleDelete(i) {
    axios.post('http://localhost:3001/remove_hashtag_settings', {
      "userId": Cookies.get('id'),
      "hashtagName": this.state.tags[i].name
    })
    const tags = this.state.tags.slice(0)

    tags.splice(i, 1)
    this.setState({tags: tags})
  }
  
  handleAddition(tag) {
    tag.name = tag.name.charAt(0).toUpperCase() + tag.name.slice(1)
    const tags = [].concat(this.state.tags, tag)
    this.setState({tags: tags})
    axios.post('http://localhost:3001/add_hashtag_settings', {
      "userId": Cookies.get('id'),
      "hashtagName": tag.name
    })
  }

  changeMailValue(e) {
    this.setState({
      valueMail: e.target.value,
      validMail: ''
    })
  }

  changeOldPwdValue(e) {
    this.setState({
      valueOldPwd: e.target.value,
      validPwd: ''
    })
  }

  changeNewPwd1Value(e) {
    this.setState({
      valueNewPwd1: e.target.value,
      validPwd: ''
    })
  }

  changeNewPwd2Value(e) {
    this.setState({
      valueNewPwd2: e.target.value,
      validPwd: ''
    })
  }

  onEnterPressMail(event) {
    if(event.keyCode === 13) {
        event.preventDefault()
        this.submitChangeMail()
    }
  }

  onEnterPressPwd(event) {
    if(event.keyCode === 13) {
        event.preventDefault()
        this.submitChangePwd()
    }
  }

  submitChangeMail() {
    let checkMail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    if (this.state.valueMail.length > 30)
      this.setState({validMail: 'Mail too long'})
    else if (checkMail.test(this.state.valueMail)) {
      let taken = 0
      this.state.users.forEach((user) => {
        if (user.mail.toUpperCase() === this.state.valueMail.toUpperCase() && user.id !== parseInt(Cookies.get('id'), 10)) {
          this.setState({validMail: 'Mail already taken'})
          taken = 1
          return
        }
        else if (user.mail.toUpperCase() === this.state.valueMail.toUpperCase() && user.id === parseInt(Cookies.get('id'), 10)) {
          this.setState({validMail: ''})
          taken = 1
          return
        }
      })
      if (taken === 0) {
        let newUsers = this.state.users
        newUsers.forEach(elem => {
          if (elem.id === parseInt(Cookies.get('id'), 10)) {
            elem.mail = this.state.valueMail
            return
          }
        })
        this.setState({
          validMail: 'Mail has been modify',
          users: newUsers
        })
        axios.post('http://localhost:3001/update_mail', {
          "userId": Cookies.get('id'),
          "mail": this.state.valueMail
        })
      }
    }
    else
      this.setState({validMail: 'Mail unvalid'});
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

  submitForgotPwd() {
    axios.post('http://localhost:3001/send_mail_forgot_pwd', {
      "user": this.state.user
    })
    this.setState({validPwd: `Mail has been send to ${this.state.user.mail}`})
  }

  render() {
    let resendPwd = (this.state.validPwd && this.state.validPwd !== 'Password has been modify') ?
      <input id='Settings_submitForgotPwd' value="Forgot password ? Click and go in your mailbox" onClick={this.submitForgotPwd} type='submit'/> :
      null
    return (
      <div id='Settings_wrapper'>
        <div id='Settings_block'>
          <div id='Settings_title'>Settings</div>
          <div id='Settings_age'>
            <div className='Settings_description'>
              <div id='Settings_ageText'>Age Range</div>
              <div id='Settings_ageNumber'>{this.state.ageMin} - {this.state.ageMax} ans</div>
            </div>
            <Range min={16} max={70} value={[this.state.ageMin, this.state.ageMax]} onChange={this.changeValuesAge} onAfterChange={this.setValuesDb} />
          </div>
          <div id='Settings_maxDistance' className='Settings_box'>
            <div className='Settings_description'>
              <div id='Settings_maxDistanceText'>Maximum Distance</div>
              <div id='Settings_maxDistanceNumber'>{this.state.maxDistance}km</div>
            </div>
            <Slider min={1} max={1000} value={this.state.maxDistance} onChange={this.changeValuesMaxDistance} onAfterChange={this.setValuesDb} />
          </div>
          <div id='Settings_popularityMin' className='Settings_box'>
            <div className='Settings_description'>
              <div id='Settings_popularityMinText'>Popularity minimum</div>
              <div id='Settings_popularityMinNumber'>{this.state.popularity} / {this.state.maxPopularity}</div>
            </div>
            <Slider min={0} max={this.state.maxPopularity} value={this.state.popularity} onChange={this.changeValuesPopularityMin} onAfterChange={this.setValuesDb} />
          </div>
          <div id='Settings_sex'>
              <div className='Settings_sexText' onClick={() => this.changeSex(0)} style={(this.state.sex < 2) ? {background: 'linear-gradient(175deg,#afe7ff 10%,#dfefff 70%,#c1f1ff 90%)', color: 'white'} : null}>Men</div>
              <div className='Settings_sexText' onClick={() => this.changeSex(2)} style={(this.state.sex > 0) ? {background: 'linear-gradient(175deg,#afe7ff 10%,#dfefff 70%,#c1f1ff 90%)', color: 'white'} : null}>Women</div>
          </div>
          <div className='Settings_box'>
            <ReactTags delimiterChars={[',', ' ', '.', '  ']} allowBackspace={false} minQueryLength={1} placeholder='Add new # or click to delete it' tags={this.state.tags} suggestions={this.state.suggestions} handleDelete={this.handleDelete} handleAddition={this.handleAddition} />
          </div>
          <div id='Settings_mail'>
            <input id='Settings_input' placeholder="Enter your new mail address" name='message' type='text' onKeyDown={this.onEnterPressMail} value={this.state.valueMail} onChange={this.changeMailValue}/>
            <div id='Settings_submit' onClick={this.submitChangeMail}/>
            <div id='Settings_validMail'>{this.state.validMail}</div>
          </div>
          <input className='Settings_changePwd' placeholder='Old password' onChange={this.changeOldPwdValue} value={this.state.valueOldPwd} onKeyDown={this.onEnterPressPwd} type="password"/>
          <input className='Settings_changePwd' placeholder='New password' onChange={this.changeNewPwd1Value} value={this.state.valueNewPwd1} onKeyDown={this.onEnterPressPwd} type="password"/>
          <input className='Settings_changePwd' placeholder='Confirmation' onChange={this.changeNewPwd2Value} value={this.state.valueNewPwd2} onKeyDown={this.onEnterPressPwd} type="password"/>          
          <div id='Settings_validPwd'>{this.state.validPwd}</div>          
          <input id='Settings_submitPwd' value="EDIT PASSWORD" onClick={this.submitChangePwd} type='submit'/>
          {resendPwd}
        </div>
      </div>
    )
  }
}
export default Settings