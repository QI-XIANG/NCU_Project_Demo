// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDtTxfCIJIfPTEw44Ah5I1lpjiDO96FlJM",
    authDomain: "mydatabase-8f225.firebaseapp.com",
    databaseURL: "https://mydatabase-8f225-default-rtdb.firebaseio.com",
    projectId: "mydatabase-8f225",
    storageBucket: "mydatabase-8f225.appspot.com",
    messagingSenderId: "68532714578",
    appId: "1:68532714578:web:fc038b336827906b65338b",
    measurementId: "G-68RXLWEXS7"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference: https://stackoverflow.com/questions/10730362/get-cookie-by-name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

var email = document.getElementById('Email');
var password = document.getElementById('Password');
var loginBtn = document.getElementById('loginBtn');

if (getCookie("uid") != null) {
    alert("您已經登入，即將跳轉回個人頁面!");
    window.location = "user_profile.html";
}

loginBtn.addEventListener('click', function (e) {
    //console.log(email)
    initializeApp(firebaseConfig);
    e.preventDefault();

    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(() => {
            console.log('登入成功')
            alert('登入成功，跳轉回個人頁面!');
            console.log(document.cookie);
            //window.location = "user_profile.html";
            document.cookie = 'uid=' + firebase.auth().currentUser.uid;
            window.location = "user_profile.html";
            //console.log(firebase.auth().currentUser.uid);
        })
        .catch((error) => {
            console.log(error.message);
            alert(error.message);
        });
});