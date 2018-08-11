import React from 'react'
import './Settings.css'
import Cookies from 'js-cookie'
import axios from 'axios'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'
import ReactTags from 'react-tag-autocomplete'




class Settings extends React.Component {
  constructor(props) {
    super(props)  
    
    this.state = {
      ageMin: 16,
      ageMax: 38,
      maxDistance: 1,
      sex: 2,
      tags: [],
      sugggestions: []
    }
    this.changeValuesAge = this.changeValuesAge.bind(this)
    this.changeValuesMaxDistance = this.changeValuesMaxDistance.bind(this)
    this.changeValuesSex = this.changeValuesSex.bind(this)
    this.setValuesDb = this.setValuesDb.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAddition = this.handleAddition.bind(this)
  }

  componentDidMount() {
    axios.post('http://localhost:3001/load_preferences', {
        "userId": Cookies.get('id')
    })
    .then(response => {
        this.setState({
            ageMin: response.data.age_min,
            ageMax: response.data.age_max,
            maxDistance: response.data.max_distance,
            sex: response.data.sex,
            tags: response.data.hashtags,
            suggestions: response.data.suggestions
        })
        console.log(response.data)
    })
  }

  changeValuesAge(values) {
    this.setState({
      ageMin: values[0],
      ageMax: values[1]
    })
  }

  changeValuesMaxDistance(value) {
    this.setState({
      maxDistance: value
    })
  }

  changeValuesSex(value) {
    this.setState({sex: value})
  }

  setValuesDb() {
    axios.post('http://localhost:3001/set_preferences', {
      "userId": Cookies.get('id'),
      "ageMin": this.state.ageMin,
      "ageMax" : this.state.ageMax,
      "maxDistance": this.state.maxDistance,
      "sex": this.state.sex
    })
  }

  handleDelete(i) {
    axios.post('http://localhost:3001/remove_hashtag_settings', {
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
    axios.post('http://localhost:3001/add_hashtag_settings', {
      "userId": Cookies.get('id'),
      "hashtagName": tag.name
    })
  }

  render() {
    console.log(this.state.tags)
    return (
      <div id='Settings_wrapper'>
        <div id='Settings_block'>
          <div id='Settings_age'>
            <div className='Settings_description'>
              <div id='Settings_ageText'>Age Range</div>
              <div id='Settings_ageNumber'>{this.state.ageMin} - {this.state.ageMax} ans</div>
            </div>
            <Range min={16} max={38} value={[this.state.ageMin, this.state.ageMax]} onChange={this.changeValuesAge} onAfterChange={this.setValuesDb} />
          </div>
          <div id='Settings_maxDistance'>
            <div className='Settings_description'>
              <div id='Settings_maxDistanceText'>Maximum Distance</div>
              <div id='Settings_maxDistanceNumber'>{this.state.maxDistance}km</div>
            </div>
            <Slider min={1} max={50} value={this.state.maxDistance} onChange={this.changeValuesMaxDistance} onAfterChange={this.setValuesDb} />
          </div>
          <div id='Settings_sex'>
            <div className='Settings_description'>
              <div className='Settings_sexText'>Men</div>
              <div className='Settings_sexText'>Both</div>
              <div className='Settings_sexText'>Women</div>
            </div>
            <Slider style={{width: '90%', margin: 'auto'}} min={1} max={3} value={this.state.sex} onChange={this.changeValuesSex} onAfterChange={this.setValuesDb} />
          </div>
          <div>
            <ReactTags delimiterChars={[',', ' ']} allowBackspace={false} placeholder='Add new # or click to delete it' tags={this.state.tags} suggestions={this.state.suggestions} handleDelete={this.handleDelete} handleAddition={this.handleAddition} />
          </div>
        </div>
      </div>
    );
  }
}
export default Settings
