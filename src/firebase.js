import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCZi9PAFU20jTzja_1tQBQAsHP9_rDA1GU",
  authDomain: "todoist-3465e.firebaseapp.com",
  databaseURL: "https://todoist-3465e.firebaseio.com",
  projectId: "todoist-3465e",
  storageBucket: "todoist-3465e.appspot.com",
  messagingSenderId: "580003267328",
  appId: "1:580003267328:web:ce50a164cd16f6c39729e5",
  measurementId: "G-HQKF70S43R"
}
// Initialize Firebase
const fbApp = firebase.initializeApp(firebaseConfig)

export { fbApp as firebase }
