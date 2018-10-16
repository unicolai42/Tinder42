import React from 'react'
import './InfoUser.css'
import Cookies from 'js-cookie'
import axios from 'axios'
import ReactTags from 'react-tag-autocomplete'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import Geocode from "react-geocode"
import Key from "./Key"


Geocode.setApiKey(Key.googleMapKey)

class InfoUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            latitude: 0,
            longitude: 0,
            location: '',            
            age: '',
            description: '',
            work: '',
            tags: [],
            language: '',
            editButton: 'Edit',
            suggestions: [],
            sex: 1,
            popularity: 0
        }
    
        this.editInfo = this.editInfo.bind(this)
        this.changeName = this.changeName.bind(this)
        this.changeAge = this.changeAge.bind(this)
        this.changeDescription = this.changeDescription.bind(this)
        this.changeLocation = this.changeLocation.bind(this)
        this.changeWork = this.changeWork.bind(this)
        this.changeSex = this.changeSex.bind(this)
        // this.changeTags = this.changeTags.bind(this)
        this.changeLanguage = this.changeLanguage.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleAddition = this.handleAddition.bind(this)
    }

    componentDidMount() {
        axios.post('http://localhost:3001/load_info_user', {
            "userId": Cookies.get('id')
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
                name: response.data.username,
                latitude: response.data.latitude,
                longitude: response.data.longitude,
                age: response.data.age,
                description: response.data.description,
                work: response.data.work,
                tags: response.data.hashtags,
                suggestions: response.data.suggestions,
                language: response.data.language,
                sex: response.data.sex,
                popularity: response.data.popularity
            })
        })
    }

    editInfo() {
        if (this.state.editButton === 'Edit')
            this.setState({
                editButton: 'Validate'
            })
        else {
            this.setState({
                editButton: 'Edit'
            })
            Geocode.fromAddress(this.state.location).then(response => {
                const { lat, lng } = response.results[0].geometry.location;
                axios.post('http://localhost:3001/edit_info_user', {
                    "userId": Cookies.get('id'),
                    "name": this.state.name,
                    "latitude": lat,
                    "longitude": lng,
                    "age": this.state.age,
                    "description": this.state.description,
                    "work": this.state.work,
                    "language": this.state.language,
                    "sex": this.state.sex
                })
            }, error => {
                axios.post('http://localhost:3001/edit_info_user', {
                    "userId": Cookies.get('id'),
                    "name": this.state.name,
                    "latitude": this.state.latitude,
                    "longitude": this.state.longitude,
                    "age": this.state.age,
                    "description": this.state.description,
                    "work": this.state.work,
                    "language": this.state.language,
                    "sex": this.state.sex
                })
            })
        }
    }

    changeName(e) {
        if (this.state.name.length < 20)
            this.setState({name: e.target.value})
    }

    changeAge(e) {
        if (e.target.value.length < 3 && !isNaN(e.target.value))
            this.setState({age: e.target.value})
    }

    changeDescription(e) {
        if (e.target.value.length < 300)
            this.setState({description: e.target.value})
    }

    changeLocation(e) {
        if (e.target.value.length < 90)
            this.setState({location: e.target.value})
    }

    changeWork(e) {
        if (e.target.value.length < 60)
            this.setState({work: e.target.value})
    }

    // changeTags(e) {
    //     // this.setState({tags: e.target.value})
    //     console.log(e.target.value)
    // }

    changeLanguage(e) {
        if (e.target.value.length < 60)
            this.setState({language: e.target.value})
    }

    changeSex(value) {
        this.setState({sex: value})
        console.log(this.state.sex)
    }

    handleDelete(i) {
        axios.post('http://localhost:3001/remove_hashtag_profile', {
          "userId": Cookies.get('id'),
          "hashtagName": this.state.tags[i].name
        })
        const tags = this.state.tags.slice(0)
        console.log(i)
        tags.splice(i, 1)
        this.setState({tags: tags})
      }
      
      handleAddition(tag) {
        tag.name = tag.name.charAt(0).toUpperCase() + tag.name.slice(1)
        console.log(tag.name)
        const tags = [].concat(this.state.tags, tag)
        this.setState({tags: tags})
        axios.post('http://localhost:3001/add_hashtag_profile', {
          "userId": Cookies.get('id'),
          "hashtagName": tag.name
        })
      }

      
    render() {

///////////////////////////////////////////// 
        // console.log(this.state.latitude, this.state.longitude)
        // Geocode.fromLatLng(43.6578919, 7.122337).then(response => {
        //     const address = response.results[0].formatted_address
        //     console.log(address);
        // }, error => {
        //     console.error(error);
        // })
            
        //     // Get latidude & longitude from address.
        // Geocode.fromAddress("Villeneuve-loubet").then(response => {
        //     const { lat, lng } = response.results[0].geometry.location;
        //     console.log(lat, lng);
        // }, error => {
        //     console.error(error);
        // })

//////////////////////////////////////////
        let tags_li = []
        if (this.state.tags)
            this.state.tags.forEach(element => {
                tags_li.push(<li key={element.name}>{element.name}</li>)
            })

        let modify = []
        modify.push(<input key={1} className='InfoUser_input' type="text" placeholder='Name' value={(this.state.name) ? this.state.name : ''} onChange={this.changeName} />)
        modify.push(<input key={2} className='InfoUser_input' type="text" placeholder='Age' value={(this.state.age) ? this.state.age : ''} onChange={this.changeAge} />)
        modify.push(<div key={9} id='InfoUser_sex'>
                        <div className='InfoUser_sexText'>Men</div>
                        <div className='InfoUser_sexText'>Women</div>
                        {/* <Slider style={{width: '90%', margin: 'auto'}} min={0} max={2} value={this.state.sex} onChange={this.changeSex} /> */}
                    </div>)
        modify.push(<input key={3} className='InfoUser_input' type="text" placeholder='Description' value={(this.state.description) ? this.state.description : ''} onChange={this.changeDescription} />)
        modify.push(<input key={4} className='InfoUser_input' type="text" placeholder='Location' value={(this.state.location) ? this.state.location : ''} onChange={this.changeLocation} />)
        modify.push(<input key={5} className='InfoUser_input' type="text" placeholder='Work' value={(this.state.work) ? this.state.work: ''} onChange={this.changeWork} />)
        modify.push(<ReactTags delimiterChars={[',', ' ', '.', '  ']} allowBackspace={false} minQueryLength={1} placeholder='Add new # or click to delete it' key={6} allowNew={true} tags={this.state.tags} suggestions={this.state.suggestions} handleDelete={this.handleDelete} handleAddition={this.handleAddition} />)
        modify.push(<input key={7} className='InfoUser_input' type="text" placeholder='Language' value={(this.state.language) ? this.state.language : ''} onChange={this.changeLanguage} />)
        modify.push(<div key={8} id='InfoUser_submit' onClick={this.editInfo}>Submit</div>)

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
                        {/* {this.state.editButton} */}
                    </span>
                    <span className='InfoUser_aboutImg' id='InfoUser_NameAgeEditImg'/>
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

        let display = (this.state.editButton === 'Edit') ? info : <div id='InfoUser_modify'>{modify}</div>

        return (
            <div id='InfoUser_block'>
                {display}
            </div>
        )
    }
}
export default InfoUser;