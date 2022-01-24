import {
    initializeApp
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js'
import {
    getAuth,
    onAuthStateChanged,
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
var userId = "";
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      userId = user.uid;
      alert('USER DETECRED');
    } else {
      // User is signed out
      alert("NOUSER");
    }
  });
var saveBtn = document.getElementById('save')

function saveProgress() {
    const user = auth.currentUser;
    if (user) {
        // User is signed in
        var trail = localStorage.getItem('Trail');
        if (trail == 'nyp') {
            var progress = localStorage.getItem('NYP Progress');
        } else if (trail == null) {
            alert("Invalid Trail");
        }
        const db = getDatabase();
        const user = ref(db, 'users/' + userId + '/' + trail +'progress');
        set(user, {

                trail: progress,
            }).then(() => {
                // Data saved successfully!
                alert("SAVED");
            })
            .catch((error) => {
                // The write failed...
                alert(error);
            });
    } else {
        alert("You need an account to save your progress");
        // User is signed out
        window.location.href = './Login/login.html';
    };

}
saveBtn.onclick = saveProgress;