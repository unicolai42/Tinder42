import React from 'react'
import './Chat.css'
import Cookies from 'js-cookie'

import dropDown from './ressources/dropdown.png'
import picture from './ressources/picture1.jpg'

class Chat extends React.Component {
    constructor(props) {
        super(props)  
        
        this.state = {
            userChat: [],
            chatPrincipal: '',
            dropDown: dropDown
        }

        this.onEnterPress = this.onEnterPress.bind(this)
        this.changeInput = this.changeInput.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    componentDidMount() {
        fetch('/chat_conversation', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "user": `${Cookies.get('id')}`
            })
        })
        .then(response => response.json())
        .then(data => this.setState(
            {
                userChat: data,
                chatPrincipal: data[0],
                valueInput: ''
            }
        ))
    }

    onEnterPress(event) {
        if(event.keyCode === 13 && event.shiftKey === false) {
            event.preventDefault();
            this.submitForm(event);
        }
    }

    changeInput(event) {
        this.setState({valueInput: event.target.value});
      }

    submitForm(event) {
        event.preventDefault();
        // if (this.state.valueMail && this.state.validMail === true && this.state.validMail !== 'taken'
        // && this.state.valuePassword && this.state.validPassword !== 'tooLong' && this.state.validPassword !== 'unsafe'
        // && this.state.valueUsername && this.state.validUsername === true && this.state.validUsername !== 'taken') {
        //   fetch('/check_signUp', {
        //     method: 'post',
        //     headers: {'Content-Type':'application/json'},
        //     body: JSON.stringify({
        //       "mail": `${this.state.valueMail}`,
        //       "password": `${this.state.valuePassword}`,
        //       "username": `${this.state.valueUsername}`
        //     })
        //   });
        //   this.props.changeForSignIn(this.state.valueMail)
        }

    render() {
        let color = !this.state.valueInput ? 'Chat_submitColorGray' : 'Chat_submitColorBlue'

        let conversation = []
        const messages = this.state.chatPrincipal
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].sender_id === parseInt(Cookies.get('id'), 10))
                conversation.push(<div id='Chat_messageSent' className='Chat_message' ref={this.scrollTop = this.scrollHeight} key={i}>{messages[i].message}</div>)
            else
                conversation.push(<div id='Chat_messageReceived' className='Chat_message' key={i}>{messages[i].message}</div>)
        }
        console.log(conversation)
        return (
        <div id='Chat_wrapper'>
            <div id='Chat_header'>
                <div id='Chat_dropDown' style={{backgroundImage: `url(${this.state.dropDown})`}} ></div>
                <div id='Chat_strip'>
                    <div id='Chat_stripPicture' style={{backgroundImage: `url(${picture})`}}></div>
                </div>
            </div>
            <div id='Chat_conversation'>
                {conversation}
            </div>
                <form action='/check_chat' method='POST' id='Chat_form' onSubmit={this.submitForm}>
                    <textarea id='Chat_input' placeholder="Type your message" name='message' autoFocus form ="Chat_form" cols="35" wrap="soft" value={this.state.valueInput} onChange={this.changeInput} onKeyDown={this.onEnterPress}></textarea>
                    <input id='Chat_submit' className={color} type="submit" value="SEND" />
                </form>
        </div>
        );
    }
}
export default Chat
