import {
  initializeApp
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js'

import {
  getDatabase,
  ref,
  set
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js'

const firebaseConfig = {
  apiKey: "AIzaSyAiWhsurmpe0XHv5fT6woKqY6hURnd4Kno",
  authDomain: "fypj-f74df.firebaseapp.com",
  databaseURL: "https://fypj-f74df-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fypj-f74df",
  storageBucket: "fypj-f74df.appspot.com",
  messagingSenderId: "934697055143",
  appId: "1:934697055143:web:b193780aae92b9e111bc82",
  measurementId: "G-9K8TFP4H0D"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

var button = document.getElementById('register');

function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase(app);
  const users = ref(db, 'users/' + userId);
  set(users, {
      username: name,
      email: email,
      profile_picture: imageUrl
    })
    .then(() => {
      // Data saved successfully!
      alert("SAVED");
      window.location.href = './profile.html';
    })
    .catch((error) => {
      // The write failed...
      alert(error);
    });
}


async function register() {
  var email = document.getElementById('Email');
  var password = document.getElementById('Password');
  var fullname = document.getElementById('Name');
  const promise = createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      updateProfile(user, {
        displayName: fullname.value
      });
      alert(user.uid);
      writeUserData(user.uid, fullname.value, email.value, user.photoURL);
      alert('Registered');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });




};
button.onclick = register;