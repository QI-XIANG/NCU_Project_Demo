// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC13uDK9UfZdEhmZo9Go6YtQ9sGO4Ru1uI",
    authDomain: "mydatabase-757e9.firebaseapp.com",
    databaseURL: "https://mydatabase-757e9-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mydatabase-757e9",
    storageBucket: "mydatabase-757e9.appspot.com",
    messagingSenderId: "564843461513",
    appId: "1:564843461513:web:eec03975926e31c4a4ff58",
    measurementId: "G-ENN2N176ET"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var email = document.getElementById("Email");
var ResetBtn = document.getElementById("ResetBtn");

ResetBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const auth = firebase.auth();
    auth.sendPasswordResetEmail(email.value).then(function () {
            window.alert("已發送郵件到信箱，請按照郵件說明重設密碼!");
            window.location.reload(); // 送信後，強制頁面重整一次
            window.location = "userLogin.html";
        }).catch(function (error) {
            console.log(error.message);
            alert(error.message);
        });
});