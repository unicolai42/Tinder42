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
      pictures: {}
    }

    this.movePicture = this.movePicture.bind(this)
    this.uploadPicture = this.uploadPicture.bind(this)
    this.removePicture = this.removePicture.bind(this)
  }

  componentDidMount() {
    axios.post('http://localhost:3001/load_pictures', {
      "userId": Cookies.get('id')
    })
    .then(response => {
        this.setState({pictures: response.data.pictures})
    })
  }

  movePicture(dragIndex, hoverIndex) {
    let { pictures } = this.state
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

		this.setState({pictures: newOrderPictures})
  }
  
  uploadPicture(file) {
    for (let i = 0; i < file.length; i++) {
      if (file[i].type === 'image/jpeg' || file[i].type === 'image/jpg' || file[i].type === 'image/png') {
        var reader = new FileReader();
        reader.onload = (e) => {
          axios.post('http://localhost:3001/upload_picture', {
            "userId": Cookies.get('id'),
            "picture": e.target.result
          })
          .then(response => {
            const pictures = this.state.pictures
            console.log(pictures)
            let i
            for (i = 0; i < pictures.length; i++) {
              if (pictures[i] === null)
                break
            }
            pictures.splice(i, 1, response.data)
            this.setState({pictures: pictures})
          })
        }
        reader.readAsDataURL(file[i])
      }
    }
  }

  removePicture(picture) {
    console.log(picture.target.parentElement.id)
    const removeId = picture.target.parentElement.id
    let newOrderPictures = this.state.pictures
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
    
    this.setState({pictures: newOrderPictures})
  }

  render() {
    let firstPicture = this.state.pictures[0]
    let pictures = []
    for (let i = 0; i < 5; i++) {
      pictures.push((this.state.pictures[i]) ? <ProfileDragPictures picture={this.state.pictures[i]} removePicture={this.removePicture} key={i} id={i} movePicture={this.movePicture}/> : <Dropzone ref={(ref) => { this.uploadInput = ref; }} type="file" onDrop={(files) => this.uploadPicture(files)} className='Profile_boxPictures' key={i}><div className='Profile_emptyPictures'/></Dropzone>)
    }
    let urlFirstPicture = (firstPicture) ? {backgroundImage: `url('${firstPicture}')`} : null
    return (
      <div id='Profile_wrapper'>
        <div id='Profile_block'>
            <div id='Profile_picture'>
              <div id='Profile_firstPicture' style={urlFirstPicture}></div>
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
