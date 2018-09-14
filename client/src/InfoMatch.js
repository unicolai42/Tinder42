import React from 'react'
import './InfoUser.css'
import axios from 'axios'
import 'rc-slider/assets/index.css'
import Geocode from "react-geocode"
import Key from "./Key"

Geocode.setApiKey(Key.googleMapKey)

class InfoMatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.userInfo.username,
            latitude: this.props.userInfo.latitude,
            longitude: this.props.userInfo.longitude,
            location: '',            
            age: this.props.userInfo.age,
            description: this.props.userInfo.description,
            work: this.props.userInfo.work,
            tags: [],
            language: this.props.userInfo.language,
            sex: this.props.userInfo.sex,
            popularity: this.props.userInfo.popularity
        }
    }

    componentDidMount() {
        axios.post('http://localhost:3001/load_info_user', {
            "userId": this.props.userInfo.id
        })
        .then(response => {
            if (response.data.latitude && response.data.longitude) {
                Geocode.fromLatLng(response.data.latitude, response.data.longitude).then(res => {
                    let city = res.results[0].formatted_address
                    let end
                    let start
                    let i = city.length - 1
                    while (i) {
                        if (city[i] === ',')
                            end = i
                        if (/\d/.test(city[i])) {
                            start = i + 2
                            break
                        }
                        i--
                    }
                    city = city.substr(start, end - start)
                    this.setState({location: city})                
                }, error => {
                    console.error(error)
                })
            }
            this.setState({
                tags: response.data.hashtags
            })
        })
    }

      
    render() {
        console.log(this.state.tags)
        let tags_li = []
        if (this.state.tags)
            this.state.tags.forEach(element => {
                tags_li.push(<li key={element.name}>{element.name}</li>)
            })

        let info = []
        info.push(
            <div key={1} className='InfoUser_box'>
                <div id='InfoUser_NameAgeText'>
                    <span style={this.state.borderEdit}>
                        {this.state.name}
                    </span>
                    <span style={this.state.borderEdit}>
                        {(this.state.age) ? `, ${this.state.age}` : null}
                    </span>
                </div>
                <div id='InfoUser_NameAgeEdit' onClick={this.editInfo}>
                    <span id='InfoUser_NameAgeEditText'>
                        {this.state.editButton}
                    </span>
                </div>
            </div>
        )
        if (this.state.description)
            info.push(
                <div key={2} id='InfoUser_aboutDescription' className='InfoUser_box InfoUser_aboutText' style={this.state.borderEdit}>
                    {this.state.description}
                </div> 
            )
        if (this.state.location) {
            if (this.state.description)
                info.push(
                    <div key={3} className='InfoUser_line'/>
                )
            info.push(
                <div key={4} className='InfoUser_box'>
                    <div className='InfoUser_aboutText' style={this.state.borderEdit}>
                        {this.state.location}
                    </div>
                    <div id='InfoUser_aboutLocation' className='InfoUser_aboutImg'/>
                </div>
            )
        }
        if (this.state.sex === 0 || this.state.sex === 1 || this.state.sex === 2) {
            info.push(
                <div key={11} className='InfoUser_line'/>
            )
            info.push(
                <div key={12} className='InfoUser_box'>
                    <div className='InfoUser_aboutText' style={this.state.borderEdit}>
                        {(this.state.sex === 0) ? 'Men' : (this.state.sex !== 1) ? 'Women' : 'Other'}
                    </div>
                    <div id='InfoUser_aboutSex' className='InfoUser_aboutImg'/>
                </div>
            )
        }
        if (this.state.work) {
            info.push(
                <div key={5} className='InfoUser_line'/>
            )
            info.push(
                <div key={6} className='InfoUser_box'>
                    <div className='InfoUser_aboutText' style={this.state.borderEdit}>
                        {this.state.work}
                    </div>
                    <div id='InfoUser_aboutWork' className='InfoUser_aboutImg'/>
                </div>
            )
        }
        if (this.state.tags[0]) {
            info.push(
                <div key={7} className='InfoUser_line'/>
            )
            info.push(
                <div key={8} className='InfoUser_box'>
                    <ul className='InfoUser_aboutText' style={this.state.borderEdit}>
                        {tags_li}
                    </ul>
                    <div id='InfoUser_aboutHashtags' className='InfoUser_aboutImg'/>
                </div>
            )
        }
        if (this.state.language) {
            info.push(
                <div key={9} className='InfoUser_line'/>
            )
            info.push(
                <div key={10} className='InfoUser_box'>
                    <div className='InfoUser_aboutText' style={this.state.borderEdit}>
                        {this.state.language}
                    </div>
                    <div id='InfoUser_aboutLanguage' className='InfoUser_aboutImg'/>
                </div>
            )
        }
        info.push(
            <div key={13} className='InfoUser_line'/>
        )
        info.push(
            <div key={14} className='InfoUser_box'>
                <div className='InfoUser_aboutText' style={this.state.borderEdit}>
                    {this.state.popularity}
                </div>
                <div id='InfoUser_aboutPopularity' className='InfoUser_aboutImg'/>
            </div>
        )

        return (
            <div id='InfoUser_block'>
                {info}
            </div>
        )
    }
}
export default InfoMatch;