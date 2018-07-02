import React from 'react'
import './NavChat.css'
import {NavLink} from 'react-router-dom'

class NavChat extends React.Component {
    render() {
        return (
            <div id='NavChat'>
                <NavLink id='NavChat_img' className='NavChat_imgColor' exact to='/chat' activeClassName='NavChat_imgColorSelect'></NavLink>
                <NavLink id='NavChat_text' className='NavChat_textColor' exact to='/chat' activeClassName='NavChat_textColorSelect'>Chat</NavLink>
            </div>
        );
    }
}
export default NavChat;
