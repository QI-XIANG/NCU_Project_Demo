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

//若尚未登入則強行轉進登入頁面
if (getCookie("identityNumber") == null) {
    alert("請先登入再前往本頁面!");
    window.location = "Government_login.html";
}

if (getCookie("uid") != null) {
    delCookie("uid");
}

//登出功能
var logout_btn = document.querySelector(".logout_btn");
logout_btn.addEventListener("click", e => {
    if (getCookie("identityNumber") != null) {
        delCookie("identityNumber");
        document.cookie = 'LoginStatus=No';
        window.location = "Government_login.html"; //登出會強制導引到登入頁面
    }
});

var data;
var users_id = [];
var count = 1;
var customer_row;
var customer_table_tbody = document.querySelector("tbody.customer-table-tbody");
var customer_detail;


//生成用戶 row 
function generateCustomerRow(element, count2, user_id) {
    customer_row = `<tr>
                        <td class="customer_number">`+ Number(count2) + `</td>
                        <td class="customer_name">`+ element.realName + `</td>
                        <td class="customer_gender">`+ element.gender + `</td>
                        <td class="customer_birth">`+ element.birthDate + `</td>
                        <td class="customer_detail"><a href="#" id="user_info_`+ user_id + `" class="user_info">點擊查看</a></td>
                    </tr>`;
    customer_table_tbody.innerHTML += customer_row;

    if (count2 = users_id.length) {
        //console.log(1212);
        customer_detail = document.querySelectorAll(".user_info");
        customer_detail.forEach(element => {
            element.addEventListener("click", e => {
                //console.log(String(e.target.id).substring(10));
                if (getCookie("uid") != null) {
                    delCookie("uid");
                }
                document.cookie = 'uid=' + String(e.target.id).substring(10);
                window.location = "insuranceCompany_UserProfile.html";
            })
        });
        $(".loader-wrapper").fadeOut("slow");
        //console.log("14111");

    }
}

$.fn.dataTable.ext.type.order['birth-date-pre'] = function (d) {
    let dates = d.split("/");
    return new Date(dates[2], dates[0], dates[1]);
};

//存取政府限制用戶資料
db.ref("/Government/restrictedUsers").once('value', function (snapshot) {
    data = snapshot.val(); //讀出資料庫
    //console.log(data);
    data.forEach(element => {
        users_id.push(element);
    });

    users_id.forEach(element => {
        db.ref("/Users/" + String(element)).once('value', function (snapshot) {
            //var size = Object.keys(data).length; 資料庫 key 的長度取得
            data = snapshot.val(); //讀出資料庫的使用者資料
            //console.log(data);
            generateCustomerRow(data, count, element);
            count += 1;
            if (count - 1 == users_id.length) {
                /*分頁功能*/
                $("#table-demo").DataTable({
                    "lengthMenu": [[5, 10, 15, 20], [5, 10, 15, 20]], //顯示筆數設定 預設為[10, 25, 50, 100]
                    language: {
                        "lengthMenu": "顯示 _MENU_ 筆資料",
                        "sProcessing": "處理中...",
                        "sZeroRecords": "查無符合結果",
                        "sInfo": "目前有 _MAX_ 筆資料",
                        "sInfoEmpty": "目前共有 0 筆紀錄",
                        "sInfoFiltered": " ",
                        "sInfoPostFix": "",
                        "sSearch": "搜尋:",
                        "sUrl": "",
                        "sEmptyTable": "尚未有資料紀錄存在",
                        "sLoadingRecords": "載入資料中...",
                        "sInfoThousands": ",",
                        "oPaginate": {
                            "sFirst": "首頁",
                            "sPrevious": "上一頁",
                            "sNext": "下一頁",
                            "sLast": "末頁"
                        },
                        "order": [[0, "desc"]],
                        "oAria": {
                            "sSortAscending": ": 以升序排列此列",
                            "sSortDescending": ": 以降序排列此列"
                        }
                    },
                    columnDefs: [
                        { type: 'birth-date', targets: 3 }
                    ],
                });
            };
        });

    });
});