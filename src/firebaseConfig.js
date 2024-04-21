// src/firebaseConfig.js

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCdibJ8sIhMAQSA2cRv6P_HFSKzqnl_WLg",
    authDomain: "la-hacks-b1862.firebaseapp.com",
    projectId: "la-hacks-b1862",
    storageBucket: "la-hacks-b1862.appspot.com",
    messagingSenderId: "1043524882734",
    appId: "1:1043524882734:web:55d9a52b53c48cadfc2abf",
    measurementId: "G-LFJENVZ8J2"
  };

  const app = initializeApp(firebaseConfig);

  export default app;