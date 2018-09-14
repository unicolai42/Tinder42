import React from 'react'
import './MatchUser.css'
import InfoMatch from './InfoMatch';

class MatchUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pictures: this.props.userInfo.pictures,
            picturePrincipale: this.props.userInfo.pictures[0],
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
            bulletpoint.push(<div className='MatchUser_bulletpoint' key={i} data-id={i} style={whiteBullet} onClick={this.clickBulletpoint}></div>)
        }
        return bulletpoint
    }

    render() {
        console.log('check')
        let pictures = []
        console.log(this.state.pictures.length, 'length')
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
                            <div id='MatchUser_locationText'>Paris</div>  
                        </div>
                    </div>
                    <div id='MatchUser_about' onClick={this.clickedInfo} style={{display: this.state.about}}></div>
                    <div id='MatchUser_moreInfo' style={{display: this.state.info}}>
                        <div id='MatchUser_close' onClick={this.clickedInfo}></div>
                        <div id='MatchUser_frameInfo'>
                            <InfoMatch userInfo={this.props.userInfo}/>
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