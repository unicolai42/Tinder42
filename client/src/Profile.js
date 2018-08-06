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

    this.movePicture = this.movePicture.bind(this)
    this.uploadPicture = this.uploadPicture.bind(this)
    this.removePicture = this.removePicture.bind(this)
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
    console.log(newOrderPictures)
    axios.post('http://localhost:3001/update_order_pictures', {
      "userId": Cookies.get('id'),
      "newOrderPictures": newOrderPictures
    })

		this.setState({
      user: {
        pictures: newOrderPictures
      }
    })
  }
  
  uploadPicture(file) {
    console.log(file)
    for (let i = 0; i < file.length; i++) {
      var reader = new FileReader();
      reader.onload = (e) => {
        console.log(e)
        axios.post('http://localhost:3001/upload_picture', {
          "userId": Cookies.get('id'),
          "picture": e.target.result
        })
        .then(response => {
          const pictures = this.state.user.pictures
          console.log(pictures)
          let i
          for (i = 0; i < pictures.length; i++) {
            if (pictures[i] === null)
              break
          }
          console.log(response.data)
          pictures.splice(i, 1, response.data)
          this.setState({
            user: {
              pictures: pictures
            }
          })
        })
      }
      console.log('file', file.length)
      reader.readAsDataURL(file[i])
    }
  }

  removePicture(picture) {
    console.log(picture.target.parentElement.id)
    const removeId = picture.target.parentElement.id
    let newOrderPictures = this.state.user.pictures
    const removeUrl = newOrderPictures[removeId]
    let removePublicId

    console.log(removeUrl.lastIndexOf("/"))
    console.log(removeUrl.lastIndexOf("."))
    removePublicId = removeUrl.slice(removeUrl.lastIndexOf("/") + 1, removeUrl.lastIndexOf("."))

    newOrderPictures.splice(removeId, 1)
    newOrderPictures.push(null)
    // console.log(newOrderPictures)
    console.log(removeUrl)
    console.log(removePublicId)

    axios.post('http://localhost:3001/update_order_pictures', {
      "userId": Cookies.get('id'),
      "newOrderPictures": newOrderPictures,
      "removeUrl": removePublicId
    })
    
    this.setState({
      user: {
        pictures: newOrderPictures
      }
    })
  }

  render() {
    console.log(this.state.user.pictures)
    let firstPicture = this.state.user.pictures[0]
    let pictures = []
    for (let i = 0; i < 5; i++) {
      pictures.push((this.state.user.pictures[i]) ? <ProfileDragPictures picture={this.state.user.pictures[i]} removePicture={this.removePicture} key={i} id={i} movePicture={this.movePicture}/> : <Dropzone ref={(ref) => { this.uploadInput = ref; }} type="file" onDrop={(files) => this.uploadPicture(files)} className='Profile_boxPictures' key={i}><div className='Profile_emptyPictures'/></Dropzone>)
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
