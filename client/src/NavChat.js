import React from 'react'
import './NavChat.css'
import {NavLink} from 'react-router-dom'
import Cookies from 'js-cookie'
import socketIOClient from "socket.io-client"
import axios from 'axios'

const socket = socketIOClient('http://127.0.0.1:3002')


class NavChat extends React.Component {
    constructor(props) {
        super(props)  
        
        this.state = {
          notifications: 0
        }
    }
    componentDidMount() {
        socket.on('displayNotif2', data => {
            if (data.receiverId === parseInt(Cookies.get('id'), 10) && !this.props.chatActiv) {
                this.setState(prevState => ({notifications: prevState.notifications + 1}))
            }
        })
        socket.on('deleteNotif1', data => {
            if (parseInt(Cookies.get('id'), 10) === data.userId) {
                this.setState(prevState => ({notifications: prevState.notifications - data.removeNotif}))
            }
        })
        axios.post('http://localhost:3001/load_notifications', {
            "userId": Cookies.get('id')
        })
        .then(response => {
            this.setState({notifications: response.data})
        })
    }
    render() {
        let notifications = (this.state.notifications) ? <div className='NavChat_notifications'><span className='NavChat_notifcationsNumber'>{this.state.notifications}</span></div> : null
        return (
            <div id='NavChat' onClick={this.props.selectChat}>
                <NavLink id='NavChat_img' className='NavChat_imgColor' exact to='/chat' activeClassName='NavChat_imgColorSelect'></NavLink>
                <NavLink id='NavChat_text' className='NavChat_textColor' exact to='/chat' activeClassName='NavChat_textColorSelect'>Chat</NavLink>
                {notifications}
            </div>
        );
    }
}
export default NavChat;
