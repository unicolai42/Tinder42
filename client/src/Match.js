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
      allUsers: [],
      // [
      //   {
      //     username: 'Ugo',
      //     location: 'Paris',
      //     pictures: [pic1, pic2, pic3, pic4, pic5]
      //   },
      //   {
      //     username: 'Alice',
      //     location: 'Paris',
      //     pictures: [pic1, pic2, pic3, pic4, pic5]
      //   },
      //   {
      //     username: 'Arlo',
      //     location: 'Paris',
      //     pictures: [pic1, pic2, pic3, pic4, pic5]
      //   },
      //   {
      //     username: 'Dori',
      //     location: 'Paris',
      //     pictures: [pic1, pic2, pic3, pic4, pic5]
      //   }
      // ],
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
      displayButtons: 'initial'
    }

    this.likeClick = this.likeClick.bind(this)
    this.dislikeClick = this.dislikeClick.bind(this)
    this.checkIfLastUser = this.checkIfLastUser.bind(this)
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords.latitude, position.coords.longitude)
        axios.post('http://localhost:3001/update_location', {
          "userId": Cookies.get('id'),
          "latitude": position.coords.latitude,
          "longitude": position.coords.longitude
        })
      })
    }
    else {
      console.log("Le service de géolocalisation n'est pas disponible sur votre ordinateur.")
    }
    axios.post('http://localhost:3001/load_user_data_match', {
        "userId": Cookies.get('id')
    })
    .then(response => {
        this.setState({allUsers: response.data})
    })
  }
  
  likeClick() {
    if (this.state.actualUser === 'FirstUser')
      this.setState(
        (prevState) => ({
          styleThirdUser: {zIndex: '1'},
          styleFirstUser: {transition: 'transform 0.5s linear 0.5s', zIndex: '3', transform: 'translateX(2000px) rotate(30deg)'},
          likedFirstUser: {display: 'initial'},
          styleSecondUser: {zIndex: '2'},
          likedThirdUser: {display: 'none'},
          dislikedThirdUser: {display: 'none'},
          actualUser: 'SecondUser',
          indexUser3: prevState.indexUser3 + 3
        })
      )

    else if (this.state.actualUser === 'SecondUser')
      this.setState(
        (prevState) => ({
          styleFirstUser: {zIndex: '1'},
          styleSecondUser: {transition: 'transform 0.5s linear 0.5s', zIndex: '3', transform: 'translateX(2000px) rotate(30deg)'},
          likedSecondUser: {display: 'initial'},
          styleThirdUser: {zIndex: '2'},
          likedFirstUser: {display: 'none'},
          dislikedFirstUser: {display: 'none'},
          actualUser: 'ThirdUser',
          indexUser1: prevState.indexUser1 + 3
        })
      )

    else if (this.state.actualUser === 'ThirdUser')
      this.setState(
        (prevState) => ({
          styleSecondUser: {zIndex: '1'},
          styleThirdUser: {transition: 'transform 0.5s linear 0.5s', zIndex: '3', transform: 'translateX(2000px) rotate(30deg)'},
          likedThirdUser: {display: 'initial'},
          styleFirstUser: {zIndex: '2'},
          likedSecondUser: {display: 'none'},
          dislikedSecondUser: {display: 'none'},
          actualUser: 'FirstUser',
          indexUser2: prevState.indexUser2 + 3
        })
      )
    
    if (this.checkIfLastUser() === 1)
      this.setState({displayButtons: 'none'})
  }
  dislikeClick() {
    if (this.state.actualUser === 'FirstUser')
      this.setState(
        (prevState) => ({
          styleThirdUser: {zIndex: '1'},
          styleFirstUser: {transition: 'transform 0.5s linear 0.5s', zIndex: '3', transform: 'translateX(-2000px) rotate(-30deg)'},
          dislikedFirstUser: {display: 'initial'},
          styleSecondUser: {zIndex: '2'},
          likedThirdUser: {display: 'none'},
          dislikedThirdUser: {display: 'none'},
          actualUser: 'SecondUser',
          indexUser3: prevState.indexUser3 + 3
        })
      )

    else if (this.state.actualUser === 'SecondUser')
      this.setState(
        (prevState) => ({
          styleFirstUser: {zIndex: '1'},
          styleSecondUser: {transition: 'transform 0.5s linear 0.5s', zIndex: '3', transform: 'translateX(-2000px) rotate(-30deg)'},
          dislikedSecondUser: {display: 'initial'},
          styleThirdUser: {zIndex: '2'},
          likedFirstUser: {display: 'none'},
          dislikedFirstUser: {display: 'none'},
          actualUser: 'ThirdUser',
          indexUser1: prevState.indexUser1 + 3
        })
      )

    else if (this.state.actualUser === 'ThirdUser')
      this.setState(
        (prevState) => ({
          styleSecondUser: {zIndex: '1'},
          styleThirdUser: {transition: 'transform 0.5s linear 0.5s', zIndex: '3', transform: 'translateX(-2000px) rotate(-30deg)'},
          dislikedThirdUser: {display: 'initial'},
          styleFirstUser: {zIndex: '2'},
          likedSecondUser: {display: 'none'},
          dislikedSecondUser: {display: 'none'},
          actualUser: 'FirstUser',
          indexUser2: prevState.indexUser2 + 3
        })
      )

    if (this.checkIfLastUser() === 1)
      this.setState({displayButtons: 'none'})
  }

  checkIfLastUser() {
    let lastUser = 0

    if (this.state.allUsers[this.state.indexUser1] === this.state.allUsers[this.state.allUsers.length - 1] && this.state.actualUser === 'FirstUser')
      lastUser = 1
    if (this.state.allUsers[this.state.indexUser2] === this.state.allUsers[this.state.allUsers.length - 1] && this.state.actualUser === 'SecondUser')
      lastUser = 1 
    if (this.state.allUsers[this.state.indexUser3] === this.state.allUsers[this.state.allUsers.length - 1] && this.state.actualUser === 'ThirdUser')
      lastUser = 1

    return lastUser
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
      arrayUserMatch.push(<div key={0}>No more match found</div>)
    }

    return (
        <div id='Match_wrapper'>
          <div id='Match_number'>
            <div id='Match_numberLogo'></div>
            <div id='Match_numberText'>15 more matches found</div>
          </div>
          <div id='Match_framePictures'>
            {arrayUserMatch}
          </div>
          <div key={0} id='Match_button'>
            <div id='Match_dislike' style={{display: this.state.displayButtons}} onClick={this.dislikeClick}></div>
            <div id='Match_like' style={{display: this.state.displayButtons}} onClick={this.likeClick}></div>
          </div>
      </div>
    );
  }
}

export default Match;
