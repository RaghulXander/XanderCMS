// NewsItem Component

import React from 'react';
import PropTypes from 'prop-types';
import database from '../../action/database';

class NewsPage extends React.Component {
    constructor(props) {
        super(props);

        this.data = {
            title: '',
            imageUrl: '',
            notes: '',
            id: '',
        }

        this.state = {
            dataData: null
        }
    }

    componentWillReceiveProps(nextProps) {
        this.data.id = nextProps.newsId;
    }

    componentDidMount() {
        database.ref('/items').on('value', snap => {
            let items = snap.val();
            let newState = [];
            for (let item in items) {
                if (item === this.data.id) {
                    this.data.item.title = items[item].title,
                    this.data.item.notes = items[item].notes,
                    this.data.item.image = items[item].image
                }
            }
            this.setState({
                dataData: new Date()
            });
        });
    }

    render() {
        const { title, notes, imageUrl } = this.data;
        const url = imageUrl ? require(`../../images/${imageUrl}`) : '';

        return (
            <div className='news-page'>
                <h1 className="title">{title}</h1> 
                <div className='image'>
                    <img className="news-thumb" src={url} alt="Image" />
                </div>
                <div className='news'>
                    <div className="separator"></div>
                    <div className="description">{notes}</div>                
                </div>
            </div>
        );
    }
}

export default NewsPage;