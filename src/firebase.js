import app from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/auth'
const  firebaseConfig = {
    apiKey: "AIzaSyDSvC7aws3QPKarzNUlFdLAsvDs2GCOtVc",
    authDomain: "react-auth-example-7beb9.firebaseapp.com",
    projectId: "react-auth-example-7beb9",
    storageBucket: "react-auth-example-7beb9.appspot.com",
    messagingSenderId: "514563087073",
    appId: "1:514563087073:web:cd0f247dca99db1cfb75a0"
  };
  // Initialize Firebase
app.initializeApp(firebaseConfig);

const db = app.firestore()
const auth = app.auth()

export { db, auth }
