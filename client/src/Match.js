import React from 'react'
import './Match.css'
import MatchUser from './MatchUser';
import Cookies from 'js-cookie'
import axios from 'axios'
import socketIOClient from "socket.io-client"


const socket = socketIOClient('http://127.0.0.1:3002')


class Match extends React.Component {
  constructor(props) {
    super(props)  
    
    this.state = {
      user: {},
      allUsers: [],
      nbUsersNoMatched: 0,
      indexUser1: 0,
      indexUser2: 1,
      indexUser3: -1,
      actualUser: 'FirstUser',
      styleFirstUser: {zIndex: '2'},
      styleSecondUser: {zIndex: '1'},
      styleThirdUser: {zIndex: '1'},
      likedFirstUser: {display: 'none'},
      dislikedFirstUser: {display: 'none'},
      likedSecondUser: {display: 'none'},
      dislikedSecondUser: {display: 'none'},
      likedThirdUser: {display: 'none'},
      dislikedThirdUser: {display: 'none'},
      displayButtons: null,
      matchedLogo: '',
      matchedTxt: '',
      matchedLogoStyle: {display: 'none'},
      matchedTxtStyle: {display: 'none'}
    }

    this.likeClick = this.likeClick.bind(this)
    this.dislikeClick = this.dislikeClick.bind(this)
  }

  componentDidMount() {
    axios.get('https://randomuser.me/api/?results=5&nat=fr', {
      "userId": Cookies.get('id')
    })

    axios.post('http://localhost:3001/load_info_user', {
      "userId": Cookies.get('id')
    })
    .then(response => {
      this.setState({user: response.data})
      
      if (!response.data.latitude && !response.data.longitude) {
        navigator.geolocation.getCurrentPosition(position => {
          axios.post('http://localhost:3001/update_location', {
            "userId": Cookies.get('id'),
            "latitude": position.coords.latitude,
            "longitude": position.coords.longitude
          })
          .then(() => {
            axios.post('http://localhost:3001/load_user_data_match', {
              "userId": Cookies.get('id')
            })
            .then(response => {
                this.setState({
                  allUsers: response.data,
                  nbUsersNoMatched: response.data.length
                })
            })
          })
        }, err => console.log(err))
      }
      else {
        axios.post('http://localhost:3001/load_user_data_match', {
          "userId": Cookies.get('id')
        })
        .then(response => {
            this.setState({
              allUsers: response.data,
              nbUsersNoMatched: response.data.length
            })
        })
        navigator.geolocation.getCurrentPosition(position => {
          axios.post('http://localhost:3001/update_location', {
            "userId": Cookies.get('id'),
            "latitude": position.coords.latitude,
            "longitude": position.coords.longitude
          })
        }, err => console.log(err))
      }
    })
  }
  
