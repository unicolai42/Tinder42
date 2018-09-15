import React from 'react'
import './Chat.css'
import Cookies from 'js-cookie'
import ReactDOM from 'react-dom'
import socketIOClient from "socket.io-client"
import axios from 'axios'

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
        this.messagesConversationRead = this.messagesConversationRead.bind(this)
        this.changeInput = this.changeInput.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    componentDidMount() {
        socket.removeListener('displayNotif1')
        // socket.on('userDisconnected', data => {
        //     console.log(data, 'BBBB') 
        // })
        socket.on('displayMessage', data => {
            const oldLastUser = this.state.usersInfo[this.state.usersInfo.length - 1]

            if (data.receiverId === parseInt(Cookies.get('id'), 10)) {
                let conversationOpen = 0

                console.log(window.location)
                if (data.senderId === this.state.usersInfo[this.state.idChatPrincipal].id && window.location.href === 'http://localhost:3000/chat') {
                    axios.post('http://localhost:3001/chat_read', {
                        "userId": Cookies.get('id'),
                        "matcherId": data.senderId
                    })
                    conversationOpen = 1
                }
                
                if (this.state.usersChat[0][0]) {
                    console.log(this.state.usersChat[0][0])
                    let newUsersChat = this.state.usersChat
                    
                    this.state.usersChat.forEach((elem, i) => {
                        let matchId = (elem[0]) ? elem[0].match_id : elem.match_id
                        if (matchId === data.matchId) {
                            newUsersChat[i].push({
                                match_id: data.matchId,
                                sender_id: data.senderId,
                                receiver_id: data.receiverId,
                                read_message: conversationOpen,
                                message: data.message
                            })
                            if (window.location.href === 'http://localhost:3000/chat') {
                                this.setState({
                                    usersChat: newUsersChat,
                                    writing: 'none'
                                })
                            }
                        }
                    })

                    let newUsersInfo = this.state.usersInfo
                    this.state.usersInfo.forEach((elem, i) => {
                        if (elem.id === data.senderId) {
                            newUsersInfo.splice(i, 1)
                            newUsersInfo.push(elem)
                            newUsersChat = this.state.usersChat
                            let userChatChange = newUsersChat[i]
                            newUsersChat.splice(i, 1)
                            newUsersChat.push(userChatChange)
                            console.log(window.location.href)
                            if (window.location.href === 'http://localhost:3000/chat') {
                                this.setState({
                                    usersChat: newUsersChat,
                                    usersInfo: newUsersInfo
                                })
                            }
                            if (data.senderId !== oldLastUser.id) {
                                let l = 0
                                while (l < this.state.usersInfo.length) {
                                    if (oldLastUser === this.state.usersInfo[l]) {
                                        this.setState({idChatPrincipal: l})
                                        return
                                    }
                                    l++
                                }
                            }
                        }
                    })
                }
                else {
                    let newUsersInfo = this.state.usersInfo
                    let newUsersChat = []
                    newUsersInfo.forEach((elem, i) => {
                        console.log(elem)
                        if (elem.id === data.senderId) {
                            newUsersChat.push([{
                                match_id: data.matchId,
                                sender_id: data.senderId,
                                receiver_id: data.receiverId,
                                read_message: conversationOpen,
                                message: data.message
                            }])
                            if (window.location.href === 'http://localhost:3000/chat') {
                                this.setState({
                                    usersChat: newUsersChat,
                                    writing: 'none'
                                })
                            }
                        }
                        else {
                            newUsersChat.push([{
                                match_id: data.matchId,
                                sender_id: data.senderId,
                                receiver_id: data.receiverId,
                                read_message: -1
                            }])
                        }
                    })

                    this.state.usersInfo.forEach((elem, i) => {
                        if (elem.id === data.senderId) {
                            newUsersInfo.splice(i, 1)
                            newUsersInfo.push(elem)
                            newUsersChat = this.state.usersChat
                            let userChatChange = newUsersChat[i]
                            newUsersChat.splice(i, 1)
                            newUsersChat.push(userChatChange)
                            console.log(window.location.href)
                            if (window.location.href === 'http://localhost:3000/chat') {
                                this.setState({
                                    usersChat: newUsersChat,
                                    usersInfo: newUsersInfo
                                })
                            }
                            if (data.senderId !== oldLastUser.id) {
                                let l = 0
                                while (l < this.state.usersInfo.length) {
                                    if (oldLastUser === this.state.usersInfo[l]) {
                                        this.setState({idChatPrincipal: l})
                                        return
                                    }
                                    l++
                                }
                            }
                        }
                    })
                }
            }
        })
        socket.on('displayWrite', data => {
            if (data.receiverId === parseInt(Cookies.get('id'), 10) && data.senderId === this.state.usersInfo[this.state.idChatPrincipal].id) {
                if (window.location.href === 'http://localhost:3000/chat') {
                    if (data.message)
                        this.setState({writing: 'initial'})
                    else
                        this.setState({writing: 'none'})
                }
            }
        })
        socket.on('displayNotif1', data => {
            if ((data.receiverId === parseInt(Cookies.get('id'), 10) && data.senderId !== this.state.usersInfo[this.state.idChatPrincipal].id) || (data.receiverId === parseInt(Cookies.get('id'), 10) && window.location.href !== 'http://localhost:3000/chat')) {
                socket.emit('newNotif2', {
                    receiverId: data.receiverId
                })
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
            if (data[0]) {
                let usersId = []
                let usersChat = []
                let recentDate = (data[0][0]) ? data[0][data[0].length - 1].date : data[0].date
                
                data.forEach(elem => {
                    const date = (elem[0]) ? elem[elem.length - 1].date : elem.date
                    const userInfo = (elem[0]) ? elem[0] : elem
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
                    this.setState(
                    {
                        usersInfo: data,
                        idChatPrincipal: data.length - 1
                    })
                    
                })
            }
        })

        this.scrollToBottom()
    }

    componentWillUnmount() {
        socket.removeListener('displayMessage')
        socket.removeListener('displayWrite')
    }

    componentDidUpdate() {
        this.scrollToBottom()

        if (this.state.usersInfo[this.state.idChatPrincipal]) {
            let i = this.state.usersChat[this.state.idChatPrincipal].length - 1
            let lastMessageOtherUserSend = this.state.usersChat[this.state.idChatPrincipal][this.state.usersChat[this.state.idChatPrincipal].length - 1]
            
            while (lastMessageOtherUserSend.receiver_id !== parseInt(Cookies.get('id'), 10) && i > -1) {
                lastMessageOtherUserSend = this.state.usersChat[this.state.idChatPrincipal][i]
                i--
            }
            
            if (i !== -1 && lastMessageOtherUserSend.read_message === 0) {
                axios.post('http://localhost:3001/chat_read', {
                    "userId": Cookies.get('id'),
                    "matcherId": this.state.usersInfo[this.state.idChatPrincipal].id
                })
            }
        }
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
        const { conversation } = this.refs
        const scrollHeight = conversation.scrollHeight
        const height = conversation.clientHeight
        const maxScrollTop = scrollHeight - height;
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

        console.log(this.state.usersInfo[div.dataset.id].readNotif)

        if (this.state.usersInfo[div.dataset.id].readNotif === 0) {
            axios.post('http://localhost:3001/match_read', {
                "userId": Cookies.get('id'),
                "matcherId": this.state.usersInfo[div.dataset.id].id
            })
        }

        let i = this.state.usersChat[div.dataset.id].length - 1
        let lastMessageOtherUserSend = this.state.usersChat[div.dataset.id][this.state.usersChat[div.dataset.id].length - 1]

        if (lastMessageOtherUserSend) {
            while (lastMessageOtherUserSend.receiver_id !== senderId && i > -1) {
                lastMessageOtherUserSend = this.state.usersChat[div.dataset.id][i]
                i--
            }
            
            if (i !== -1 && lastMessageOtherUserSend.read_message === 0) {
                axios.post('http://localhost:3001/chat_read', {
                    "userId": Cookies.get('id'),
                    "matcherId": this.state.usersInfo[div.dataset.id].id
                })
            }

            let j = 0
            this.state.usersChat[div.dataset.id].forEach( (message, i) => {
                if (message.read_message === 0 && message.receiver_id === senderId) {
                    const newUsersChat = this.state.usersChat
                    newUsersChat[div.dataset.id][i].read_message = 1
                    this.setState({usersChat: newUsersChat})
                    j++
                }
            })

            socket.emit('countRemoveNotif1', {
                userId: senderId,
                removeNotif: j
            })
        }
    }

    messagesConversationRead() {
        let k = 0
        console.log(this.state.usersChat[this.state.idChatPrincipal])
        if (this.state.usersChat[this.state.idChatPrincipal][0]) {
            this.state.usersChat[this.state.idChatPrincipal].forEach( (message, i) => {
                if (message.read_message === 0 && message.receiver_id === parseInt(Cookies.get('id'), 10)) {
                    const newUsersChat = this.state.usersChat
                    newUsersChat[this.state.idChatPrincipal][i].read_message = 1
                    this.setState({usersChat: newUsersChat})
                    k++
                }
            })
        }

        socket.emit('countRemoveNotif1', {
            userId: parseInt(Cookies.get('id'), 10),
            removeNotif: k
        })

        if (k) {
            axios.post('http://localhost:3001/chat_read', {
                "userId": Cookies.get('id'),
                "matcherId": this.state.usersInfo[this.state.idChatPrincipal].id
            })
        }
    }

    changeInput(event) {
        this.setState({
            valueInput: event.target.value,
            sendButton: (event.target.value) ? sendBlue : sendWhite
        })
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
        if (this.state.sendButton === sendBlue && this.state.usersChat[0]) {
            const oneConversationData = (this.state.usersChat[this.state.idChatPrincipal][0]) ? this.state.usersChat[this.state.idChatPrincipal][0] : this.state.usersChat[this.state.idChatPrincipal]
            let senderId = parseInt(Cookies.get('id'), 10)
            let receiverId = (oneConversationData.sender_id === parseInt(Cookies.get('id'), 10)) ? oneConversationData.receiver_id : oneConversationData.sender_id
            let matchId = oneConversationData.match_id

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
            socket.emit('newNotif1', {
                senderId: senderId,
                receiverId: receiverId
            })

            let newUsersInfoOrder = this.state.usersInfo
            let newUsersChatOrder = this.state.usersChat
            const actualUser = this.state.usersInfo[this.state.idChatPrincipal]
            const actualConversation = this.state.usersChat[this.state.idChatPrincipal]
            newUsersInfoOrder.splice(this.state.idChatPrincipal, 1)
            newUsersInfoOrder.push(actualUser)
            newUsersChatOrder.splice(this.state.idChatPrincipal, 1)
            newUsersChatOrder.push(actualConversation)
            this.setState({
                userInfo: newUsersInfoOrder,
                idChatPrincipal: newUsersInfoOrder.length - 1,
                usersChat: newUsersChatOrder
            })
        }
    }

    render() {
        let conversation = []
        const usersInfo = this.state.usersInfo
        let users = []
        const id = this.state.idChatPrincipal
        console.log(id)
        const picturePrincipal = (!this.state.usersInfo[id]) ? '' : this.state.usersInfo[id].picture1
        const messages = this.state.usersChat
        const username = (!this.state.usersInfo[id]) ? '' : this.state.usersInfo[id].username
        const date = (!this.state.usersInfo[id]) ? '' : new Date(this.state.usersInfo[id].date).toLocaleDateString()

        if (messages.length !== 0) {
            conversation.push(<div className='Chat_dateMessage' key={date}>You matched with {username} on {date}</div>)
            for (let i = 0; i < messages[id].length && messages[id][0].read_message !== -1; i++) {
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
                const nbLetterLastMessage = (this.state.usersChat[i][this.state.usersChat[i].length - 1] && this.state.usersChat[i][this.state.usersChat[i].length - 1].read_message !== -1) ? this.state.usersChat[i][this.state.usersChat[i].length - 1].message.length : null
                const dotOrNot = (nbLetterLastMessage > 18) ? '...' : null
                let lastMessage = (this.state.usersChat[i][this.state.usersChat[i].length - 1] && this.state.usersChat[i][this.state.usersChat[i].length - 1].read_message !== -1) ? <div className='Chat_lastMessage'>{this.state.usersChat[i][this.state.usersChat[i].length - 1].message.substr(0, 18)}{dotOrNot}</div> : <div className='Chat_lastMessage'>You've been connected</div>

                let lastMessageOtherUserSend
                let j = this.state.usersChat[i].length - 1

                if (this.state.usersChat[i][0]) {
                    lastMessageOtherUserSend = this.state.usersChat[i][this.state.usersChat[i].length - 1]
                    if (lastMessageOtherUserSend) {
                        while (lastMessageOtherUserSend.receiver_id !== parseInt(Cookies.get('id'), 10) && j > -1) {
                            lastMessageOtherUserSend = this.state.usersChat[i][j]
                            j--
                        }
                    }
                }
                console.log(lastMessageOtherUserSend)
                let readLastMessage = (j === -1) ? 1 : (lastMessageOtherUserSend === 0 || !lastMessageOtherUserSend) ? 0 : (lastMessageOtherUserSend.read_message === 0) ? 0 : 1
                let urlPicture1 = (this.state.usersInfo[i].picture1) ? {backgroundImage: `url(${this.state.usersInfo[i].picture1})`} : null
                users.push(
                <div className='Chat_profile' style={(!usersInfo[i].readNotif || !readLastMessage) ? {backgroundColor: 'rgba(67, 166, 252, 0.1)'} : {}} onClick={this.selectUser} data-id={i} key={i}>
                    <div className='Chat_picture' style={urlPicture1}></div>
                    <div className='Chat_text'>
                        <div className='Chat_username'>{this.state.usersInfo[i].username}</div>
                        {lastMessage}
                    </div>
                </div>)
            }
        }

        let chatBar = (this.state.usersChat[0]) ? 
            <form action='/check_chat' method='POST' id='Chat_form' onSubmit={this.submitForm}>
                <textarea id='Chat_input' placeholder="Type your message" name='message' form="Chat_form" cols="35" wrap="soft" value={this.state.valueInput} onClick={this.messagesConversationRead} onChange={this.changeInput} onKeyDown={this.onEnterPress}></textarea>
                <div id='Chat_submit' style={{backgroundImage: `url(${this.state.sendButton})`, cursor: (this.state.sendButton === sendBlue) ? 'pointer' : 'auto'}} onClick={this.submitForm}/>
            </form>
            :  null

        let urlPicturePrincipal = (picturePrincipal) ? {backgroundImage: `url(${picturePrincipal})`} : null
        const pictureOrNoMatch = (this.state.usersChat[0]) ? <div id='Chat_stripPicture' style={urlPicturePrincipal}></div> : <div id='Chat_noMatch'>No match yet</div>
        let userWriting = (this.state.usersInfo[this.state.idChatPrincipal]) ?<div id='Chat_otherUserWritingMessage' style={{display: this.state.writing}}>{this.state.usersInfo[this.state.idChatPrincipal].username} writing a message...</div> : null

        console.log(this.props.usersConnected, 'HERE')
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
                        {pictureOrNoMatch}
                    </div>
                </div>
                <div id='Chat_conversation' ref='conversation'>
                    {conversation}
                    {userWriting}
                </div>
                {chatBar}
            </div>
        </div>
        )
    }
}
export default Chat
