import React from 'react'
import './Profile.css'
import InfoUser from './InfoUser'
import ProfileDragPictures from './ProfileDragPictures'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

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

    this.movePicture = this.movePicture.bind(this)
  }

  movePicture(dragIndex, hoverIndex) {
    let { pictures } = this.state.user
    // let dragPicture = pictures[dragIndex]
    let newOrderPictures = pictures

    if (hoverIndex < dragIndex) {
      for (let y = hoverIndex; y < dragIndex; y++) {
        for (let i = hoverIndex; i < dragIndex; i++) {
          let swap = newOrderPictures[i]
          newOrderPictures[i] = newOrderPictures[i + 1]
          newOrderPictures[i + 1] = swap
        }
      }
    }
    else if (hoverIndex > dragIndex) {
      for (let y = hoverIndex; y > dragIndex; y--) {
        for (let i = hoverIndex; i > dragIndex; i--) {
          let swap = newOrderPictures[i]
          newOrderPictures[i] = newOrderPictures[i - 1]
          newOrderPictures[i - 1] = swap
        }
      }
    }

		this.setState({
				user: {
          pictures: newOrderPictures
            // $splice: [[dragIndex, 1], [hoverIndex, 0, dragPicture]],
				}
			})
    console.log(this.state.user.pictures)
	}

  render() {

    let firstPicture = this.state.user.pictures[0]
    let pictures = []
    for (let i = 0; i < this.state.user.pictures.length; i++)
      pictures.push(<ProfileDragPictures picture={this.state.user.pictures[i]} key={i} id={i} movePicture={this.movePicture}/>)
    return (
      <div id='Profile_wrapper'>
        <div id='Profile_block'>
            <div id='Profile_picture'>
              <div id='Profile_firstPicture' style={{backgroundImage: `url('${firstPicture}')`}}></div>
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
