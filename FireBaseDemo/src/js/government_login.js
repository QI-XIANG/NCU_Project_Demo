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

//建立 Firebase 中的 database 功能
var db = firebase.database();

var identityNumber = document.getElementById('identityNumber');
var officialPassword = document.getElementById('officialPassword');
var loginBtn = document.getElementById('loginBtn');
var InfoNeedNow = document.querySelector('.InfoNeedNow');

if (getCookie("uid") != null) { //強制登出已登入的一般使用者以免影響登入
    delCookie("uid");
    document.cookie = 'LoginStatus=No';
}

if(getCookie("CompanyName") != null){ //強制登出已登入的保險公司以免影響登入
    delCookie("CompanyName");
    document.cookie = 'LoginStatus=No';
}

if (getCookie("identityNumber") != null) { //每次回到登入頁面都先清除登入資料
    alert("您已經登入，即將跳轉回政府機關頁面!");
    document.cookie = 'LoginStatus=Yes';
    window.location = "Government.html";
}

//處理登入事件
loginBtn.addEventListener('click', function (e) {

    e.preventDefault();

    if (identityNumber.value == "") {
        alert("請輸入政府機關識別碼!");
    }
    if (identityNumber.value != "") {
        db.ref("/Government/officialPassword/" + String(identityNumber.value)).once('value', function (snapshot) {
            //var size = Object.keys(data).length; 資料庫 key 的長度取得
            var data = snapshot.val(); //讀出資料庫的使用者資料
            if(data == null){
                alert("資料輸入有誤，請再試一次!")
            }
            if(data != null){
                if(officialPassword.value == data){
                    alert("登入成功，即將跳轉到政府機關頁面。")
                    document.cookie = 'identityNumber=' + String(identityNumber.value);
                    document.cookie = 'LoginStatus=Yes';
                    window.location = 'Government.html';
                }
                if(officialPassword.value != data){
                    alert("預設密碼輸入有誤，請重新輸入!");
                }  
            }
        });
    }
});

//使用須知的彈出視窗
InfoNeedNow.addEventListener("click", e => {
    $("#InfoNeedNow").dialog({ //彈出視窗的外觀大小設定
        width: 360,
        height: 250,
        modal: true,
        show: { effect: 'fade', duration: 500 },
        hide: { effect: 'fade', duration: 500 }
    });
    $("#InfoNeedNow").show(); //實際顯示視窗
});