import React from 'react';
import Nav from './Nav'
import Landing from './Landing';
import Home from './Home';
import Profil from './Profil';
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
        console.log(this.state.nav)
        return (
            <Router>
                <div>
                    {(Cookies.get('username')) ? (
                    <Nav />
                    ) : (
                    <Landing/>
                    )}
                    <Route exact path='/' component={homePage}></Route>
                    <Route path='/profil' component={Profil}></Route>
                </div>
            </Router>
        )
    }
}

export default App;