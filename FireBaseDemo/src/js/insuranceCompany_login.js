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

//建立 Firebase 中的 database 功能
var db = firebase.database();

// Reference: https://stackoverflow.com/questions/10730362/get-cookie-by-name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

//刪除cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1); //強制讓 cookie 過期
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

var companyNumber = document.getElementById('CompanyNumber');
var password = document.getElementById('Password');
var loginBtn = document.getElementById('loginBtn');
var companyName = document.getElementById('CompanyName');
var InfoNeedNow = document.querySelector('.InfoNeedNow');

if (getCookie("uid") != null) { //強制登出已登入的一般使用者以免影響保險公司登入
    delCookie("uid");
}

if (getCookie("CompanyName") != null) { //每次回到登入頁面都先清除登入資料
    delCookie("CompanyName");
    document.cookie = 'LoginStatus=No';
}

//處理登入事件
loginBtn.addEventListener('click', function (e) {

    e.preventDefault();

    if (companyName.value == "default") {
        alert("請選擇保險公司名稱!");
    }
    if (companyName.value != "default") {
        db.ref("/InsuranceCompany/" + String(companyName.value)).once('value', function (snapshot) {
            //var size = Object.keys(data).length; 資料庫 key 的長度取得
            var data = snapshot.val(); //讀出資料庫的使用者資料
            console.log(data);
            if (data.CompanyId != companyNumber.value) {
                alert("公司編號輸入有誤，請重新輸入!");
            }
            if (data.CompanyId == companyNumber.value) {
                if (data.Password != password.value) {
                    alert("公司預設密碼輸入有誤，請重新輸入!");
                }
                if (data.Password == password.value) {
                    alert("登入成功，即將跳轉到保險公司頁面");
                    document.cookie = 'CompanyName=' + String(companyName.value);
                    document.cookie = 'LoginStatus=Yes';
                    window.location = 'InsuranceCompany.html';
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