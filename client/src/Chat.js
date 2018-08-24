import React from 'react'
import './Chat.css'
import Cookies from 'js-cookie'
import ReactDOM from 'react-dom'
import socketIOClient from "socket.io-client"

import sendBlue from './ressources/send.png'
import sendWhite from './ressources/send_white.png'

const socket = socketIOClient('http://127.0.0.1:3002')

class Chat extends React.Component {
    constructor(props) {
        super(props)

        
        this.state = {
            usersChat: [],
            idChatPrincipal: 0,
            usersInfo: [],
            valueInput: '',
            sendButton: sendWhite,
            allMatchs: '',
            blackOpacity: 'none',
            writing: 'none'
        }

        this.onEnterPress = this.onEnterPress.bind(this)
        this.openAllMatchs = this.openAllMatchs.bind(this)
        this.removeAllMatchs = this.removeAllMatchs.bind(this)
        this.scrollToBottom = this.scrollToBottom.bind(this)
        this.selectUser = this.selectUser.bind(this)
        this.changeInput = this.changeInput.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    componentDidMount() {
        socket.on('displayMessage', data => {
            console.log(data)
            if (data.receiverId === parseInt(Cookies.get('id'), 10)) {
                console.log('Change data')
                console.log(this.state.usersChat[this.state.idChatPrincipal])

                let newUsersChat = this.state.usersChat
                newUsersChat[this.state.idChatPrincipal].push({
                    match_id: newUsersChat[this.state.idChatPrincipal][0].match_id,
                    sender_id: data.sender_id,
                    receiver_id: data.receiver_id,
                    message: data.message
                })
                this.setState({
                    usersChat: newUsersChat,
                    writing: 'none'
                })
            }
        })
        socket.on('displayWrite', data => {
            console.log(data)
            console.log(this.state.usersInfo[this.state.idChatPrincipal].id, data.senderId)
            if (data.receiverId === parseInt(Cookies.get('id'), 10) && data.senderId === this.state.usersInfo[this.state.idChatPrincipal].id) {
                console.log(data.receiverId, parseInt(Cookies.get('id'), 10), 'CHECK')
                if (data.message)
                    this.setState({writing: 'initial'})
                else
                    this.setState({writing: 'none'})
            }
        })

        fetch('/chat_conversation', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "user": Cookies.get('id')
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data, 'ici')
            let usersId = []
            let usersChat = []
            let recentDate = (data[0][0]) ? data[0][data[0].length - 1].date : data[0].date
            
            data.forEach(elem => {
                const date = (elem[0]) ? elem[elem.length - 1].date : elem.date
                const userInfo = (elem[0]) ? elem[0] : elem 
                console.log(date, 'date')
                let userId = userInfo.sender_id !== parseInt(Cookies.get('id'), 10) ? userInfo.sender_id : userInfo.receiver_id
                if (date < recentDate) {
                    usersId.unshift(userId)
                    usersChat.unshift(elem)
                }
                else {
                    usersId.push(userId)
                    usersChat.push(elem)
                }
                this.setState({usersChat: usersChat})
            })

            fetch('/find_match_info', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    "userLogin": parseInt(Cookies.get('id'), 10),
                    "usersMatched": usersId
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data, 'dddd')
                this.setState(
                {
                    usersInfo: data,
                    idChatPrincipal: data.length - 1
                })
            })
        })
        this.scrollToBottom()
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }

    onEnterPress(event) {
        if(event.keyCode === 13 && event.shiftKey === false) {
            event.preventDefault();
            this.submitForm(event);
        }
    }

    openAllMatchs() {
        this.setState({
            allMatchs: 'translateX(250px)',
            blackOpacity: 'initial' 
        })
    }

    scrollToBottom() {
        const { conversation } = this.refs;
        const scrollHeight = conversation.scrollHeight;
        const height = conversation.clientHeight;
        const maxScrollTop = scrollHeight - height;
        console.log(maxScrollTop, scrollHeight, height)
        ReactDOM.findDOMNode(conversation).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    removeAllMatchs() {
        this.setState({
            allMatchs: '',
            blackOpacity: 'none' 
        })
    }

    selectUser(e) {
        const oneConversationData = (this.state.usersChat[this.state.idChatPrincipal][0]) ? this.state.usersChat[this.state.idChatPrincipal][0] : this.state.usersChat[this.state.idChatPrincipal]
        let senderId = parseInt(Cookies.get('id'), 10)
        let receiverId = (oneConversationData.sender_id === parseInt(Cookies.get('id'), 10)) ? oneConversationData.receiver_id : oneConversationData.sender_id

        socket.emit('writeMessage', {
            senderId: senderId,
            receiverId: receiverId,
            message: ''
        })

        let div = e.target

        while (div.className !== 'Chat_profile')
            div = div.parentElement
        this.setState({
            idChatPrincipal: div.dataset.id,
            allMatchs: '',
            blackOpacity: 'none' 
        })
    }

    changeInput(event) {
        this.setState({
            valueInput: event.target.value,
            sendButton: (event.target.value) ? sendBlue : sendWhite
        })
        console.log(this.state.valueInput)
        const oneConversationData = (this.state.usersChat[this.state.idChatPrincipal][0]) ? this.state.usersChat[this.state.idChatPrincipal][0] : this.state.usersChat[this.state.idChatPrincipal]
        let senderId = parseInt(Cookies.get('id'), 10)
        let receiverId = (oneConversationData.sender_id === parseInt(Cookies.get('id'), 10)) ? oneConversationData.receiver_id : oneConversationData.sender_id

        socket.emit('writeMessage', {
            senderId: senderId,
            receiverId: receiverId,
            message: event.target.value
        })
      }

    submitForm() {
        if (this.state.sendButton === sendBlue) {
            console.log(this.state.usersChat[this.state.idChatPrincipal][0])
            const oneConversationData = (this.state.usersChat[this.state.idChatPrincipal][0]) ? this.state.usersChat[this.state.idChatPrincipal][0] : this.state.usersChat[this.state.idChatPrincipal]
            let senderId = parseInt(Cookies.get('id'), 10)
            let receiverId = (oneConversationData.sender_id === parseInt(Cookies.get('id'), 10)) ? oneConversationData.receiver_id : oneConversationData.sender_id
            let matchId = oneConversationData.match_id
            console.log(senderId, receiverId, matchId)

            fetch('/submit_form_chat', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    "senderId": senderId,
                    "receiverId": receiverId,
                    "matchId": matchId,
                    "message": `${this.state.valueInput}`
                })
            })
            .then(response => response.json())
            .then(data => {
                let newUsersChat = this.state.usersChat.slice()
                newUsersChat.splice(this.state.idChatPrincipal, 1, data)
                this.setState(
                {
                    valueInput: '',
                    sendButton: sendWhite,
                    usersChat: newUsersChat,
                })
            })
            socket.emit('newMessage', {
                senderId: senderId,
                receiverId: receiverId,
                matchId: matchId,
                message: this.state.valueInput
            })

        }
    }

    render() {
        let conversation = []
        const usersInfo = this.state.usersInfo
        let users = []
        const id = this.state.idChatPrincipal
        const picturePrincipal = (!this.state.usersInfo[id]) ? '' : this.state.usersInfo[id].picture1
        const messages = this.state.usersChat
        console.log(messages)
        const username = (!this.state.usersInfo[id]) ? '' : this.state.usersInfo[id].username
        const date = (!this.state.usersInfo[id]) ? '' : new Date(this.state.usersInfo[id].date).toLocaleDateString()

        if (messages.length !== 0) {
            conversation.push(<div className='Chat_dateMessage' key={-1}>You matched with {username} on {date}</div>)
            console.log(messages[id], messages[id].length)
            for (let i = 0; i < messages[id].length; i++) {
                if (i > 0) {
                    let date = new Date(messages[id][i].date).getTime()
                    let prevDate = new Date(messages[id][i - 1].date).getTime()            
                    if (date - 4*60*60*1000 > prevDate)
                        conversation.push(<div className='Chat_dateMessage' key={i * -1}>{new Date(messages[id][i].date).toLocaleString()}</div>)
                }
                if (messages[id][i].sender_id === parseInt(Cookies.get('id'), 10))
                    conversation.push(<div className='Chat_message Chat_messageSent' ref={this.scrollTop = this.scrollHeight} key={i}>{messages[id][i].message}</div>)
                else
                    conversation.push(<div className='Chat_message Chat_messageReceived' key={i}>{messages[id][i].message}</div>)
            }

            for (let i = usersInfo.length - 1; i >= 0; --i) {
                console.log(usersInfo, 'ddd')
                console.log(this.state.usersChat, 'sss')
                console.log(this.state.usersChat[this.state.idChatPrincipal][this.state.usersChat[this.state.idChatPrincipal].length - 1], 'FFFFF')
                let lastMessage = (this.state.usersChat[this.state.idChatPrincipal][0]) ? <div className='Chat_lastMessage'>{this.state.usersChat[this.state.idChatPrincipal][this.state.usersChat[this.state.idChatPrincipal].length - 1].message.substr(0, 18)}...</div> : <div className='Chat_lastMessage'>You've been connected</div>

                users.push(
                <div className='Chat_profile' onClick={this.selectUser} data-id={i} key={i}>
                    <div className='Chat_picture' style={{backgroundImage: `url(${this.state.usersInfo[i].picture1})`}}></div>
                    <div className='Chat_text'>
                        <div className='Chat_username'>{this.state.usersInfo[i].username}</div>
                        {lastMessage}
                    </div>
                </div>)
            }
        }

        let userWriting = (this.state.usersInfo[this.state.idChatPrincipal]) ?<div id='Chat_otherUserWritingMessage' style={{display: this.state.writing}}>{this.state.usersInfo[this.state.idChatPrincipal].username} writing a message...</div> : null

        return (
        <div id='Chat_wrapper'>
            <div id='Chat_blackOpacity' style={{display: this.state.blackOpacity}} onClick={this.removeAllMatchs}></div>
            <div id='Chat_boxAllMatchs' style={{transform: this.state.allMatchs}}>
                    <div id='Chat_boxTitle'>
                        <div id='Chat_title'>Messages</div>
                        <div id='Chat_close' onClick={this.removeAllMatchs}></div>
                    </div>
                    <div id='Chat_allMatchs'>
                        {users}
                    </div>
            </div>
            <div id='Chat_box'>
                <div id='Chat_header'>
                    <div id='Chat_dropDown' onClick={this.openAllMatchs}></div>
                    <div id='Chat_strip'>
                        <div id='Chat_stripPicture' style={{backgroundImage: `url(${picturePrincipal})`}}></div>
                    </div>
                </div>
                <div id='Chat_conversation' ref='conversation'>
                    {conversation}
                    {userWriting}
                </div>
                <form action='/check_chat' method='POST' id='Chat_form' onSubmit={this.submitForm}>
                    <textarea id='Chat_input' placeholder="Type your message" name='message' autoFocus form ="Chat_form" cols="35" wrap="soft" value={this.state.valueInput} onChange={this.changeInput} onKeyDown={this.onEnterPress}></textarea>
                    <div id='Chat_submit' style={{backgroundImage: `url(${this.state.sendButton})`, cursor: (this.state.sendButton === sendBlue) ? 'pointer' : 'auto'}} onClick={this.submitForm}/>
                </form>
            </div>
        </div>
        );
    }
}
export default Chat
