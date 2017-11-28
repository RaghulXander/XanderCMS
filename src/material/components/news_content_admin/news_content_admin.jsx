import React from 'react';
import AlertContainer from 'react-alert';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';

import firebase from '../../../action/database';
import NewsGrid from '../news_grid/news_grid.jsx';
import FileUploader from 'react-firebase-file-uploader';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

class NewsContentAdmin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            notes: '',
            dataDate: null,
            image: '',
            modalIsOpen: false,
            isUploading: false,
            progress: 0,
            avatarURL: ''
        }

        this.data = {
            items: []
        }
    }

    componentDidMount() {
        this._getData();
        this.timer = setTimeout(() => this.progress(5), 1000);
    }
    
    componentWillUnmount() {
        clearTimeout(this.timer);
    }
    
    progress(completed) {
        if (completed > 100) {
            this.setState({completed: 100});
        } else {
            this.setState({completed});
            const diff = Math.random() * 10;
            this.timer = setTimeout(() => this.progress(completed + diff), 1000);
        }
    }
    
    alertOptions = {
        offset: 14,
        position: 'top right',
        theme: 'dark',
        time: 5000,
        transition: 'scale'
    }

    render() {
        const styles = {
            errorStyle: {
              color: orange500,
            },
            underlineStyle: {
              borderColor: orange500,
            },
            floatingLabelStyle: {
              color: orange500,
            },
            floatingLabelFocusStyle: {
              color: blue500,
            },
          };

          const buttonStyle ={
            margin: 12,
          }

        return (
            <div className="content">
                <h1> Admin Page </h1>
                <form className="form" onSubmit={this._handleSubmit.bind(this)}>
                    <label>Upload your image:</label>
                    {this.state.isUploading &&
                       <LinearProgress mode="determinate" value={this.state.progress} />
                    }
                    {this.state.avatarURL &&
                        <img className ="selected" src={this.state.avatarURL} />
                    }
                    <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, pointer: 'cursor', maxWidth: '480px'}}>
                        Select your Image
                        <FileUploader
                            accept="image/*"
                            name="avatar"
                            randomizeFilename
                            filename={file => this.state.title}
                            storageRef={firebase.storage().ref('images')}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                        />
                    </label>
                    
                    <label className="label">Enter Your Title</label>
                    <TextField type="text" name="title" value={this.state.title}
                        onChange={this._handleChange.bind(this, 'title')}
                        errorText="This field is required."
                        errorStyle={styles.errorStyle}
                        underlineStyle={styles.underlineStyle}/>
                    <label className="label">Enter Your description</label>
                    <TextField type="text" name="description" value={this.state.description}
                        onChange={this._handleChange.bind(this, 'description')}
                        errorText="This field is required."
                        errorStyle={styles.errorStyle}
                        underlineStyle={styles.underlineStyle}/>
                    <label className="label">Enter Your Brief Description</label>
                    <TextField type="text" name="notes" value={this.state.notes}
                        onChange={this._handleChange.bind(this, 'notes')}
                        errorText="This field is required."
                        errorStyle={styles.errorStyle}
                        underlineStyle={styles.underlineStyle}/>
                    
                    <RaisedButton label="Submit" secondary={true} style={buttonStyle}
                        className="button submit" onClick={this._handleSubmit.bind(this)} />
                </form>
                <h1> News available in User page </h1>
                <div className="user-content">
                    < NewsGrid newsData={this.data.items} />
                </div>
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            </div>
        );
    }

    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => this.setState({progress});
    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    }

    handleUploadSuccess = (filename) => {
        this.setState({image: filename, progress: 100, isUploading: false});
        firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({avatarURL: url}));
    };

    _selectImage(image, ev) {
        this.setState({modalIsOpen: false, image: image});
    }

    _handleChange(name, ev) {
        this.setState({ [name] : ev.target.value });
    }

    _handleSubmit(ev) {
        ev.preventDefault();

        const itemRef = firebase.database().ref('/items');
        const item = {
            title: this.state.title,
            description: this.state.description,
            notes: this.state.notes,
            image: this.state.image
        };

        if (this.state.title !== '' && this.state.description !== '') {
            itemRef.push(item);
            this._getData();
            this.setState({
                title: '',
                description: '',
                notes: '',
            });
        } else {
            console.log("innnn");
            this._getData();
            return this.showAlert();
        }
    }

    afterOpenModal() {

    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    removeItem(itemId, ev) {
        ev.preventDefault();

        const itemRef = firebase.database().ref(`/items/${itemId}`);
        itemRef.remove();
        this._getData();
    }

    onPick(image) {
        this.setState({image});
    }

    showAlert = () => {
        const imageError = require("../../../images/err.png");
        this.msg.show('title and description empty', {
          time: 122000,
          type: 'error',
          icon: <img src={imageError} />
        })
      }

    _getData() {
        let newItems = [];
        firebase.database().ref('/items').on('value', snap => {
            let items = snap.val();
            for (let item in items) {
                newItems.push({
                    id: item,
                    title: items[item].title,
                    description: items[item].description,
                    image: items[item].image
                });
            }
        });
        this.data.items = newItems;
        this.setState({ dataDate: new Date() });
    }
}

export default NewsContentAdmin;