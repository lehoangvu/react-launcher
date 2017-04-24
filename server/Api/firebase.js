require('es6-promise').polyfill();
var firebase = require("firebase");
var config = {
  apiKey: "AIzaSyDuca4s2Zu2jBhHjUSUOz22sdLJFfZykus",
  authDomain: "qnadb-8ec9e.firebaseapp.com",
  databaseURL: "https://qnadb-8ec9e.firebaseio.com",
  projectId: "qnadb-8ec9e",
  storageBucket: "qnadb-8ec9e.appspot.com",
  messagingSenderId: "486533720981"
};
firebase.initializeApp(config);


module.exports = firebase;