import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCC4MUkeUUN_nS-psGhACwwhfgePpy8jao",
    authDomain: "mothra-416f7.firebaseapp.com",
    databaseURL: "https://mothra-416f7.firebaseio.com",
    projectId: "mothra-416f7",
    storageBucket: "mothra-416f7.appspot.com",
    messagingSenderId: "1058214799668"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref();
export const db = firebase.database();
export const storage = firebase.storage();
export const auth = firebase.auth();
