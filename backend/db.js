const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');


const firebaseConfig = {
  apiKey: "AIzaSyCMpocGJjBkba-4XJtMzWss0RBjoRqT36Q",
  authDomain: "flavorverse-97ffc.firebaseapp.com",
  projectId: "flavorverse-97ffc",
  storageBucket: "flavorverse-97ffc.appspot.com",
  messagingSenderId: "95493929110",
  appId: "1:95493929110:web:3f80e717682209f443aab7",
  measurementId: "G-TJJR6Z6RBV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const usersCollection = collection(database, 'users');

module.exports = {database, usersCollection};
