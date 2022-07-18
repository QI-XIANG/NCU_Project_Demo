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

//不同保險公司用戶的Array (存放用戶的所有資料於陣列中)
//台灣人壽
const TaiwanLife = [];
//國泰人壽
const CathayLife = [];
//南山人壽
const NanshanLife = [];
//中國人壽
const ChinaLife = [];
//沒有投保的公司
const NAN = [];

var users_id;
var user_id;
var count = 1;
var data;

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

db.ref("/Users").once('value', function (snapshot) {
    //var size = Object.keys(data).length; 資料庫 key 的長度取得
    data = snapshot.val(); //讀出資料庫的使用者資料
    //console.log(Object.keys(data));
    users_id = Object.keys(data);
    users_id.forEach(element => {
        //console.log(data[element].insuranceCompany.name);
        switch (String(data[element].insuranceCompany.name)) {
            case "Nan Shan Life":
                user_id = String(element);
                data[element]["user_id"] = user_id;
                NanshanLife.push(data[element]);
                break;
            case "China Life":
                user_id = String(element);
                data[element]["user_id"] = user_id;
                ChinaLife.push(data[element]);
                break;
            case "Taiwan Life":
                user_id = String(element);
                data[element]["user_id"] = user_id;
                TaiwanLife.push(data[element]);
                break;
            case "Cathay Life":
                user_id = String(element);
                data[element]["user_id"] = user_id;
                CathayLife.push(data[element]);
                break;
            default:
                user_id = String(element);
                data[element]["user_id"] = user_id;
                NAN.push(data[element]);
                break;
        };
    });

    var customer_table_tbody = document.querySelector("tbody.customer-table-tbody");
    var customer_row;

    NanshanLife.forEach(element => {
        customer_row = `<tr>
                        <td class="customer_number">`+ Number(count) + `</td>
                        <td class="customer_name">`+ element.realName + `</td>
                        <td class="customer_gender">`+ element.gender + `</td>
                        <td class="customer_birth">`+ element.birthDate + `</td>
                        <td class="customer_detail"><a href="#" id="user_info_`+ element.user_id + `" class="user_info">Click Me</a></td>
                    </tr>`;
        customer_table_tbody.innerHTML += customer_row;
        count++;
    });
    ChinaLife.forEach(element => {
        customer_row = `<tr>
                        <td class="customer_number">`+ Number(count) + `</td>
                        <td class="customer_name">`+ element.realName + `</td>
                        <td class="customer_gender">`+ element.gender + `</td>
                        <td class="customer_birth">`+ element.birthDate + `</td>
                        <td class="customer_detail"><a href="#" id="user_info_`+ element.user_id + `" class="user_info">Click Me</a></td>
                    </tr>`;
        customer_table_tbody.innerHTML += customer_row;
        count++;
    });
    TaiwanLife.forEach(element => {
        customer_row = `<tr>
                        <td class="customer_number">`+ Number(count) + `</td>
                        <td class="customer_name">`+ element.realName + `</td>
                        <td class="customer_gender">`+ element.gender + `</td>
                        <td class="customer_birth">`+ element.birthDate + `</td>
                        <td class="customer_detail"><a href="#" id="user_info_`+ element.user_id + `" class="user_info">Click Me</a></td>
                    </tr>`;
        customer_table_tbody.innerHTML += customer_row;
        count++;
    });
    CathayLife.forEach(element => {
        customer_row = `<tr>
                        <td class="customer_number">`+ Number(count) + `</td>
                        <td class="customer_name">`+ element.realName + `</td>
                        <td class="customer_gender">`+ element.gender + `</td>
                        <td class="customer_birth">`+ element.birthDate + `</td>
                        <td class="customer_detail"><a href="#" id="user_info_`+ element.user_id + `" class="user_info">Click Me</a></td>
                    </tr>`;
        customer_table_tbody.innerHTML += customer_row;
        count++;
    });

    //console.log("count: "+Object.keys(data).length);
    if (Number(count - 1) == Object.keys(data).length) {
        console.log("count: " + Number(count - 1));
        document.querySelectorAll("a.user_info").forEach(element => {
            element.addEventListener("click", e => {
                console.log(String(e.target.id).substring(10));
                if (getCookie("uid") != null) {
                    delCookie("uid");
                }
                document.cookie = 'uid=' + String(e.target.id).substring(10);
                window.location = "user_profile.html";
            });
        });
    }
});

console.log("Nan Shan Life")
console.log(NanshanLife);
console.log("China Life");
console.log(ChinaLife);
console.log("Taiwan Life");
console.log(TaiwanLife);
console.log("Cathay Life");
console.log(CathayLife);
console.log("NAN");
console.log(NAN);