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

//建立 Firebase 中的 database 功能
var db = firebase.database();

var companyNumber = document.getElementById('CompanyNumber');
var password = document.getElementById('Password');
var loginBtn = document.getElementById('loginBtn');
var companyName = document.getElementById('CompanyName');
var InfoNeedNow = document.querySelector('.InfoNeedNow');

if (getCookie("uid") != null) { //強制登出已登入的一般使用者以免影響登入
    delCookie("uid");
    document.cookie = 'LoginStatus=No';
}

if (getCookie("identityNumber") != null) { //每次回到登入頁面都先清除登入資料
    delCookie("identityNumber");
    document.cookie = 'LoginStatus=No';
}

if (getCookie("CompanyName") != null) { //已登入的保險公司無法二次登入
    alert("您已經登入，即將跳轉回保險公司頁面!");
    document.cookie = 'LoginStatus=Yes';
    window.location = "insuranceCompany.html";
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