import React from 'react'
import './Profile.css'
import InfoUser from './InfoUser'

class Profile extends React.Component {
  render() {
    return (
      <div id='Profile_wrapper'>
        <div id='Profile_block'>
            <div id='Profile_picture'>
              <div id='Profile_firstPicture'></div>
              <div id='Profile_secondPicture'>
                <div className='Profile_pictures' id='Profile_picture1'></div>
                <div className='Profile_pictures' id='Profile_picture2'></div>
                <div className='Profile_pictures' id='Profile_picture3'></div>
                <div className='Profile_pictures' id='Profile_picture4'></div>
                <div className='Profile_pictures' id='Profile_picture5'></div>
              </div>
            </div>
            <div id='Profile_about'>
              <InfoUser/>
            </div>
        </div>
      </div>
    );
  }
}
export default Profile;
