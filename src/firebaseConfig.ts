import { getApps, initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyA_LKN1nUOm2BZYe8QQJ8nbWRiiah3e1A4',
  authDomain: 'eyecastdev2videoeditor.firebaseapp.com',
  projectId: 'eyecastdev2videoeditor',
  storageBucket: 'eyecastdev2videoeditor.appspot.com',
  messagingSenderId: '20519433409',
  appId: '1:20519433409:web:c38ba09f49fb31c35b5040',
};

// Initialize Firebase
const firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
