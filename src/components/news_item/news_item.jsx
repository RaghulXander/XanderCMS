// NewsItem Component

import React from 'react';
import PropTypes from 'prop-types';

class NewsItem extends React.Component {
    constructor(props) {
        super(props);

        this.data = {
            title: props.title,
            imageUrl: props.imageUrl,
            description: props.description,
        }
    }

    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        imageUrl: PropTypes.string,
        newsId: PropTypes.string
    };

    static defaultProps = {
        title: '',
        description: '',
        imageUrl: null,
        newsId: ''
    };

    componentWillReceiveProps(nextProps) {
        this.data.title = nextProps.title;
        this.data.description = nextProps.description;
        this.data.imageUrl = nextProps.imageUrl;
    }

    render() {
        const { title, description, imageUrl } = this.data;
        const url = imageUrl ? require(`../../images/${imageUrl}`) : '';

        return (
                <div className='news-item' onClick={this.handleClick.bind(this)}>
                    <div className='image'>
                        <img className="news-thumb" src={url} alt="Image" />
                    </div>
                    <div className='info'>
                        <div className="title">{title}</div> 
                        <div className="separator"></div>
                        <div className="description">{description}</div>                
                    </div>
                </div>
        );
    }

    handleClick = () => {
        
    };
}

export default NewsItem;