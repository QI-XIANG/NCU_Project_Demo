// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//import additional function
import { delCookie, getCookie } from "./common_function.js";

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

var email = document.getElementById('Email');
var password = document.getElementById('Password');
var loginBtn = document.getElementById('loginBtn');

if(getCookie("CompanyName") != null){ //強制登出已登入的保險公司以免影響登入
    delCookie("CompanyName");
    document.cookie = 'LoginStatus=No';
}

if (getCookie("identityNumber") != null) { //每次回到登入頁面都先清除登入資料
    delCookie("identityNumber");
    document.cookie = 'LoginStatus=No';
}

if (getCookie("uid") != null) {
    alert("您已經登入，即將跳轉回個人頁面!");
    document.cookie = 'LoginStatus=Yes';
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
            document.cookie = 'LoginStatus=Yes';
            window.location = "user_profile.html";
            //console.log(firebase.auth().currentUser.uid);
        })
        .catch((error) => {
            console.log(error.message);
            alert(error.message);
        });
});