import * as firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyAjh7HvcwGJGD8BwGXH2Aq4npYe5FXmIk0",
  authDomain: "table-780c7.firebaseapp.com",
  databaseURL: "https://table-780c7.firebaseio.com",
  projectId: "table-780c7",
  storageBucket: "table-780c7.appspot.com",
  messagingSenderId: "115048687432",
  appId: "1:115048687432:web:e33451954955e6cf69f57d",
  measurementId: "G-4JEXBH44G9",
};

const fire=firebase.initializeApp(firebaseConfig)

export default fire;
