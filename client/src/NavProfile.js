import React from 'react'
import './NavProfile.css'
import {NavLink} from 'react-router-dom'

class NavProfile extends React.Component {
    render() {
        return (
            <div id='NavProfile' onClick={this.props.selectOther}>
                <NavLink id='NavProfile_img' className='NavProfile_imgColor' exact to='/profile' activeClassName='NavProfile_imgColorSelect'></NavLink>
                <NavLink id='NavProfile_text' className='NavProfile_textColor' exact to='/profile' activeClassName='NavProfile_textColorSelect'>Profile</NavLink>
            </div>
        );
    }
}
export default NavProfile;
