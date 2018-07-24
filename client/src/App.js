import React from 'react';
import Nav from './Nav'
import Landing from './Landing';
import Home from './Match';
import Profile from './Profile'
import Chat from './Chat';
import Cookies from 'js-cookie'
import {BrowserRouter as Router, Route} from 'react-router-dom'


class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            nav: true
        }

        this.displayNav = this.displayNav.bind(this)
        this.closeNav = this.closeNav.bind(this)
    }

    displayNav() {
        this.setState({nav: true})
    }

    closeNav() {
        this.setState({nav: false})
    }

    render() {
        let homePage = (Cookies.get('username')) ? Home : Landing
        return (
            <Router>
                <div>
                    {(Cookies.get('username')) ? (
                    <div>
                        <Nav />
                        <Route exact path='/' component={homePage}></Route>
                        <Route path='/profile' component={Profile}></Route>
                        <Route path='/chat' component={Chat}></Route>
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