import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import firebase from '../../../action/database';


class NewsGrid extends React.Component {

    constructor(props) {
        super(props);

        this.data = {
            newsData: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.data.newsData = nextProps.newsData;
    }

    render() {
        const styles = {
            root: {
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            },
            gridList: {
              width: 500,
              height: 450,
              overflowY: 'auto',
            },
          };

        return (
            <div style={styles.root}>
                <GridList
                cellHeight={180}
                style={styles.gridList}
                >
                {this.data.newsData.map((item) => (
                    <GridTile
                    key={item.id}
                    title={item.title}
                    subtitle={<span><b>{item.description}</b></span>}
                    actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                    >
                    <img src={this.getImage(item.image)} />
                    </GridTile>
                ))}
                </GridList>
            </div>
        );
    }

    getImage(image) {
        firebase.storage().ref('images').child(image).getDownloadURL().then((url) => {
            return url;
            this.setState({ image: url})
        })
    }
}

export default NewsGrid;