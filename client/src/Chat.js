import React from 'react'
import './Chat.css'
import Cookies from 'js-cookie'

class Chat extends React.Component {
    constructor(props) {
        super(props)  
        
        this.state = {
            usersChat: [],
            idChatPrincipal: 0,
            // matchName: '',
            // dateMatch: '',
            usersInfo: [],
            valueInput: '',
            allMatchs: '',
            blackOpacity: 'none'
        }

        this.onEnterPress = this.onEnterPress.bind(this)
        this.openAllMatchs = this.openAllMatchs.bind(this)
        this.removeAllMatchs = this.removeAllMatchs.bind(this)
        this.changeInput = this.changeInput.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    componentDidMount() {
        fetch('/chat_conversation', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "user": Cookies.get('id')
            })
        })
        .then(response => response.json())
        .then(data => {
            this.setState(
            {
                usersChat: data
            })

            let usersId = []
            data.forEach(elem => {
                let userId = elem[0].sender_id !== parseInt(Cookies.get('id'), 10) ? elem[0].sender_id : elem[0].receiver_id
                console.log(userId)
                usersId.push(userId)
            });
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
                }, console.log(data.length))
            })
        })

        const conversation = this.refs.conversation
        window.onload = () => {
            conversation.scrollTop = conversation.scrollHeight;
        }
    }

    componentDidUpdate() {
        const conversation = this.refs.conversation
        window.onload = () => {
            conversation.scrollTop = conversation.scrollHeight;
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

    removeAllMatchs() {
        this.setState({
            allMatchs: '',
            blackOpacity: 'none' 
        })
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
        const id = this.state.idChatPrincipal
        const picturePrincipal = (!this.state.usersInfo[id]) ? '' : this.state.usersInfo[id].picture1
        const messages = this.state.usersChat
        const username = (!this.state.usersInfo[id]) ? '' : this.state.usersInfo[id].username
        const date = (!this.state.usersInfo[id]) ? '' : new Date(this.state.usersInfo[id].date).toLocaleDateString()

        if (messages.length !== 0) {
            conversation.push(<div id='Chat_dateMessage' key={-1}>You matched with {username} on {date}</div>)
            for (let i = 0; i < messages[id].length; i++) {
                if (i > 0) {
                    let date = new Date(messages[id][i].date).getTime()
                    let prevDate = new Date(messages[id][i - 1].date).getTime()            
                    if (date - 4*60*60*1000 > prevDate)
                        conversation.push(<div id='Chat_dateMessage' key={i * -1}>{new Date(messages[id][i].date).toLocaleString()}</div>)
                }
                if (messages[id][i].sender_id === parseInt(Cookies.get('id'), 10))
                    conversation.push(<div id='Chat_messageSent' className='Chat_message' ref={this.scrollTop = this.scrollHeight} key={i}>{messages[id][i].message}</div>)
                else
                    conversation.push(<div id='Chat_messageReceived' className='Chat_message' key={i}>{messages[id][i].message}</div>)
            }
        }
        return (
        <div id='Chat_wrapper'>
            <div id='Chat_blackOpacity' style={{display: this.state.blackOpacity}} onClick={this.removeAllMatchs}></div>
            <div id='Chat_allMatchs' style={{transform: this.state.allMatchs}}>
                    <div id='Chat_boxTop'>
                        <div id='Chat_title'>Messages</div>
                        <div id='Chat_close'></div>
                    </div>
                    {console.log(this.state.usersChat)}
            </div>
            <div id='Chat_box'>
                <div id='Chat_header'>
                    <div id='Chat_dropDown' onClick={this.openAllMatchs} ></div>
                    <div id='Chat_strip'>
                        <div id='Chat_stripPicture' style={{backgroundImage: `url(${picturePrincipal})`}}></div>
                    </div>
                </div>
                <div id='Chat_conversation' ref='conversation'>
                    {conversation}
                </div>
                <form action='/check_chat' method='POST' id='Chat_form' onSubmit={this.submitForm}>
                    <textarea id='Chat_input' placeholder="Type your message" name='message' autoFocus form ="Chat_form" cols="35" wrap="soft" value={this.state.valueInput} onChange={this.changeInput} onKeyDown={this.onEnterPress}></textarea>
                    <input id='Chat_submit' className={color} type="submit" value="SEND" />
                </form>
            </div>
        </div>
        );
    }
}
export default Chat
