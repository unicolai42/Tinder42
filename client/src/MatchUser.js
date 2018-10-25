import React from 'react'
import './MatchUser.css'
import InfoMatch from './InfoMatch';
import Geocode from "react-geocode"
import Key from "./Key"

Geocode.setApiKey(Key.googleMapKey)


class MatchUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pictures: this.props.userInfo.pictures,
            picturePrincipale: this.props.userInfo.pictures[0],
            changePicture: 0,
            clickedInfo: false,
            about: 'flex',
            info: 'none',
            location: ''
        }
      
        this.clickBulletpoint = this.clickBulletpoint.bind(this)
        this.createBulletpoint = this.createBulletpoint.bind(this)
        this.previousPicture = this.previousPicture.bind(this)
        this.nextPicture = this.nextPicture.bind(this)
        this.clickedInfo = this.clickedInfo.bind(this)
    }

    componentDidMount() {
        Geocode.fromLatLng(this.props.userInfo.latitude, this.props.userInfo.longitude).then(res => {
            let city = res.results[0].formatted_address
            let end
            let start
            let i = city.length - 1
            while (i) {
                if (city[i] === ',')
                    end = i
                if (/\d/.test(city[i])) {
                    start = i + 2
                    break
                }
                i--
            }
            city = city.substr(start, end - start)
            this.setState({location: city})                
        }, error => {
            this.setState({location: ''}) 
        })
    }
      
    clickedInfo() {
        this.setState((prevState) => {
            return {clickedInfo: !prevState.clickedInfo}
        })
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
        if (this.state.changePicture / -100 !== this.state.pictures.length - 1)
            this.setState((prevState) => {
            return {changePicture: prevState.changePicture += 100 * -1}
            })
        else
            this.setState({changePicture: 0})
    }
    
    clickBulletpoint(e) {
        this.setState({changePicture: e.target.dataset.id * -100})
        e.target.style.background = 'white';
    }
    
    createBulletpoint() {
        let bulletpoint = []

        for (let i = 0; i < this.state.pictures.length; i++) {
            let whiteBullet = (i * -100 === this.state.changePicture) ? {background: 'white'} : null
            bulletpoint.push(<div className='MatchUser_bulletpoint' key={i} data-id={i} style={whiteBullet} onClick={this.clickBulletpoint}></div>)
        }
        return bulletpoint
    }

    render() {
        let pictures = []
        for (let i = 0; i < this.state.pictures.length; i++) {
            pictures.push(<div className='MatchUser_picture' key={i} style={{backgroundImage: `url(${this.state.pictures[i]})`, transform: `translateX(${this.state.changePicture}%)`}}></div>)
        }
        let arrows = []
        if (this.state.pictures.length > 1)
            arrows.push(
                <div key={this.state.pictures[0]} id='MatchUser_arrows'>
                    <div id='MatchUser_arrowLeft' onClick={this.previousPicture}></div>
                    <div id='MatchUser_arrowRight' onClick={this.nextPicture}></div>
                </div>
            )
        else
            arrows = null
        // this.state.pictures.forEach((elem) => {
        // pictures.push(<div className='MatchUser_picture' key={i} style={{backgroundImage: `url(${this.state.pictures[i]})`, transform: `translateX(${this.state.changePicture}%)`}}></div>)
        // i++
        // })
        return (
            <div id='MatchUser_frameAbsolute' style={this.props.addStyle}>
                <div id='MatchUser_frame'>
                    {pictures}
                    <div id='MatchUser_liked' style={this.props.liked}>LIKE</div>
                    <div id='MatchUser_disliked' style={this.props.disliked}>NOPE</div>                   
                    {arrows}
                    <div id='MatchUser_informations'>
                        <div id='MatchUser_nameAge' style={{display: this.state.about}}>{this.props.userInfo.username}, {this.props.userInfo.age}</div>
                        <div id='MatchUser_location' style={{display: this.state.about}}>
                            <div id='MatchUser_locationLogo'></div>
                            <div id='MatchUser_locationText'>{this.state.location}</div>  
                        </div>
                    </div>
                    <div id='MatchUser_about' onClick={this.clickedInfo} style={{display: this.state.about}}></div>
                    <div id='MatchUser_moreInfo' style={{display: this.state.info}}>
                        <div id='MatchUser_close' onClick={this.clickedInfo}></div>
                        <div id='MatchUser_frameInfo'>
                            <InfoMatch userInfo={this.props.userInfo} dislikeUser={this.props.dislikeUser}/>
                        </div>    
                    </div>
                    <div id='MatchUser_frameBulletpoint'>
                        {this.createBulletpoint()}
                    </div>
                </div>
            </div>
        )
    }
}

export default MatchUser