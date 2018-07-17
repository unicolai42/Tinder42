import React from 'react'
import './Match.css'
import pic1 from './ressources/picture1.jpg';
import pic2 from './ressources/picture2.jpg';
import pic3 from './ressources/picture3.jpg';
import pic4 from './ressources/picture4.jpg';
import pic5 from './ressources/picture5.jpg';
import InfoUser from './InfoUser';


class Match extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pictures: [pic1, pic2, pic3, pic4, pic5],
      picturePrincipale: '',
      changePicture: 0,
      clickedInfo: false,
      about: 'flex',
      info: 'none'
    }

    this.clickBulletpoint = this.clickBulletpoint.bind(this)
    this.createBulletpoint = this.createBulletpoint.bind(this)
    this.previousPicture = this.previousPicture.bind(this)
    this.nextPicture = this.nextPicture.bind(this)
    this.clickedInfo = this.clickedInfo.bind(this)
  }

  componentDidMount() {
    this.setState({picturePrincipale: this.state.pictures[0]})
  }

  clickedInfo() {
    console.log(this.state.clickedInfo)
    this.setState((prevState) => {
        return {clickedInfo: !prevState.clickedInfo}
    })
    console.log(this.state.clickedInfo)
    if (!this.state.clickedInfo)
      this.setState({about: 'none', info: 'flex'})
    else
      this.setState({about: 'flex', info: 'none'})
  }

  previousPicture() {
    if (this.state.changePicture !== 0)
      this.setState((prevState) => {
        return {changePicture: prevState.changePicture -= 100 * -1}
      })
    else
      this.setState({changePicture: (this.state.pictures.length - 1) * 100 * -1})
  }

  nextPicture() {
    console.log(this.state.changePicture)
    if (this.state.changePicture / -100 !== this.state.pictures.length - 1)
    this.setState((prevState) => {
      return {changePicture: prevState.changePicture += 100 * -1}
    })
  else
    this.setState({changePicture: 0})
  }

  clickBulletpoint(e) {
    console.log(e.target)
    this.setState({changePicture: e.target.dataset.id * -100})
    e.target.style.background = 'white';
  }

  createBulletpoint() {
    let bulletpoint = []

    for (let i = 0; i < this.state.pictures.length; i++) {
      let whiteBullet = (i * -100 === this.state.changePicture) ? {background: 'white'} : null
      bulletpoint.push(<div className='Match_bulletpoint' key={i} data-id={i} style={whiteBullet} onClick={this.clickBulletpoint}></div>)
    }
    return bulletpoint
  }

  render() {
    let pictures = []
    let i = 0
    this.state.pictures.forEach((elem) => {
      pictures.push(<div className='Match_picture' key={i} style={{backgroundImage: `url(${this.state.pictures[i]})`, transform: `translateX(${this.state.changePicture}%)`}}></div>)
      i++
    })
    return (
        <div id='Match_wrapper'>
          <div id='Match_number'>
            <div id='Match_numberLogo'></div>
            <div id='Match_numberText'>15 more matches found</div>
          </div>
          <div id='Match_actualFrame'>
            {pictures}
            <div id='Match_arrows'>
              <div id='Match_arrowLeft' onClick={this.previousPicture}></div>
              <div id='Match_arrowRight' onClick={this.nextPicture}></div>
            </div>
            <div id='Match_informations'>
              <div id='Match_nameAge' style={{display: this.state.about}}>Ugo, 23</div>
              <div id='Match_location' style={{display: this.state.about}}>
                <div id='Match_locationLogo'></div>
                <div id='Match_locationText'>Paris</div>  
              </div>
            </div>
            <div id='Match_about' onClick={this.clickedInfo} style={{display: this.state.about}}></div>
            <div id='Match_moreInfo' style={{display: this.state.info}}>
              <div id='Match_close' onClick={this.clickedInfo}></div>
              <div id='Match_frameInfo'>
                <InfoUser/>
              </div>
              
            </div>
            <div id='Match_frameBulletpoint'>
              {this.createBulletpoint()}
            </div>
          </div>
          <div id='Match_button'>
            <div id='Match_dislike'></div>
            <div id='Match_like'></div>
          </div>
      </div>
    );
  }
}
export default Match;
