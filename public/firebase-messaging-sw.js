// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyBerMU3ylpzHlEB13p3q79NHuXZZgRL1dw",
  authDomain: "promptsavvy-8c8d5.firebaseapp.com",
  projectId: "promptsavvy-8c8d5",
  storageBucket: "promptsavvy-8c8d5.appspot.com",
  messagingSenderId: "343062598125",
  appId: "1:343062598125:web:4f725cb474f1933d1c17e4",
  measurementId: "G-DFNVK9SRV5"
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  //console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './logo.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});