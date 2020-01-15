import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
}
// Initialize Firebase
const fbApp = firebase.initializeApp(firebaseConfig)

export { fbApp as firebase }
