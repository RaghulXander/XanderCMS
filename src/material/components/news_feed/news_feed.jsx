import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import PropTypes from 'prop-types';
import firebase from '../../action/database';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

class NewsFeed extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            image: '',
            expanded: false
        }

        this.data = {
            title: props.title,
            imageUrl: props.imageUrl,
            description: props.description,
        }

        this.getImage(this.data.imageUrl);
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
        

        return (
            <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                <CardHeader
                    title={title}
                    avatar={this.state.image}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardMedia
                    overlay={<CardTitle title={title} />}
                    expandable={true}
                >
                    <img src={this.state.image} alt="image Loading" />
                </CardMedia>
                <CardText expandable={true}>
                    {description}
                </CardText>
                <CardActions>
                    <FlatButton label="Expand" onClick={this.handleExpand} />
                    <FlatButton label="Reduce" onClick={this.handleReduce} />
                </CardActions>
            </Card>
        );
    }

    getImage(image) {
        firebase.storage().ref('images').child(image).getDownloadURL().then((url) => {
          console.log(url);
            this.setState({ image: url})
        })
    }

    
    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
    };

    handleToggle = (event, toggle) => {
        this.setState({expanded: toggle});
    };

    handleExpand = () => {
        this.setState({expanded: true});
    };

    handleReduce = () => {
        this.setState({expanded: false});
    };
}

export default NewsFeed;