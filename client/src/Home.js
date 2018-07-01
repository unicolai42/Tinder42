import React from 'react'
import './Home.css'
import Nav from './Nav'


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'Home'
    }
  }

  render() {
    return (
        <div>
            <Nav/>
            <div id='Home_wrapper'>
                <div id='Home_block'>
                    {this.state.test}
                </div>
            </div>
        </div>
    );
  }
}
export default Home;
