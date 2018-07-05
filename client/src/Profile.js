import React from 'react';
import './Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Ugo',
      age: '24',
      test: 'Fucking yes !!!'
    }
  }

  render() {
    return (
      <div id='Profile_wrapper'>
        <div id='Profile_block'>
            <div id='Profile_firstPicture'></div>
            <div id='Profile_secondPicture'>
              <div className='Profile_pictures' id='Profile_picture1'></div>
              <div className='Profile_pictures' id='Profile_picture2'></div>
              <div className='Profile_pictures' id='Profile_picture3'></div>
              <div className='Profile_pictures' id='Profile_picture4'></div>
              <div className='Profile_pictures' id='Profile_picture5'></div>
            </div>
            <div id='Profile_about'>
              <div className='Profile_box'>
                <div id='Profile_NameAgeText'>{this.state.name}{(this.state.age) ? `, ${this.state.age}` : null}</div>
                <div id='Profile_NameAgeEdit'>Edit <span id='Profile_NameAgeEditImg'></span></div>
              </div>
              <div id='Profile_aboutDescription' className='Profile_box'>
                <div className='Profile_aboutText'>Hello</div>
              </div>
              <div className='Profile_box'>
                <div className='Profile_aboutText'>Paris</div>
                <div id='Profile_aboutLocation' className='Profile_aboutImg'></div>
              </div>
              <div className='Profile_box'>
                <div className='Profile_aboutText'>42</div>
                <div id='Profile_aboutWork' className='Profile_aboutImg'></div>
              </div>
              <div className='Profile_box'>
                <div className='Profile_aboutText'>#Hacker #Self-taught</div>
                <div id='Profile_aboutInterest' className='Profile_aboutImg'></div>
              </div>
              <div className='Profile_box'>
                <div className='Profile_aboutText'>French</div>
                <div id='Profile_aboutLanguage' className='Profile_aboutImg'></div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}
export default Profile;
