import {
    initializeApp
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js'
import {
    getAuth,
    onAuthStateChanged,
    signOut
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js'

const firebaseConfig = {
    apiKey: "AIzaSyAiWhsurmpe0XHv5fT6woKqY6hURnd4Kno",
    authDomain: "fypj-f74df.firebaseapp.com",
    databaseURL: "https://fypj-f74df-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fypj-f74df",
    storageBucket: "fypj-f74df.appspot.com",
    messagingSenderId: "934697055143",
    appId: "1:934697055143:web:b193780aae92b9e111bc82",
    measurementId: "G-9K8TFP4H0D",
    databaseURL: "https://fypj-f74df-default-rtdb.asia-southeast1.firebasedatabase.app/"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const signoutbtn = document.getElementById('signout')

var username = document.getElementById('username')

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    username.innerHTML = user.displayName
  } else {
    // User is signed out
    alert("User is not signed in.");
    window.location.href = './login.html';
  }
});

function btnsignOut(){
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.href = './login.html';
      }).catch((error) => {
        // An error happened.
        alert(error);
      });
}

signoutbtn.onclick = btnsignOut;