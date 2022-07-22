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
//取得cookie
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

/*//若尚未登入則強行轉進登入頁面
if(getCookie("CompanyName") == null){
    alert("請先登入再前往本頁面!");
    window.location = "insuranceCompany_login.html";
}

//登出按鈕的事件處理
var logout_btn = document.querySelector(".logout_btn");
logout_btn.addEventListener("click", e => {
    delCookie("CompanyName");
	document.cookie = 'LoginStatus=No';
    window.location = "insuranceCompany_login.html";
});*/

var data;
var users_id = [];
var count = 1;
var customer_row;
var customer_table_tbody = document.querySelector("tbody.customer-table-tbody");
var customer_detail;

//生成用戶 row 
function generateCustomerRow(element,count,user_id){
    customer_row = `<tr>
                        <td class="customer_number">`+ Number(count) + `</td>
                        <td class="customer_name">`+ element.realName + `</td>
                        <td class="customer_gender">`+ element.gender + `</td>
                        <td class="customer_birth">`+ element.birthDate + `</td>
                        <td class="customer_detail"><a href="#" id="user_info_`+ user_id + `" class="user_info">點擊查看</a></td>
                    </tr>`;
    customer_table_tbody.innerHTML += customer_row;
    if(count = users_id.length){
        console.log(1212);
        customer_detail = document.querySelectorAll(".user_info");
        customer_detail.forEach(element => {
            element.addEventListener("click",e => {
                console.log(String(e.target.id).substring(10));
                if (getCookie("uid") != null) {
                    delCookie("uid");
                }
                document.cookie = 'uid=' + String(e.target.id).substring(10);
                window.location = "insuranceCompany_UserProfile.html";
            })
        });
        $(".loader-wrapper").fadeOut("slow");
    }
}

//存取政府限制用戶資料
db.ref("/Government/restrictedUsers").once('value', function (snapshot) {
    data = snapshot.val(); //讀出資料庫
    console.log(data);
    data.forEach(element => {
        users_id.push(element);
    });

    users_id.forEach(element => {
        db.ref("/Users/"+String(element)).once('value', function (snapshot) {
            //var size = Object.keys(data).length; 資料庫 key 的長度取得
            data = snapshot.val(); //讀出資料庫的使用者資料
            console.log(data);
            generateCustomerRow(data,count,element);
            count += 1;
        });
       
    }); 
});