  likeClick() {
    if (this.state.actualUser === 'FirstUser') {
      
      axios.post('http://localhost:3001/check_match', {
        "userId": Cookies.get('id'),
        "matcher": this.state.allUsers[this.state.indexUser1],
        "liked": 1
      })
      .then(({data}) => {
        if (!data) {
          this.setState(
            (prevState) => ({
              styleThirdUser: {zIndex: '1'},
              styleFirstUser: {transition: 'transform 0.5s linear 0.5s', zIndex: '3', transform: 'translateX(2000px) rotate(30deg)'},
              likedFirstUser: {display: 'initial'},
              styleSecondUser: {zIndex: '2'},
              likedThirdUser: {display: 'none'},
              dislikedThirdUser: {display: 'none'},
              actualUser: 'SecondUser',
              indexUser3: prevState.indexUser3 + 3,
              matchedLogoStyle: {display: 'none'},
              matchedTxtStyle: {display: 'none'},
              matchedLogo: '',
              matchedTxt: ''
            })
          , () => {
              setTimeout(() => {
                this.setState(
                  (prevState) => ({
                    nbUsersNoMatched: prevState.nbUsersNoMatched - 1
                })
              )
              }, 900)
          })
        }
        else {
          socket.emit('newMatch1', {
            senderId: parseInt(Cookies.get('id'), 10),
            receiverId: this.state.allUsers[this.state.indexUser1].id
          })
          this.setState({
            matchedLogoStyle: {display: 'initial'},
            matchedTxtStyle: {display: 'initial'},
            matchedLogo: 'animated zoomInDown delay-0.1s',
            matchedTxt: 'animated zoomInDown delay-0.1s'
          })
          setTimeout(()=> {
            this.setState(
              (prevState) => ({
                styleThirdUser: {zIndex: '1'},
                styleFirstUser: {transition: 'transform 0.5s linear 0.5s', zIndex: '3', transform: 'translateX(2000px) rotate(30deg)'},
                likedFirstUser: {display: 'initial'},
                styleSecondUser: {zIndex: '2'},
                likedThirdUser: {display: 'none'},
                dislikedThirdUser: {display: 'none'},
                actualUser: 'SecondUser',
                indexUser3: prevState.indexUser3 + 3,
                matchedLogoStyle: {display: 'none'},
                matchedTxtStyle: {display: 'none'},
                matchedLogo: '',
                matchedTxt: ''
              })
              , () => {
                setTimeout(() => {
                  this.setState(
                    (prevState) => ({
                      nbUsersNoMatched: prevState.nbUsersNoMatched - 1
                  })
                )
                }, 900)
            })
          }, 1500)
        }
      })
    }

    else if (this.state.actualUser === 'SecondUser') {
      axios.post('http://localhost:3001/check_match', {
        "userId": Cookies.get('id'),
        "matcher": this.state.allUsers[this.state.indexUser2],
        "liked": 1
      })
      .then(({data}) => {
        if (!data) {
          this.setState(
            (prevState) => ({
              styleFirstUser: {zIndex: '1'},
              styleSecondUser: {transition: 'transform 0.5s linear 0.5s', zIndex: '3', transform: 'translateX(2000px) rotate(30deg)'},
              likedSecondUser: {display: 'initial'},
              styleThirdUser: {zIndex: '2'},
              likedFirstUser: {display: 'none'},
              dislikedFirstUser: {display: 'none'},
              actualUser: 'ThirdUser',
              indexUser1: prevState.indexUser1 + 3,
              matchedLogoStyle: {display: 'none'},
              matchedTxtStyle: {display: 'none'},
              matchedLogo: '',
              matchedTxt: ''
            })
            , () => {
              setTimeout(() => {
                this.setState(
                  (prevState) => ({
                    nbUsersNoMatched: prevState.nbUsersNoMatched - 1
                })
              )
              }, 900)
          })
        }
        else {
          socket.emit('newMatch1', {
            senderId: parseInt(Cookies.get('id'), 10),
            receiverId: this.state.allUsers[this.state.indexUser2].id
          })
          this.setState({
            matchedLogoStyle: {display: 'initial'},
            matchedTxtStyle: {display: 'initial'},
            matchedLogo: 'animated zoomInDown delay-0.1s',
            matchedTxt: 'animated zoomInDown delay-0.1s'
          })
          setTimeout(()=> {
            this.setState(
              (prevState) => ({
                styleFirstUser: {zIndex: '1'},
                styleSecondUser: {transition: 'transform 0.5s linear 0.5s', zIndex: '3', transform: 'translateX(2000px) rotate(30deg)'},
                likedSecondUser: {display: 'initial'},
                styleThirdUser: {zIndex: '2'},
                likedFirstUser: {display: 'none'},
                dislikedFirstUser: {display: 'none'},
                actualUser: 'ThirdUser',
                indexUser1: prevState.indexUser1 + 3,
                matchedLogoStyle: {display: 'none'},
                matchedTxtStyle: {display: 'none'},
                matchedLogo: '',
                matchedTxt: ''
              })
              , () => {
                setTimeout(() => {
                  this.setState(
                    (prevState) => ({
                      nbUsersNoMatched: prevState.nbUsersNoMatched - 1
                  })
                )
                }, 900)
            })
          }, 1500)
        }
      })
    }

    else if (this.state.actualUser === 'ThirdUser') {
      axios.post('http://localhost:3001/check_match', {
        "userId": Cookies.get('id'),
        "matcher": this.state.allUsers[this.state.indexUser3],
        "liked": 1
      })
      .then(({data}) => {
        if (!data) {
          this.setState(
            (prevState) => ({
              styleSecondUser: {zIndex: '1'},
              styleThirdUser: {transition: 'transform 0.5s linear 0.5s', zIndex: '3', transform: 'translateX(2000px) rotate(30deg)'},
              likedThirdUser: {display: 'initial'},
              styleFirstUser: {zIndex: '2'},
              likedSecondUser: {display: 'none'},
              dislikedSecondUser: {display: 'none'},
              actualUser: 'FirstUser',
              indexUser2: prevState.indexUser2 + 3,
              matchedLogoStyle: {display: 'none'},
              matchedTxtStyle: {display: 'none'},
              matchedLogo: '',
              matchedTxt: ''
            })
            , () => {
              setTimeout(() => {
                this.setState(
                  (prevState) => ({
                    nbUsersNoMatched: prevState.nbUsersNoMatched - 1
                })
              )
              }, 900)
          })
        }
        else {
          socket.emit('newMatch1', {
            senderId: parseInt(Cookies.get('id'), 10),
            receiverId: this.state.allUsers[this.state.indexUser3].id
          })
          this.setState({
            matchedLogoStyle: {display: 'initial'},
            matchedTxtStyle: {display: 'initial'},
            matchedLogo: 'animated zoomInDown delay-0.1s',
            matchedTxt: 'animated zoomInDown delay-0.1s'
          })
          setTimeout(()=> {
            this.setState(
              (prevState) => ({
                styleSecondUser: {zIndex: '1'},
                styleThirdUser: {transition: 'transform 0.5s linear 0.5s', zIndex: '3', transform: 'translateX(2000px) rotate(30deg)'},
                likedThirdUser: {display: 'initial'},
                styleFirstUser: {zIndex: '2'},
                likedSecondUser: {display: 'none'},
                dislikedSecondUser: {display: 'none'},
                actualUser: 'FirstUser',
                indexUser2: prevState.indexUser2 + 3,
                matchedLogoStyle: {display: 'none'},
                matchedTxtStyle: {display: 'none'},
                matchedLogo: '',
                matchedTxt: ''
              })
              , () => {
                setTimeout(() => {
                  this.setState(
                    (prevState) => ({
                      nbUsersNoMatched: prevState.nbUsersNoMatched - 1
                  })
                )
                }, 900)
            })
          }, 1500)
        }
      })
    }
  }

