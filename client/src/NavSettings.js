import React from 'react'
import './NavSettings.css'
import {NavLink} from 'react-router-dom'

class NavSettings extends React.Component {
    render() {
        return (
            <div id='NavSettings' onClick={this.props.selectOther}>
                <NavLink id='NavSettings_img' className='NavSettings_imgColor' exact to='/settings' activeClassName='NavSettings_imgColorSelect'></NavLink>
                <NavLink id='NavSettings_text' className='NavSettings_textColor' exact to='/settings' activeClassName='NavSettings_textColorSelect'>Settings</NavLink>
            </div>
        );
    }
}
export default NavSettings;
