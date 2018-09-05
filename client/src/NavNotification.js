import React from 'react'
import './NavNotification.css'
import {NavLink} from 'react-router-dom'

class NavNotification extends React.Component {
    render() {
        return (
            <div id='NavNotification' onClick={this.props.selectOther}>
                <NavLink id='NavNotification_img' className='NavNotification_imgColor' exact to='/notification' activeClassName='NavNotification_imgColorSelect'></NavLink>
                <NavLink id='NavNotification_text' className='NavNotification_textColor' exact to='/notification' activeClassName='NavNotification_textColorSelect'>Notification</NavLink>
            </div>
        );
    }
}
export default NavNotification;
