import React from 'react'
import './Nav.css'
import {NavLink} from 'react-router-dom'
import Cookies from 'js-cookie'
import Logo from './Logo'

class Nav extends React.Component {
  constructor(props) {
    super(props)

    this.logOutKillCookie = this.logOutKillCookie.bind(this);
  }
  logOutKillCookie() {
    Cookies.remove('id')
    Cookies.remove('username')
  }
  render() {
    return (
      <div id='Nav_wrapper'>
        <Logo className='Nav_logo'/>
        <div id='Nav_menu'>
          <NavLink id='Nav_match' className='Nav_category' exact to='/' activeClassName={'Nav_clicked'}>Match</NavLink>
          <NavLink id='Nav_chat' className='Nav_category' exact to='/chat' activeClassName={'Nav_clicked'}>Chats</NavLink>
          <NavLink id='Nav_profil' className='Nav_category' exact to='/profil' activeClassName={'Nav_clicked'}>Profil</NavLink>
          <a href='/' id='Nav_logOut' className='Nav_category' onClick={this.logOutKillCookie}>LogOut</a>
        </div>
      </div>
    );
  }
}
export default Nav;
