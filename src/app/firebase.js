// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getMessaging, getToken, onMessage} from 'firebase/messaging'
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBerMU3ylpzHlEB13p3q79NHuXZZgRL1dw",
  authDomain: "promptsavvy-8c8d5.firebaseapp.com",
  projectId: "promptsavvy-8c8d5",
  storageBucket: "promptsavvy-8c8d5.appspot.com",
  messagingSenderId: "343062598125",
  appId: "1:343062598125:web:4f725cb474f1933d1c17e4",
  measurementId: "G-DFNVK9SRV5"
};
//BOsH4oy78nn61pJpJh09IzQdFngoovMxqh9rLc1lCn_oYPRVwQ8UsSR3Qkgh4EoUs3Oganf5F-kZL-u7cbAreV8
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const appleProvider = new OAuthProvider("apple.com")


const initMessaging = () => {
    const messaging = getMessaging(app);
    return messaging
}


 const requestPermission = () => {
    
    const messaging = getMessaging(app)
    const analytics = getAnalytics(app);

// onMessage(messaging, (payload) => {
//     //console.log('Message received. ', payload);
//     // ...
//   });


    //console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        //console.log('Notification permission granted.');
        getToken(messaging, { vapidKey: 'BOsH4oy78nn61pJpJh09IzQdFngoovMxqh9rLc1lCn_oYPRVwQ8UsSR3Qkgh4EoUs3Oganf5F-kZL-u7cbAreV8' }).then((currentToken) => {
            if (currentToken) {
              // Send the token to your server and update the UI if necessary
              // ...
              //console.log("My notification token is ", currentToken)
            } else {
              // Show permission request UI
              //console.log('No registration token available. Request permission to generate one.');
              // ...
            }
          }).catch((err) => {
            //console.log('An error occurred while retrieving token. ', err);
            // ...
          });
        

      }
      else{
        //console.log("Permission not granted")
      }
    })
    .catch((err)=>{
        //console.log("Some error occurred", err)
    })
} 

export  {requestPermission, app, initMessaging, auth, googleProvider, appleProvider}