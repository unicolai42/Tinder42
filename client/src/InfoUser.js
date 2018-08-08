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
            name: '',
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
                name: response.data.username,
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
        this.setProps({name: e.target.result})
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

        let modify = []
        modify.push(<input className='InfoUser_input' type="text" placeholder='Name' value={this.state.name} onChange={this.changeName} />)
        modify.push(<input className='InfoUser_input' type="text" placeholder='Age' value={this.state.age} onChange={this.changeAge} />)
        modify.push(<input className='InfoUser_input' type="text" placeholder='Description' value={this.state.description} onChange={this.changeDescription} />)
        modify.push(<input className='InfoUser_input' type="text" placeholder='Location' value={this.state.location} onChange={this.changeLocation} />)
        modify.push(<input className='InfoUser_input' type="text" placeholder='Work' value={this.state.work} onChange={this.changeWork} />)
        modify.push(<input className='InfoUser_input' type="text" placeholder='Interest' value={this.state.interest} onChange={this.changeInterest} />)
        modify.push(<input className='InfoUser_input' type="text" placeholder='Language' value={this.state.language} onChange={this.changeLanguage} />)
        modify.push(<div id='InfoUser_submit'>Submit</div>)

        let info = []
        info.push(
            <div key={1} className='InfoUser_box'>
                <div id='InfoUser_NameAgeText'>
                    <span style={this.state.borderEdit} onChange={this.changeName}>
                        {this.state.name}
                    </span>
                    <span style={this.state.borderEdit} onChange={this.changeAge}>
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
        )
        if (this.state.description)
            info.push(
                <div key={2} id='InfoUser_aboutDescription' className='InfoUser_box InfoUser_aboutText' style={this.state.borderEdit} onChange={this.changeDescription}>
                    {this.state.description}
                </div> 
            )
        if (this.state.location) {
            info.push(
                <div key={3} className='InfoUser_line'/>
            )
            info.push(
                <div key={4} className='InfoUser_box'>
                    <div className='InfoUser_aboutText' style={this.state.borderEdit} onChange={this.changeLocation}>
                        {this.state.location}
                    </div>
                    <div id='InfoUser_aboutLocation' className='InfoUser_aboutImg'/>
                </div>
            )
        }
        if (this.state.work) {
            info.push(
                <div key={5} className='InfoUser_line'/>
            )
            info.push(
                <div key={6} className='InfoUser_box'>
                    <div className='InfoUser_aboutText' style={this.state.borderEdit} onChange={this.changeWork}>
                        {this.state.work}
                    </div>
                    <div id='InfoUser_aboutWork' className='InfoUser_aboutImg'/>
                </div>
            )
        }
        if (this.state.hashtags) {
            info.push(
                <div key={7} className='InfoUser_line'/>
            )
            info.push(
                <div key={8} className='InfoUser_box'>
                    <ul className='InfoUser_aboutText' style={this.state.borderEdit} onChange={this.changeInterest}>
                        {hashtags}
                    </ul>
                    <div id='InfoUser_aboutInterest' className='InfoUser_aboutImg'/>
                </div>
            )
        }
        if (this.state.language) {
            info.push(
                <div key={9} className='InfoUser_line'/>
            )
            info.push(
                <div key={10} className='InfoUser_box'>
                    <div className='InfoUser_aboutText' style={this.state.borderEdit} onChange={this.changeLanguage}>
                        {this.state.language}
                    </div>
                    <div id='InfoUser_aboutLanguage' className='InfoUser_aboutImg'/>
                </div>
            )
        }

        let display = (this.state.editButton === 'Edit') ? info : <div id='InfoUser_modify'>{modify}</div>

        return (
            <div id='InfoUser_block'>
                {display}
            </div>
        )
    }
}
export default InfoUser;