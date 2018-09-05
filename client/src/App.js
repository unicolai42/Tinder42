import React from 'react';
import Nav from './Nav'
import Landing from './Landing';
import Home from './Match';
import Profile from './Profile'
import Chat from './Chat'
import Settings from './Settings'
import Cookies from 'js-cookie'
import {BrowserRouter as Router, Route} from 'react-router-dom'


class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            nav: true,
            chatActiv: false
        }

        this.displayNav = this.displayNav.bind(this)
        this.closeNav = this.closeNav.bind(this)
        this.chatSelected = this.chatSelected.bind(this)
        this.otherSelected = this.otherSelected.bind(this)
    }

    displayNav() {
        this.setState({nav: true})
    }

    closeNav() {
        this.setState({nav: false})
    }

    chatSelected(e) {
        e.preventDefault()
        this.setState({chatActiv: true})
    }

    otherSelected(e) {
        e.preventDefault()
        this.setState({chatActiv: false})
    }

    render() {
        console.log(this.state.chatActiv)
        let homePage = (Cookies.get('username')) ? Home : Landing
        return (
            <Router>
                <div>
                    {(Cookies.get('username')) ? (
                    <div>
                        <Nav chatActiv={this.state.chatActiv} chatSelected={this.chatSelected} otherSelected={this.otherSelected}/>
                        <Route exact path='/' component={homePage}></Route>
                        <Route path='/profile' component={Profile}></Route>
                        <Route path='/chat' render={() => <Chat/>}></Route>
                        <Route path='/settings' component={Settings}></Route>
                    </div>
                    ) : (
                    <Landing/>
                    )}
                </div>
            </Router>
        )
    }
}

export default App;