  dislikeClick() {
    if (this.state.actualUser === 'FirstUser') {
      this.setState(
        (prevState) => ({
          styleThirdUser: {zIndex: '1'},
          styleFirstUser: {transition: 'transform 0.5s linear 0.5s', zIndex: '3', transform: 'translateX(-2000px) rotate(-30deg)'},
          dislikedFirstUser: {display: 'initial'},
          styleSecondUser: {zIndex: '2'},
          likedThirdUser: {display: 'none'},
          dislikedThirdUser: {display: 'none'},
          actualUser: 'SecondUser',
          indexUser3: prevState.indexUser3 + 3,
        })
        , () => {
          setTimeout(() => {
            this.setState(
              (prevState) => ({
                nbUsersNoMatched: prevState.nbUsersNoMatched - 1
            })
          )
          }, 900)
      })
      axios.post('http://localhost:3001/check_match', {
        "userId": Cookies.get('id'),
        "matcher": this.state.allUsers[this.state.indexUser1],
        "liked": 0
      })
    }

    else if (this.state.actualUser === 'SecondUser') {
      this.setState(
        (prevState) => ({
          styleFirstUser: {zIndex: '1'},
          styleSecondUser: {transition: 'transform 0.5s linear 0.5s', zIndex: '3', transform: 'translateX(-2000px) rotate(-30deg)'},
          dislikedSecondUser: {display: 'initial'},
          styleThirdUser: {zIndex: '2'},
          likedFirstUser: {display: 'none'},
          dislikedFirstUser: {display: 'none'},
          actualUser: 'ThirdUser',
          indexUser1: prevState.indexUser1 + 3,
        })
        , () => {
          setTimeout(() => {
            this.setState(
              (prevState) => ({
                nbUsersNoMatched: prevState.nbUsersNoMatched - 1
            })
          )
          }, 900)
      })
      axios.post('http://localhost:3001/check_match', {
        "userId": Cookies.get('id'),
        "matcher": this.state.allUsers[this.state.indexUser2],
        "liked": 0
      })
    }

    else if (this.state.actualUser === 'ThirdUser') {
      this.setState(
        (prevState) => ({
          styleSecondUser: {zIndex: '1'},
          styleThirdUser: {transition: 'transform 0.5s linear 0.5s', zIndex: '3', transform: 'translateX(-2000px) rotate(-30deg)'},
          dislikedThirdUser: {display: 'initial'},
          styleFirstUser: {zIndex: '2'},
          likedSecondUser: {display: 'none'},
          dislikedSecondUser: {display: 'none'},
          actualUser: 'FirstUser',
          indexUser2: prevState.indexUser2 + 3,
        })
        , () => {
          setTimeout(() => {
            this.setState(
              (prevState) => ({
                nbUsersNoMatched: prevState.nbUsersNoMatched - 1
            })
          )
          }, 900)
      })
      axios.post('http://localhost:3001/check_match', {
        "userId": Cookies.get('id'),
        "matcher": this.state.allUsers[this.state.indexUser3],
        "liked": 0
      })
    }
  }

