import React from 'react'
import './Match.css'
import pic1 from './ressources/picture1.jpg';
import pic2 from './ressources/picture2.jpg';
import pic3 from './ressources/picture3.jpg';
import pic4 from './ressources/picture4.jpg';
import pic5 from './ressources/picture5.jpg';


class Match extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pictures: [pic1, pic2, pic3, pic4, pic5],
      picturePrincipale: ''
    }

    this.clickBulletpoint = this.clickBulletpoint.bind(this)
    this.createBulletpoint = this.createBulletpoint.bind(this)
  }

  componentDidMount() {
    this.setState({picturePrincipale: this.state.pictures[0]})
  }

  clickBulletpoint(e) {

    this.setState({picturePrincipale: e.target.dataset.id})
    e.target.style.background = 'white';
  }

  createBulletpoint() {
    let bulletpoint = []

    for (let i = 0; i < this.state.pictures.length; i++) {
      let whiteBullet = (this.state.pictures[i] === this.state.picturePrincipale) ? {background: 'white'} : null
      bulletpoint.push(<div className='Match_bulletpoint' key={i} data-id={this.state.pictures[i]} style={whiteBullet} onClick={this.clickBulletpoint}></div>)
    }
    return bulletpoint
  }

  render() {
    return (
        <div id='Match_wrapper'>
          <div id='Match_number'>
            <div id='Match_numberLogo'></div>
            <div id='Match_numberText'>15 more matches found</div>
          </div>
          <div id='Match_block'>
            <div id='Match_picture' style={{backgroundImage: `url(${this.state.picturePrincipale})`}}>
              <div id='Match_informations'>
                <div id='Match_nameAge'>Ugo, 23</div>
                <div id='Match_location'>
                  <div id='Match_locationLogo'></div>
                  <div id='Match_locationText'>Paris</div>  
                </div>
              </div>
              <div id='Match_frameBulletpoint'>
                {this.createBulletpoint()}
              </div>
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
