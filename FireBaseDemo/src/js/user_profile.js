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

//用戶資料變數宣告
var user_account = document.querySelector(".user_account");
var user_birthDate = document.querySelector(".user_birthDate");
var user_gender = document.querySelector(".user_gender");
var user_idCardNumber = document.querySelector(".user_idCardNumber");
var user_realName = document.querySelector(".user_realName");
var user_motorcycle = document.querySelector(".user_motorcycle");
var user_referenceNumber = document.querySelector(".user_referenceNumber");
var user_insuranceCompanyName = document.querySelector('.user_insuranceCompanyName');

//console.log(user_account);

db.ref("/Users/"+getCookie("uid")).once('value', function (snapshot) {
    //var size = Object.keys(data).length;
    var data = snapshot.val(); 
    console.log(data);
    //var size = Object.keys(data).length;
    //console.log(size);
    user_account.innerHTML = data['account'];
    user_birthDate.innerHTML = data['birthDate'];
    user_gender.innerHTML = data['gender'];
    user_idCardNumber.innerHTML = data['idCardNumber'];
    user_realName.innerHTML = data['realName'];
    user_insuranceCompanyName.innerHTML = data['insuranceCompanyName'];
    user_referenceNumber.innerHTML = data['referenceNumber'];
});

//刪除cookie
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

//登出
var user_logout = document.querySelector(".user_logout");
user_logout.addEventListener("click", e => {
    if(getCookie("uid") != null){
        delCookie("uid");
        window.location = "index.html";
    }
});

//是否已經登入
if(getCookie("uid") == null){
    alert("您還沒有登入喔~\n即將跳轉回登入頁面!");
    window.location = "index.html";
}

//摩托車資料變數宣告
var motorcycle_brand = document.getElementById("motorcycle_brand");
var motorcycle_cc = document.getElementById("motorcycle_cc");
var motorcycle_oener = document.getElementById("motorcycle_owner");
var motorcycle_plateNumber = document.getElementById("motorcycle_plateNumber");

//處理摩托車資料
document.querySelector("#user_motorcycle").addEventListener("click",e=>{
    $("#motorcycle_detail").dialog({
      width:320,
      height:280,
      modal: true
    });
    db.ref("/Users/"+getCookie("uid")).once('value', function (snapshot){
        var data = snapshot.val(); 
        //var size = Object.keys(data).length;
        //console.log(size);
        var motorcycle = data['motorcycle'];
        console.log(motorcycle);
        motorcycle_brand.innerHTML = motorcycle["brand"];
        motorcycle_cc.innerHTML = motorcycle["cc"];
        motorcycle_owner.innerHTML = motorcycle["owner"];
        motorcycle_plateNumber.innerHTML = motorcycle["plateNumber"];
    });
    $("#motorcycle_detail").show();
});


db.ref("/Users/"+getCookie("uid")).once('value', function (snapshot) {
    //var size = Object.keys(data).length;
    var data = snapshot.val(); 
    console.log(Object.keys(data['journey']));
    //var size = Object.keys(data).length;
    //console.log(size);
    
});