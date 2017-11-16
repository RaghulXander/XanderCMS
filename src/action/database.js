import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCjKz-A108Y2RyCDqpkndIPpxI4NduJmIY",
    authDomain: "xandercms.firebaseapp.com",
    databaseURL: "https://xandercms.firebaseio.com",
    projectId: "xandercms",
    storageBucket: "xandercms.appspot.com",
    messagingSenderId: "827816032573"
  };

firebase.initializeApp(config);
const database = firebase.database();

export default database;