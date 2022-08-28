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
var customer_count = 1;

//若尚未登入則強行轉進登入頁面
if (getCookie("CompanyName") == null) {
    alert("請先登入再前往本頁面!");
    window.location = "insuranceCompany_login.html";
}

/*if(getCookie("uid") != null){
    delCookie("uid");
}*/

//登出按鈕的事件處理
var logout_btn = document.querySelector(".logout_btn");
logout_btn.addEventListener("click", e => {
    delCookie("CompanyName");
    document.cookie = 'LoginStatus=No';
    window.location = "insuranceCompany_login.html";
});

//存取保險公司資料
db.ref("/InsuranceCompany/" + getCookie("CompanyName")).once('value', function (snapshot) {
    data = snapshot.val(); //讀出資料庫
    var companyName = document.querySelector(".companyName");
    companyName.innerHTML = data.CompanyName;
});

$.fn.dataTable.ext.type.order['birth-date-pre'] = function (d) {
    let dates = d.split("/");
    return new Date(dates[2], dates[0], dates[1]);
};

//存取保戶資料
db.ref("/Users").once('value', function (snapshot) {
    //var size = Object.keys(data).length; 資料庫 key 的長度取得
    data = snapshot.val(); //讀出資料庫的使用者資料
    users_id = Object.keys(data);
    users_id = users_id.slice(0, users_id.length)
    users_id.forEach(element => {
        //console.log(data[element].insuranceCompany.name);
        switch (String(data[element].insuranceCompany.name)) {
            case "Nan Shan Life":
                user_id = String(element);
                data[element]["user_id"] = user_id;
                NanshanLife.push(data[element]);
                count++;
                break;
            case "China Life":
                user_id = String(element);
                data[element]["user_id"] = user_id;
                ChinaLife.push(data[element]);
                count++;
                break;
            case "Taiwan Life":
                user_id = String(element);
                data[element]["user_id"] = user_id;
                TaiwanLife.push(data[element]);
                count++;
                break;
            case "Cathay Life":
                user_id = String(element);
                data[element]["user_id"] = user_id;
                CathayLife.push(data[element]);
                count++;
                break;
            case "No insurance":
                user_id = String(element);
                data[element]["user_id"] = user_id;
                NAN.push(data[element]);
                count++;
                break;
        };
    });

    var customer_table_tbody = document.querySelector("tbody.customer-table-tbody");
    var customer_row;

    if (getCookie("CompanyName") == "TaiwanLife") {
        TaiwanLife.forEach(element => {
            customer_row = `<tr>
                            <td class="customer_number">`+ Number(customer_count) + `</td>
                            <td class="customer_name">`+ element.realName + `</td>
                            <td class="customer_gender">`+ element.gender + `</td>
                            <td class="customer_birth">`+ element.birthDate + `</td>
                            <td class="customer_detail"><a href="#" id="user_info_`+ element.user_id + `" class="user_info">點擊查看</a></td>
                        </tr>`;
            customer_table_tbody.innerHTML += customer_row;
            customer_count++;
        });
    }
    if (getCookie("CompanyName") == "NanShanLife") {
        NanshanLife.forEach(element => {
            customer_row = `<tr>
                            <td class="customer_number">`+ Number(customer_count) + `</td>
                            <td class="customer_name">`+ element.realName + `</td>
                            <td class="customer_gender">`+ element.gender + `</td>
                            <td class="customer_birth">`+ element.birthDate + `</td>
                            <td class="customer_detail"><a href="#" id="user_info_`+ element.user_id + `" class="user_info">點擊查看</a></td>
                        </tr>`;
            customer_table_tbody.innerHTML += customer_row;
            customer_count++;
        });
    }
    if (getCookie("CompanyName") == "ChinaLife") {
        ChinaLife.forEach(element => {
            customer_row = `<tr>
                            <td class="customer_number">`+ Number(customer_count) + `</td>
                            <td class="customer_name">`+ element.realName + `</td>
                            <td class="customer_gender">`+ element.gender + `</td>
                            <td class="customer_birth">`+ element.birthDate + `</td>
                            <td class="customer_detail"><a href="#" id="user_info_`+ element.user_id + `" class="user_info">點擊查看</a></td>
                        </tr>`;
            customer_table_tbody.innerHTML += customer_row;
            customer_count++;
        });
    }
    if (getCookie("CompanyName") == "CathayLife") {
        CathayLife.forEach(element => {
            customer_row = `<tr>
                            <td class="customer_number">`+ Number(customer_count) + `</td>
                            <td class="customer_name">`+ element.realName + `</td>
                            <td class="customer_gender">`+ element.gender + `</td>
                            <td class="customer_birth">`+ element.birthDate + `</td>
                            <td class="customer_detail"><a href="#" id="user_info_`+ element.user_id + `" class="user_info">點擊查看</a></td>
                        </tr>`;
            customer_table_tbody.innerHTML += customer_row;
            customer_count++;
        });
    }
    if (getCookie("CompanyName") == "NAN") {
        NAN.forEach(element => {
            customer_row = `<tr>
                            <td class="customer_number">`+ Number(customer_count) + `</td>
                            <td class="customer_name">`+ element.realName + `</td>
                            <td class="customer_gender">`+ element.gender + `</td>
                            <td class="customer_birth">`+ element.birthDate + `</td>
                            <td class="customer_detail"><a href="#" id="user_info_`+ element.user_id + `" class="user_info">點擊查看</a></td>
                        </tr>`;
            customer_table_tbody.innerHTML += customer_row;
            customer_count++;
        });
    }

    if (Number(count - 1) == Object.keys(data).length) {
        document.querySelectorAll("a.user_info").forEach(element => {
            element.addEventListener("click", e => {
                console.log(String(e.target.id).substring(10));
                if (getCookie("uid") != null) {
                    delCookie("uid");
                }
                document.cookie = 'uid=' + String(e.target.id).substring(10);
                window.location = "insuranceCompany_UserProfile.html";
            });
        });

        //pagination 分頁功能

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
        })

        $(".loader-wrapper").fadeOut("slow");
    }
});