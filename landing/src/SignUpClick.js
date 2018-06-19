import React, { Component } from 'react';

class SignUpCLick extends React.Component {

    render() {
      return (
        <div className={this.props.className} onClick={this.props.changeSign}>
            Sign Up
        </div>
      );
    }
  }
  export default SignUpCLick;