import React from 'react'
import './NavLogOut.css'
import {NavLink} from 'react-router-dom'
import Cookies from 'js-cookie'
import socketIOClient from "socket.io-client"


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
        //new date insert in last log out then in chat if user not connected display last login time
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
