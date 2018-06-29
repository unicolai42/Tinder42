import React from 'react';
import Landing from './Landing';
import Profil from './Profil';
import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' component={Landing}></Route>
                    <Route path='/profil' component={Profil}></Route>
                </div>
            </Router>
        )
    }
}

export default App;