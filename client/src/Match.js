import React from 'react'
import './Match.css'
import MatchUser from './MatchUser';
import Cookies from 'js-cookie'
import axios from 'axios'

// import pic1 from './ressources/picture1.jpg';
// import pic2 from './ressources/picture2.jpg';
// import pic3 from './ressources/picture3.jpg';
// import pic4 from './ressources/picture4.jpg';
// import pic5 from './ressources/picture5.jpg';

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
      displayButtons: null
    }

    this.likeClick = this.likeClick.bind(this)
    this.dislikeClick = this.dislikeClick.bind(this)
    this.redirectToProfile = this.redirectToProfile.bind(this)
  }

  componentDidMount() {
    axios.post('http://localhost:3001/load_info_user', {
      "userId": Cookies.get('id')
    })
    .then(response => {
        this.setState({user: response.data})
    })
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords.latitude, position.coords.longitude)
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
      console.log("Le service de géolocalisation n'est pas disponible sur votre ordinateur.")
    }
  }
  
  likeClick() {
    if (this.state.actualUser === 'FirstUser') {
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
          nbUsersNoMatched: prevState.nbUsersNoMatched - 1
        })
      )
      axios.post('http://localhost:3001/check_match', {
        "userId": Cookies.get('id'),
        "matcher": this.state.allUsers[this.state.indexUser1],
        "liked": 1
      })
    }

    else if (this.state.actualUser === 'SecondUser') {
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
          nbUsersNoMatched: prevState.nbUsersNoMatched - 1
        })
      )
      axios.post('http://localhost:3001/check_match', {
        "userId": Cookies.get('id'),
        "matcher": this.state.allUsers[this.state.indexUser2],
        "liked": 1
      })
    }

    else if (this.state.actualUser === 'ThirdUser') {
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
          nbUsersNoMatched: prevState.nbUsersNoMatched - 1
        })
      )
      axios.post('http://localhost:3001/check_match', {
        "userId": Cookies.get('id'),
        "matcher": this.state.allUsers[this.state.indexUser3],
        "liked": 1
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
          nbUsersNoMatched: prevState.nbUsersNoMatched - 1
        })
      )
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
          nbUsersNoMatched: prevState.nbUsersNoMatched - 1
        })
      )
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
          nbUsersNoMatched: prevState.nbUsersNoMatched - 1
        })
      )
      axios.post('http://localhost:3001/check_match', {
        "userId": Cookies.get('id'),
        "matcher": this.state.allUsers[this.state.indexUser3],
        "liked": 0
      })
    }
  }

  redirectToProfile() {
    setTimeout(() => {window.location = '/profile'}, 3000)
  }

  render() {
    let arrayUserMatch = []

    if (this.state.allUsers.length > 0) {
      if (this.state.allUsers[this.state.indexUser1])
        arrayUserMatch.push(<MatchUser key={this.state.indexUser1} name={this.state.allUsers[this.state.indexUser1].username} pictures={this.state.allUsers[this.state.indexUser1].pictures} liked={this.state.likedFirstUser} disliked={this.state.dislikedFirstUser} addStyle={this.state.styleFirstUser}/>)
      if (this.state.allUsers[this.state.indexUser2])
        arrayUserMatch.push(<MatchUser key={this.state.indexUser2} name={this.state.allUsers[this.state.indexUser2].username} pictures={this.state.allUsers[this.state.indexUser2].pictures} liked={this.state.likedSecondUser} disliked={this.state.dislikedSecondUser} addStyle={this.state.styleSecondUser}/>)
      if (this.state.allUsers[this.state.indexUser3])
        arrayUserMatch.push(<MatchUser key={this.state.indexUser3} name={this.state.allUsers[this.state.indexUser3].username} pictures={this.state.allUsers[this.state.indexUser3].pictures} liked={this.state.likedThirdUser} disliked={this.state.dislikedThirdUser} addStyle={this.state.styleThirdUser}/>)
    }
    else {
      arrayUserMatch.push(<div id='Match_noMoreMatch' key={0}>Adjust your parameters if you looking for new matches</div>)
    }

    let displayButtons = []
    // foutre ca quand il ny a plus dusers pour que les bouttons se arrent vers le bas{transform: 'translateY(-200px)'}
    if (this.state.nbUsersNoMatched) {
      displayButtons.push(<div id='Match_dislike' key='Match_dislike' style={this.state.displayButtons} onClick={this.dislikeClick}></div>)
      displayButtons.push(<div id='Match_like' key='Match_like' style={this.state.displayButtons} onClick={this.likeClick}></div>)
    }

    if ((this.state.user.username && !this.state.user.picture1) || (this.state.user.username && !this.state.user.age) || (this.state.user.username && this.state.user.sex === 1)) {
      this.redirectToProfile()
      arrayUserMatch = <div id='Match_missInfo' key={1}>You have to add your age, and a profil picture to start matching users</div>
    }
    return (
        <div id='Match_wrapper'>
          <div id='Match_number'>
            <div id='Match_numberLogo'></div>
            <div id='Match_numberText'>{(this.state.nbUsersNoMatched === 0) ? 'No' : this.state.allUsers.length} more matches found</div>
          </div>
          <div id='Match_framePictures'>
            {arrayUserMatch}
          </div>
          <div key={0} id='Match_button'>
            {displayButtons}
          </div>
      </div>
    );
  }
}

export default Match;
