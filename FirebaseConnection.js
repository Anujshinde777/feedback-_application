// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  
import { getStorage } from "firebase/storage";
 
 
const firebaseConfig = {
  apiKey: "AIzaSyCNAvnNRAznBOaM7psckZYC_Y0cBJ1Be5w",
  authDomain: "feedbacksite-d1892.firebaseapp.com",
  projectId: "feedbacksite-d1892",
  storageBucket: "feedbacksite-d1892.appspot.com",
  messagingSenderId: "887126649413",
  appId: "1:887126649413:web:b7333b78e53e6dd2b7912c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Textdata = getFirestore(app);
const Imagedata = getStorage(app);
export {Textdata,Imagedata};
