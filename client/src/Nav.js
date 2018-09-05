import React from 'react'
import './Nav.css'
// import Cookies from 'js-cookie'
import NavNotification from './NavNotification'
import NavMatch from './NavMatch'
import NavChat from './NavChat'
import NavProfile from './NavProfile'
import NavSettings from './NavSettings'

class Nav extends React.Component {
  //   this.displayMenu = this.displayMenu.bind(this);
  //   this.closeMenu = this.closeMenu.bind(this);
  //   this.logOutKillCookie = this.logOutKillCookie.bind(this);
  // }

  // displayMenu() {
  //   console.log('ok')
  //   this.setState({ showCategory: true }, () => {
  //     document.addEventListener('click', this.closeMenu)
  //   })
  // }

  // closeMenu(event) {
  //   if (!this.dropdownMenu.contains(event.target)) {
  //     this.setState({ showCategory: false }, () => {
  //       document.removeEventListener('click', this.closeMenu)
  //     })
  //   }
  // }

  // logOutKillCookie() {
  //   Cookies.remove('id')
  //   Cookies.remove('username')
  render() {
    console.log(this.props.chatActiv)
    return (
      <div>
        <div id='Nav_wrapper'>
            <NavProfile selectOther={this.props.otherSelected}/>
            <NavChat selectChat={this.props.chatSelected} chatActiv={this.props.chatActiv}/>
            <NavMatch selectOther={this.props.otherSelected}/>
            <NavNotification selectOther={this.props.otherSelected}/>
            <NavSettings selectOther={this.props.otherSelected}/>
        </div>
      </div>
    );
  }
}
export default Nav;




///// WITH TRIGRAM DROPDOWN CLICK /////

// import React from 'react'
// import './Nav.css'
// import {NavLink} from 'react-router-dom'
// import Cookies from 'js-cookie'
// import Logo from './Logo'

// class Nav extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       showCategory: false
//     }

//     this.displayMenu = this.displayMenu.bind(this);
//     this.closeMenu = this.closeMenu.bind(this);
//     this.logOutKillCookie = this.logOutKillCookie.bind(this);
//   }

//   displayMenu() {
//     console.log('ok')
//     this.setState({ showCategory: true }, () => {
//       document.addEventListener('click', this.closeMenu)
//     })
//   }

//   closeMenu(event) {
//     if (!this.dropdownMenu.contains(event.target)) {
//       this.setState({ showCategory: false }, () => {
//         document.removeEventListener('click', this.closeMenu)
//       })
//     }
//   }

//   logOutKillCookie() {
//     Cookies.remove('id')
//     Cookies.remove('username')
//   }
//   render() {
//     return (
//       <div id='Nav_wrapper'>
//         <Logo className='Nav_logo'/>
//         <div id='Nav_trigram' onClick={this.displayMenu}>{'\u2630'}</div>
//       {(this.state.showCategory) ? (
//         <div id='Nav_menu' ref={(element) => {this.dropdownMenu = element;}}>
//           <NavLink id='Nav_match' className='Nav_category' exact to='/' activeClassName={'Nav_clicked'}>Match</NavLink>
//           <NavLink id='Nav_chat' className='Nav_category' exact to='/chat' activeClassName={'Nav_clicked'}>Chats</NavLink>
//           <NavLink id='Nav_profil' className='Nav_category' exact to='/profil' activeClassName={'Nav_clicked'}>Profil</NavLink>
//           <a href='/' id='Nav_logOut' className='Nav_category' onClick={this.logOutKillCookie}>LogOut</a>
//         </div>
//       ) : null}
//       </div>
//     );
//   }
// }
// export default Nav;
