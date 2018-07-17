import React from 'react'
import './Match.css'
import MatchUser from './MatchUser';


class Match extends React.Component {
  constructor(props) {
    super(props)  
    
    this.state = {
      styleActualUser: {zIndex: '2'}
    }

    this.likeClick = this.likeClick.bind(this)
    this.dislikeClick = this.dislikeClick.bind(this)
  }
  
  likeClick() {
    this.setState({styleActualUser: {zIndex: '2', transform: 'translateX(400px) rotate(20deg)'}})
  }
  dislikeClick() {
    this.setState({styleActualUser: {zIndex: '2'}})
  }

  render() {
    return (
        <div id='Match_wrapper'>
          <div id='Match_number'>
            <div id='Match_numberLogo'></div>
            <div id='Match_numberText'>15 more matches found</div>
          </div>
          <div id='Match_framePictures'>
            <MatchUser addStyle={this.state.styleActualUser}/>
            <MatchUser addStyle={{zIndex: '1'}}/>
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