  render() {
    let arrayUserMatch = []

    if (this.state.nbUsersNoMatched > 0) {
      if (this.state.allUsers[this.state.indexUser1])
        arrayUserMatch.push(<MatchUser key={this.state.indexUser1} userInfo={this.state.allUsers[this.state.indexUser1]} liked={this.state.likedFirstUser} disliked={this.state.dislikedFirstUser} addStyle={this.state.styleFirstUser} dislikeUser={this.dislikeClick}/>)
      if (this.state.allUsers[this.state.indexUser2])
        arrayUserMatch.push(<MatchUser key={this.state.indexUser2} userInfo={this.state.allUsers[this.state.indexUser2]} liked={this.state.likedSecondUser} disliked={this.state.dislikedSecondUser} addStyle={this.state.styleSecondUser} dislikeUser={this.dislikeClick}/>)
      if (this.state.allUsers[this.state.indexUser3])
        arrayUserMatch.push(<MatchUser key={this.state.indexUser3} userInfo={this.state.allUsers[this.state.indexUser3]} liked={this.state.likedThirdUser} disliked={this.state.dislikedThirdUser} addStyle={this.state.styleThirdUser} dislikeUser={this.dislikeClick}/>)
    }
    else {
      arrayUserMatch.push(<div id='Match_noMoreMatch' key={0}>
                            <div id='Match_noMoreMatchLogo' className='animated infinite pulse'></div>
                            <div id='Match_noMoreMatchText' key={1}>Adjust your parameters to find new matches</div>
                          </div>)
    }

    if ((this.state.user.username && !this.state.user.picture1) || (this.state.user.username && !this.state.user.age) || (this.state.user.username && this.state.user.sex === 1)) {
      arrayUserMatch =
      <div id='Match_missInfoBlock' onClick={() => {window.location = '/profile'}} key={1}>
        <div id='Match_missInfoFirstTxt' className='Match_missInfoTxt'>We need more informations to find the good one for you :</div>
        <div className='Match_missInfoTxt'>A profil picture</div>
        <div className='Match_missInfoTxt'>Your age</div>
        <div className='Match_missInfoTxt'>Your sex</div>
        <div id='Match_missInfoButton'>UPDATE MY PROFILE</div>
      </div>
    }
    return (
        <div id='Match_wrapper'>
          <div id='Match_frame'>
            <div id='Match_number'>
              {(this.state.nbUsersNoMatched) ? <div id='Match_numberLogo'></div> : null}
              <div id='Match_numberText'>{(this.state.nbUsersNoMatched === 0) ? 'No' : this.state.nbUsersNoMatched} more matches found</div>
            </div>
            <div id='Match_framePictures'>
              <div id='Match_matched_logo' style={this.state.matchedLogoStyle} className={this.state.matchedLogo}/>
              <div id='Match_matched_txt' style={this.state.matchedTxtStyle} className={this.state.matchedTxt}>New Match !</div>
              {arrayUserMatch}
            </div>
            <div id='Match_button'>
              <div id='Match_dislike' className='Match_buttons' style={this.state.displayButtons} onClick={(this.state.nbUsersNoMatched) ? this.dislikeClick : null}></div>
              <div id='Match_like' className='Match_buttons' style={this.state.displayButtons} onClick={(this.state.nbUsersNoMatched) ? this.likeClick : null}></div>
            </div>
          </div>
      </div>
    );
  }
}

export default Match;
