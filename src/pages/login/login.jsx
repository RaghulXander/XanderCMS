
import React from 'react';

// Main app
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isVisible: true
      }
      // Bindings
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemount = this.handleRemount.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isVisible: false
    }, function() {
      console.log(this.state.isVisible)
    });
    return false;
  }
  handleRemount(e) {
    this.setState({
      isVisible: true
    }, function() {
      console.log(this.state.isVisible)
    });
    e.preventDefault();
  }
  render() {

    // const for React CSS transition declaration
    let component = this.state.isVisible ? <Modal onSubmit={ this.handleSubmit } key='modal'/> : <ModalBack onClick={ this.handleRemount } key='bringitback'/>;

    return component;
  }
}

// Modal
class Modal extends React.Component {
  render() {
    return <div className='Modal'>
              <Logo />
              <form onSubmit= { this.props.onSubmit }>
                <Input type='text' name='username' placeholder='username' />
                <Input type='password' name='password' placeholder='password' />
                <button> Sign In</button>
              </form>
              <div className='social-signin'>
                <button className="fb" onClick={ this.props.onClick }><i className="fa fa-facebook" aria-hidden="true"></i></button>
                <button className="tw" onClick={ this.props.onClick }><i className="fa fa-twitter" aria-hidden="true"></i></button>
              </div>
                <a href='#'>Lost your password ?</a>
           </div>
  }
}

// Generic input field
class Input extends React.Component {
  render() {
    return <div className='Input'>
              <input type={ this.props.type } name={ this.props.name } placeholder={ this.props.placeholder } required autocomplete='false'/>
              <label for={ this.props.name } ></label>
           </div>
  }

}

// Fake logo
class Logo extends React.Component {
  render() {
    return <div className="logo">
                <img src="./../logo.png" />
                <span>Log In</span>
              </div>
  }
}

// Button to brind the modal back
class ModalBack extends React.Component {
  render() {
    return <button className="bringitback" onClick={ this.props.onClick } key={ this.props.className }>Brind the modal back !</button>
  }
}

export default Login;