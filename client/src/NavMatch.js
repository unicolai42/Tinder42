import React from 'react'
import './NavMatch.css'
import {NavLink} from 'react-router-dom'

class NavMatch extends React.Component {
    render() {
        return (
            <div id='NavMatch' onClick={this.props.selectOther}>
                <NavLink id='NavMatch_img' className='NavMatch_imgColor' exact to='/' activeClassName='NavMatch_imgColorSelect'></NavLink>
                <NavLink id='NavMatch_text' className='NavMatch_textColor' exact to='/' activeClassName='NavMatch_textColorSelect'>Match</NavLink>
            </div>
        );
    }
}
export default NavMatch;
