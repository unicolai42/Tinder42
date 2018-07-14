import React from 'react'
import './InfoUser.css'

class InfoUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: 'Ugo',
          age: '24',
          test: 'Fucking yes !!!'
        }
    }
    render() {
        return (
            <div>
                <div className='InfoUser_box'>
                    <div id='InfoUser_NameAgeText'>{this.state.name}{(this.state.age) ? `, ${this.state.age}` : null}</div>
                    <div id='InfoUser_NameAgeEdit'><span id='InfoUser_NameAgeEditText'>Edit</span><span className='InfoUser_aboutImg' id='InfoUser_NameAgeEditImg'></span></div>
                </div>
                <div id='InfoUser_aboutDescription' className='InfoUser_box'>
                    Hello
                </div>
                <div className='InfoUser_line'></div>
                <div className='InfoUser_box'>
                    <div className='InfoUser_aboutText'>Paris</div>
                    <div id='InfoUser_aboutLocation' className='InfoUser_aboutImg'></div>
                </div>
                <div className='InfoUser_line'></div>
                <div className='InfoUser_box'>
                    <div className='InfoUser_aboutText'>42</div>
                    <div id='InfoUser_aboutWork' className='InfoUser_aboutImg'></div>
                </div>
                <div className='InfoUser_line'></div>
                <div className='InfoUser_box'>
                    <div className='InfoUser_aboutText'>#Hacker<br/>#Self-taught<br/>#Growth</div>
                    <div id='InfoUser_aboutInterest' className='InfoUser_aboutImg'></div>
                </div>
                <div className='InfoUser_line'></div>
                <div className='InfoUser_box'>
                    <div className='InfoUser_aboutText'>French</div>
                    <div id='InfoUser_aboutLanguage' className='InfoUser_aboutImg'></div>
                </div>
            </div>
        );
    }
}
export default InfoUser;