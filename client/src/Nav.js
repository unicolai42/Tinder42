import React from 'react'
import './Nav.css'
import NavLogOut from './NavLogOut'
import NavMatch from './NavMatch'
import NavChat from './NavChat'
import NavProfile from './NavProfile'
import NavSettings from './NavSettings'

class Nav extends React.Component {
  render() {
    return (
      <div>
        <div id='Nav_wrapper'>
            <NavProfile selectOther={this.props.otherSelected}/>
            <NavChat selectChat={this.props.chatSelected} chatActiv={this.props.chatActiv}/>
            <NavMatch selectOther={this.props.otherSelected}/>
            <NavSettings selectOther={this.props.otherSelected}/>
            <NavLogOut selectOther={this.props.otherSelected}/>            
        </div>
      </div>
    );
  }
}
export default Nav;