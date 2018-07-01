import React from 'react';
import './Profil.css';
import Nav from './Nav'


class Profil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'Fucking yes !!!'
    }
  }

  render() {
    return (
      <div id='Profil_wrapper'>
        <Nav/>
        <div id='Profil_block'>
            {this.state.test}
        </div>
      </div>
    );
  }
}
export default Profil;
