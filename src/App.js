import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PageInvite from './pages/invite/invite.jsx';
import InviteContainer from './pages/invite/invite_container.jsx';
import store from './store/store';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <InviteContainer />
      </Provider>
    );
  }
}

export default App;
