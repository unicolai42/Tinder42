import React from 'react'
import './NavLogOut.css'
import {NavLink} from 'react-router-dom'
import Cookies from 'js-cookie'
import socketIOClient from "socket.io-client"
import axios from 'axios'


const socket = socketIOClient('http://127.0.0.1:3002')


class NavLogOut extends React.Component {
    constructor(props) {
        super(props)  

        this.logOut = this.logOut.bind(this)
    }

    logOut() {
        socket.emit('userLogOut', {
            userId: Cookies.get('id')
        })
        axios.post('http://localhost:3001/maj_last_connection_and_deconnect_user', {
            "userId": Cookies.get('id')
        })
        Cookies.remove('id')
        Cookies.remove('username')
        window.location = '/'
    }

    render() {
        return (
            <div id='NavLogOut' onClick={this.logOut}>
                <NavLink id='NavLogOut_img' className='NavLogOut_imgColor' exact to='/LogOut' activeClassName='NavLogOut_imgColorSelect'></NavLink>
                <NavLink id='NavLogOut_text' className='NavLogOut_textColor' exact to='/LogOut' activeClassName='NavLogOut_textColorSelect'>LogOut</NavLink>
            </div>
        );
    }
}
export default NavLogOut;
