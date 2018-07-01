import React from 'react';
import Landing from './Landing';
import Home from './Home';
import Profil from './Profil';
import Cookies from 'js-cookie'
import {BrowserRouter as Router, Route} from 'react-router-dom'


class App extends React.Component {
    render() {
        let homePage = (Cookies.get('username')) ? Home : Landing
        console.log(homePage)
        return (
            <Router>
                <div>
                    <Route exact path='/' component={homePage}></Route>
                    <Route path='/profil' component={Profil}></Route>
                </div>
            </Router>
        )
    }
}

export default App;