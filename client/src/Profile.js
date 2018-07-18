import React from 'react'
import './Profile.css'
import InfoUser from './InfoUser'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ProfilePicture from './ProfilePicture'

import pic1 from './ressources/picture1.jpg';
import pic2 from './ressources/picture2.jpg';
import pic3 from './ressources/picture3.jpg';
import pic4 from './ressources/picture4.jpg';
import pic5 from './ressources/picture5.jpg';

class Profile extends React.Component {
  constructor(props) {
    super(props)  
    
    this.state = {
      user: {
        username: 'Ugo',
        location: 'Paris',
        pictures: [pic1, pic2, pic3, pic4, pic5]
      }
    }
  }
  render() {

    let pictures = []
    for (let i = 1; i <= this.state.user.pictures.length; i++)
      pictures.push(<ProfilePicture key={i} id={`Profile_picture${i}`}/>)
    console.log(pictures)
    return (
      <div id='Profile_wrapper'>
        <div id='Profile_block'>
            <div id='Profile_picture'>
              <div id='Profile_firstPicture'></div>
              <div id='Profile_secondPicture'>
                {pictures}
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
export default DragDropContext(HTML5Backend)(Profile)
