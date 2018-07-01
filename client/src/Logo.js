import React from 'react';
import './Logo.css';


class Logo extends React.Component {
  render() {
    return (
      <a href='/' id='Logo' className={this.props.className}>
        <div id='Logo_img'>
        </div>
        <div id='Logo_text'>
          tinder
        </div>
      </a>
    );
  }
}
export default Logo;
