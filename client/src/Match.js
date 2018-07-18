import React from 'react'
import './Match.css'
import MatchUser from './MatchUser';

import pic1 from './ressources/picture1.jpg';
import pic2 from './ressources/picture2.jpg';
import pic3 from './ressources/picture3.jpg';
import pic4 from './ressources/picture4.jpg';
import pic5 from './ressources/picture5.jpg';

class Match extends React.Component {
  constructor(props) {
    super(props)  
    
    this.state = {
      allUsers:
      [
        {
          username: 'Ugo',
          location: 'Paris',
          pictures: [pic1, pic2, pic3, pic4, pic5]
        },
        {
          username: 'Alice',
          location: 'Paris',
          pictures: [pic1, pic2, pic3, pic4, pic5]
        },
        {
          username: 'Arlo',
          location: 'Paris',
          pictures: [pic1, pic2, pic3, pic4, pic5]
        },
        {
          username: 'Dori',
          location: 'Paris',
          pictures: [pic1, pic2, pic3, pic4, pic5]
        }
      ],
      actualUser: 'FirstUser',
      styleFirstUser: {zIndex: '2'},
      styleSecondUser: {zIndex: '1'},
      styleThirdUser: {zIndex: '1'},
      likedFirstUser: {display: 'none'},
      dislikedFirstUser: {display: 'none'},
      likedSecondUser: {display: 'none'},
      dislikedSecondUser: {display: 'none'},
      likedThirdUser: {display: 'none'},
      dislikedThirdUser: {display: 'none'}
    }

    this.likeClick = this.likeClick.bind(this)
    this.dislikeClick = this.dislikeClick.bind(this)
  }
  
  likeClick() {
    if (this.state.actualUser === 'FirstUser')
      this.setState({styleThirdUser: {zIndex: '1'},
                      styleFirstUser: {transition: 'transform 0.5s ease-out 0.5s', zIndex: '3', transform: 'translateX(1000px) rotate(20deg)'},
                      likedFirstUser: {display: 'initial'},
                      styleSecondUser: {zIndex: '2'},
                      likedThirdUser: {display: 'none'},
                      dislikedThirdUser: {display: 'none'},
                      actualUser: 'SecondUser'})
    else if (this.state.actualUser === 'SecondUser')
    this.setState({styleFirstUser: {zIndex: '1'},
                    styleSecondUser: {transition: 'transform 0.5s ease-out 0.5s', zIndex: '3', transform: 'translateX(1000px) rotate(20deg)'},
                    likedSecondUser: {display: 'initial'},
                    styleThirdUser: {zIndex: '2'},
                    likedFirstUser: {display: 'none'},
                    dislikedFirstUser: {display: 'none'},
                    actualUser: 'ThirdUser'})
    else if (this.state.actualUser === 'ThirdUser')
    this.setState({styleSecondUser: {zIndex: '1'},
                    styleThirdUser: {transition: 'transform 0.5s ease-out 0.5s', zIndex: '3', transform: 'translateX(1000px) rotate(20deg)'},
                    likedThirdUser: {display: 'initial'},
                    styleFirstUser: {zIndex: '2'},
                    likedSecondUser: {display: 'none'},
                    dislikedSecondUser: {display: 'none'},
                    actualUser: 'FirstUser'})
  }
  dislikeClick() {
    if (this.state.actualUser === 'FirstUser')
      this.setState({styleThirdUser: {zIndex: '1'},
                      styleFirstUser: {transition: 'transform 0.5s ease-out 0.5s', zIndex: '3', transform: 'translateX(-1000px) rotate(-20deg)'},
                      dislikedFirstUser: {display: 'initial'},
                      styleSecondUser: {zIndex: '2'},
                      likedThirdUser: {display: 'none'},
                      dislikedThirdUser: {display: 'none'},
                      actualUser: 'SecondUser'})
    else if (this.state.actualUser === 'SecondUser')
    this.setState({styleFirstUser: {zIndex: '1'},
                    styleSecondUser: {transition: 'transform 0.5s ease-out 0.5s', zIndex: '3', transform: 'translateX(-1000px) rotate(-20deg)'},
                    dislikedSecondUser: {display: 'initial'},
                    styleThirdUser: {zIndex: '2'},
                    likedFirstUser: {display: 'none'},
                    dislikedFirstUser: {display: 'none'},
                    actualUser: 'ThirdUser'})
    else if (this.state.actualUser === 'ThirdUser')
    this.setState({styleSecondUser: {zIndex: '1'},
                    styleThirdUser: {transition: 'transform 0.5s ease-out 0.5s', zIndex: '3', transform: 'translateX(-1000px) rotate(-20deg)'},
                    dislikedThirdUser: {display: 'initial'},
                    styleFirstUser: {zIndex: '2'},
                    likedSecondUser: {display: 'none'},
                    dislikedSecondUser: {display: 'none'},
                    actualUser: 'FirstUser'})
  }

  render() {
    return (
        <div id='Match_wrapper'>
          <div id='Match_number'>
            <div id='Match_numberLogo'></div>
            <div id='Match_numberText'>15 more matches found</div>
          </div>
          <div id='Match_framePictures'>
            <MatchUser name={this.state.allUsers[0].username} pictures={this.state.allUsers[0].pictures} liked={this.state.likedFirstUser} disliked={this.state.dislikedFirstUser} addStyle={this.state.styleFirstUser}/>
            <MatchUser name={this.state.allUsers[1].username} pictures={this.state.allUsers[1].pictures} liked={this.state.likedSecondUser} disliked={this.state.dislikedSecondUser} addStyle={this.state.styleSecondUser}/>
            <MatchUser name={this.state.allUsers[2].username} pictures={this.state.allUsers[1].pictures} liked={this.state.likedThirdUser} disliked={this.state.dislikedThirdUser} addStyle={this.state.styleThirdUser}/>
          </div>
          <div id='Match_button'>
            <div id='Match_dislike' onClick={this.dislikeClick}></div>
            <div id='Match_like' onClick={this.likeClick}></div>
          </div>
      </div>
    );
  }
}
export default Match;
