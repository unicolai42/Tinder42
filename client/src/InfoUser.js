import React from 'react'
import './InfoUser.css'
import Cookies from 'js-cookie'
import axios from 'axios'


console.error = (function() {
    var error = console.error

    return function(exception) {
        if ((exception + '').indexOf('Warning: A component is `contentEditable`') !== 0) {
            error.apply(console, arguments)
        }
    }
})() /// Permet de ne pas afficher le message d'erreur pour contentEditable que react ne gere pas encore : https://github.com/facebook/draft-js/issues/53

class InfoUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            location: '',
            age: '',
            description: '',
            work: '',
            interest: '',
            language: '',
            editButton: 'Edit',
            editContent: 'false',
            borderEdit: {}
        }
    
        this.editInfo = this.editInfo.bind(this)
        this.changeName = this.changeName.bind(this)
        this.changeAge = this.changeAge.bind(this)
        this.changeDescription = this.changeDescription.bind(this)
        this.changeLocation = this.changeLocation.bind(this)
        this.changeWork = this.changeWork.bind(this)
        this.changeInterest = this.changeInterest.bind(this)
        this.changeLanguage = this.changeLanguage.bind(this)
    }

    componentDidMount() {
        axios.post('http://localhost:3001/load_info_user', {
            "userId": Cookies.get('id')
        })
        .then(response => {
            this.setState({
                username: response.data.username,
                location: response.data.location,
                age: response.data.age,
                description: response.data.description,
                work: response.data.work,
                hashtags: response.data.hashtags,
                language: response.data.language
            })
            console.log(response.data)
        })
    }

    editInfo() {
        console.log('ok')
        if (this.state.editButton === 'Edit')
            this.setState({
                editButton: 'Validate',
                editContent: 'true',
                borderEdit: {boxShadow: `0px 0px 1px 1px blue`}
            })
        else
            this.setState({
                editButton: 'Edit',
                editContent: 'false',
                borderEdit: {},
            })
    }

    changeName(e) {
        console.log(e)
        this.setProps({username: e.target.result})
    }

    changeAge() {

    }

    changeDescription() {

    }

    changeLocation() {

    }

    changeWork() {

    }

    changeInterest() {

    }

    changeLanguage() {

    }

    render() {
        let hashtags = []
        if (this.state.hashtags)
            this.state.hashtags.forEach(element => {
                hashtags.push(<li key={element}>{element}</li>)
            });
        return (
            <div id='InfoUser_block'>
                <div className='InfoUser_box'>
                    <div id='InfoUser_NameAgeText'>
                        <span style={this.state.borderEdit} contentEditable={this.state.editContent} onChange={this.changeName}>
                            {this.state.name}
                        </span>
                        <span style={this.state.borderEdit} contentEditable={this.state.editContent} onChange={this.changeAge}>
                            {(this.state.age) ? `, ${this.state.age}` : null}
                        </span>
                    </div>
                    <div id='InfoUser_NameAgeEdit' onClick={this.editInfo}>
                        <span id='InfoUser_NameAgeEditText'>
                            {this.state.editButton}
                        </span>
                        <span className='InfoUser_aboutImg' id='InfoUser_NameAgeEditImg'/>
                    </div>
                </div>
                <div id='InfoUser_aboutDescription' className='InfoUser_box InfoUser_aboutText' style={this.state.borderEdit} contentEditable={this.state.editContent} onChange={this.changeDescription}>Hello</div>
                <div className='InfoUser_line'/>
                <div className='InfoUser_box'>
                    <div className='InfoUser_aboutText' style={this.state.borderEdit} contentEditable={this.state.editContent} onChange={this.changeLocation}>
                        {this.state.location}
                    </div>
                    <div id='InfoUser_aboutLocation' className='InfoUser_aboutImg'/>
                </div>
                <div className='InfoUser_line'/>
                <div className='InfoUser_box'>
                    <div className='InfoUser_aboutText' style={this.state.borderEdit} contentEditable={this.state.editContent} onChange={this.changeWork}>
                        {this.state.work}
                    </div>
                    <div id='InfoUser_aboutWork' className='InfoUser_aboutImg'/>
                </div>
                <div className='InfoUser_line'/>
                <div className='InfoUser_box'>
                    <ul className='InfoUser_aboutText' style={this.state.borderEdit} contentEditable={this.state.editContent} onChange={this.changeInterest}>
                        {hashtags}
                    </ul>
                <div id='InfoUser_aboutInterest' className='InfoUser_aboutImg'/>
                </div>
                <div className='InfoUser_line'/>
                <div className='InfoUser_box'>
                    <div className='InfoUser_aboutText' style={this.state.borderEdit} contentEditable={this.state.editContent} onChange={this.changeLanguage}>
                        {this.state.language}
                    </div>
                    <div id='InfoUser_aboutLanguage' className='InfoUser_aboutImg'/>
                </div>
            </div>
        );
    }
}
export default InfoUser;