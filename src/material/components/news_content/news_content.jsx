// Page NewsContent Component

import React, {PropTypes} from 'react';
import NewsItem from '../news_item/news_item.jsx';
import firebase from '../../action/database';
import NewsFeed from '../../material/components/news_feed.jsx';

class NewsContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }

    componentDidMount() {
        firebase.database().ref('/items').on('value', snap => {
            let items = snap.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    title: items[item].title,
                    description: items[item].description,
                    image: items[item].image,
                });
            }
            this.setState({
                items: newState
            });
        });
    }

    render() {
        return (
            <div className='news-content'>
                <div className="text">USER PAGE </div>
                <div className="news">
                    {this._renderNewsItem()}
                </div>
            </div>
        );
    }

    _renderNewsItem() {
        if (this.state.items) {
            return this.state.items.map((item, idx) => {
                if (item) {
                    return (
                        <NewsFeed key={item.id} imageUrl={item.image} title={item.title} 
                            description={item.description} newsId={item.id} />
                    );
                }
            });
        }
    }

    _onClickItem(newsItem) {
        return (
            <NewsPage id={newsItem.id} title={newsItem.title} description={newsItem.description}
                notes={newsItem.notes} />
        )
    }
}

export default NewsContent;
