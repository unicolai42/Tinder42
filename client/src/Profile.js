import React from 'react'
import './Profile.css'
import InfoUser from './InfoUser'
import ProfileDragPictures from './ProfileDragPictures'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Cookies from 'js-cookie'
import Dropzone from 'react-dropzone'
import axios from 'axios'


class Profile extends React.Component {
  constructor(props) {
    super(props)  
    
    this.state = {
      user: {
        username: '',
        location: '',
        pictures: []
      }
    }

    this.addPicture = this.addPicture.bind(this)
    this.movePicture = this.movePicture.bind(this)
    this.uploadPicture = this.uploadPicture.bind(this)
  }

  componentDidMount() {
    axios.post('http://localhost:3001/load_userdata', {
      "user": Cookies.get('id')
    })
    .then(response => {
        this.setState(
        {
          user: {
            username: response.data.username,
            location: response.data.location,
            pictures: response.data.pictures
          }
        })
    })
  }

  addPicture(e) {
    console.log(e)
  }

  movePicture(dragIndex, hoverIndex) {
    let { pictures } = this.state.user
    // let dragPicture = pictures[dragIndex]
    let newOrderPictures = pictures

    if (hoverIndex < dragIndex) {
      for (let i = dragIndex; i > hoverIndex; i--) {
        let swap = newOrderPictures[i]
        newOrderPictures[i] = newOrderPictures[i - 1]
        newOrderPictures[i - 1] = swap
      }
    }
    else if (hoverIndex > dragIndex) {
      for (let i = dragIndex; i < hoverIndex; i++) {
        let swap = newOrderPictures[i]
        newOrderPictures[i] = newOrderPictures[i + 1]
        newOrderPictures[i + 1] = swap
      }
    }

		this.setState({
				user: {
          pictures: newOrderPictures
				}
			})
  }
  
  uploadPicture(file) {
    console.log(file[0].name)
    var reader = new FileReader();
    reader.onload = (e) => {
      console.log(e)
      axios.post('http://localhost:3001/upload_picture', {
        "userId": Cookies.get('id'),
        "name": file[0].name,
        "picture": e.target.result
      })
        // document.querySelector('.webcamVideo').innerHTML += 'img src="' + e.target.result + '"';
    };
    reader.readAsDataURL(file[0]);
    // 
  }

  render() {
    let firstPicture = this.state.user.pictures[0]
    let pictures = []
    for (let i = 0; i < 5; i++) {
      pictures.push((this.state.user.pictures[i]) ? <ProfileDragPictures picture={this.state.user.pictures[i]} key={i} id={i} movePicture={this.movePicture}/> : <Dropzone ref={(ref) => { this.uploadInput = ref; }} type="file" onDrop={(files) => this.uploadPicture(files)} className='Profile_boxPictures' key={i} onChange={this.uploadPicture}><div className='Profile_emptyPictures'/></Dropzone>)
      console.log(!this.state.user.pictures[i], pictures[i])
    }
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
