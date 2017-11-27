// NewsContentAdmin component

import React, { Component } from 'react';
import Modal from 'react-modal';
import AlertContainer from 'react-alert';

import database from '../../action/database';
import NewsItem from '../news_item/news_item.jsx';

class NewsContentAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            notes: '',
            dataDate: null,
            image: 'sample1.jpg',
            modalIsOpen: false
        }

        this.data = {
            items: []
        }
    }

    componentDidMount() {
        this._getData();
    }
    
    alertOptions = {
        offset: 14,
        position: 'top right',
        theme: 'dark',
        time: 5000,
        transition: 'scale'
    }

    render() {
        const url = require(`../../images/${this.state.image}`);

        return (
            <div className="content">
                <h1> Admin Page </h1>
                <form className="form" onSubmit={this._handleSubmit.bind(this)}>
                    <button className="button choose" onClick={this.openModal.bind(this)}>Choose an image</button>
                    <img src={url} className="selected" />
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal.bind(this)}
                        contentLabel="Choose Image"
                        >
                        <h2>Pick an Image</h2>
                        <button className="button close" onClick={this.closeModal.bind(this)}>close</button>
                        <div className="images">
                            {this._renderImages()}
                        </div>
                    </Modal>
                    <label className="label">Enter Your Title</label>
                    <input type="text" name="title" value={this.state.title} onChange={this._handleChange.bind(this, 'title')} />
                    <span className="bar"></span>
                    <label className="label">Enter Your description</label>
                    <input type="text" name="description" value={this.state.description} onChange={this._handleChange.bind(this, 'description')} />
                    <span className="bar"></span>
                    <label className="label">Enter Your Brief Description</label>
                    <textarea type="text" name="notes" value={this.state.description} onChange={this._handleChange.bind(this, 'notes')} />
                    
                    <button className="button submit" onClick={this._handleSubmit.bind(this)}>Submit</button>
                </form>
                <h1> News available in User page </h1>
                <div className="user-content">
                    {this._renderItems()}
                </div>
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            </div>
        );
    }


    _renderImages() {
        const imageList = ['sample1.jpg', 'sample2.jpg', 'sample4.jpg', 'sample5.jpg', 'sample10.jpg', 'sample11.jpg', 'sample33.jpg'];

        return imageList.map((image, idx) => {
            const url = require(`../../images/${image}`);
            return (
                <img key={idx} src={url} onClick={this._selectImage.bind(this, image)} />
            );
        })
    }

    _renderItems() {
        let newItems = this.data.items;
       
        return newItems.map((item, idx) => {
            if (item) {
                return (
                    <div className="wrap">
                        <button className="button remove" onClick={this.removeItem.bind(this, item.id)}>Remove Item</button>
                        <NewsItem key={item.id} imageUrl={item.image} title={item.title} description={item.description} />
                    </div>
                );
            }
        });
    }

    _selectImage(image, ev) {
        this.setState({modalIsOpen: false, image: image});
    }

    _handleChange(name, ev) {
        this.setState({ [name] : ev.target.value });
    }

    _handleSubmit(ev) {
        ev.preventDefault();

        const itemRef = database.ref('/items');
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

        const itemRef = database.ref(`/items/${itemId}`);
        itemRef.remove();
        this._getData();
    }

    onPick(image) {
        this.setState({image});
    }

    showAlert = () => {
        const imageError = require("../../images/err.png");
        this.msg.show('title and description empty', {
          time: 122000,
          type: 'error',
          icon: <img src={imageError} />
        })
      }

    _getData() {
        console.log("in");
        let newItems = [];
        database.ref('/items').on('value', snap => {
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