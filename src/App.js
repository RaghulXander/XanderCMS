import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import PageInvite from './pages/invite/invite.jsx';
import InviteContainer from './pages/invite/invite_container.jsx';
import Login from './pages/login/login.jsx';
import store from './store/store';
import './App.css';
import NewsContentAdmin from '../src/components/news_content_admin/news_content_admin.jsx';
import NewsContent from '../src/components/news_content/news_content.jsx';
import NewsPage from '../src/components/news_page/news_page.jsx';

class App extends Component {
  render() {
    return (
      <Router >
        <div>
          <Switch>
            <Route path="/user" component={NewsContent} />
            <Route path="/admin" component={NewsContentAdmin} />
            <Route path="/user/:newsId" component={NewsPage} />
          </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
