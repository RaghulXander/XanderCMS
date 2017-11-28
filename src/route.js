import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import NewsContentAdmin from '../src/components/news_content_admin/news_content_admin.jsx';
import NewsContent from '../src/components/news_content/news_content.jsx';
import NewsPage from '../src/components/news_page/news_page.jsx';

export default (
<Route path="/" component={App}>
    <IndexRoute component={NewsContent} />
    <Route path="/admin" component={NewsContentAdmin}/>
    <Route path="/user" component={NewsContent} />
    <Route path="user/:id" component={NewsPage} />
</Route>
);