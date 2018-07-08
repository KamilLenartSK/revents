  // Initialize Firebase

  import firebase from 'firebase';
  import 'firebase/firestore';

  const config = {
    apiKey: "AIzaSyDH-x1sqzdHVMWbYoULJWYBFfePHmfxLcU",
    authDomain: "revents-208711.firebaseapp.com",
    databaseURL: "https://revents-208711.firebaseio.com",
    projectId: "revents-208711",
    storageBucket: "revents-208711.appspot.com",
    messagingSenderId: "136823177688"
  };
  firebase.initializeApp(config);
  const firestore = firebase.firestore();
  const settings = {
    timestampsInSnapshots:true
  }
  firestore.settings(settings);
  export default firebase;