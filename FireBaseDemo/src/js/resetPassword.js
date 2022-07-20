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