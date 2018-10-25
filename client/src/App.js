import React from 'react';
import Nav from './Nav'
import Landing from './Landing';
import Home from './Match';
import Profile from './Profile'
import Chat from './Chat'
import Settings from './Settings'
import ResetPwd from './ResetPwd'
import Cookies from 'js-cookie'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import socketIOClient from "socket.io-client"
import axios from 'axios'


const socket = socketIOClient('http://127.0.0.1:3002')

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            nav: true,
            chatActiv: false,
            usersConnected: []
        }

        this.displayNav = this.displayNav.bind(this)
        this.closeNav = this.closeNav.bind(this)
        this.chatSelected = this.chatSelected.bind(this)
        this.otherSelected = this.otherSelected.bind(this)
    }

    componentDidMount() {       
        if (Cookies.get('id')) {
            socket.removeListener('newUserConnected')
            socket.removeListener('userDisconnected') 
            socket.on('newUserConnected', data => {
                let newUsersConnected = this.state.usersConnected
                newUsersConnected.push(parseInt(data.id, 10))
                axios.post('http://localhost:3001/add_new_user_connected', {
                    "userSignInId": data.id,
                    "userAlreadySignInId": Cookies.get('id')
                })
                .then(() => {
                    socket.disconnect() 
                })
                this.setState({usersConnected: newUsersConnected})
            })
            socket.on('userDisconnected', data => {
                let newUsersConnected = this.state.usersConnected
                const i = newUsersConnected.indexOf(parseInt(data.id, 10))
                if (i > -1) {
                  newUsersConnected.splice(i, 1)
                }         
                this.setState({usersConnected: newUsersConnected})
                
            })

            axios.post('http://localhost:3001/get_users_connected', {
                "userId": Cookies.get('id')
            })
            .then(response => {
                this.setState({usersConnected: response.data})
            })
        }
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
        let homePage = (Cookies.get('username')) ? Home : Landing
        return (
            <Router>
                <div>                    
                    {(window.location.pathname === "/reset_pwd") ? <Route path='/reset_pwd' component={ResetPwd}></Route> :
                    (Cookies.get('username')) ? (
                    <div>
                        <Nav chatActiv={this.state.chatActiv} chatSelected={this.chatSelected} otherSelected={this.otherSelected}/>
                        <Route exact path='/' component={homePage}></Route>
                        <Route path='/profile' component={Profile}></Route>
                        <Route path='/chat' render={() => <Chat usersConnected={this.state.usersConnected}/>}></Route>
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