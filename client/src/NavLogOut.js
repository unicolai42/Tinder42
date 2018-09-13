import React from 'react'
import './NavLogOut.css'
import {NavLink} from 'react-router-dom'
import Cookies from 'js-cookie'


class NavLogOut extends React.Component {
    constructor(props) {
        super(props)  

        this.logOut = this.logOut.bind(this)
    }

    logOut() {
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
