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
if(getCookie("CompanyName") == null){
    alert("請先登入再前往本頁面!");
    window.location = "insuranceCompany_login.html";
}

if(getCookie("uid") != null){
    delCookie("uid");
}

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
    console.log(data);
    var companyName = document.querySelector(".companyName");
    companyName.innerHTML = data.CompanyName;
});

//存取保戶資料
db.ref("/Users").once('value', function (snapshot) {
    //var size = Object.keys(data).length; 資料庫 key 的長度取得
    data = snapshot.val(); //讀出資料庫的使用者資料
    console.log(Object.keys(data));
    users_id = Object.keys(data);
    users_id = users_id.slice(0,users_id.length)
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

    if(getCookie("CompanyName") == "TaiwanLife"){
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
    if(getCookie("CompanyName") == "NanShanLife"){
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
    if(getCookie("CompanyName") == "ChinaLife"){
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
    if(getCookie("CompanyName") == "CathayLife"){
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
    if(getCookie("CompanyName") == "NAN"){
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
    
    if (Number(count-1) == Object.keys(data).length) {
        console.log("count: " + Number(count - 1));
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
        $(".loader-wrapper").fadeOut("slow");

        var CurrentPage = 0;
        var rowsShown = 5;
        var rowsTotal = $('#table-demo tbody tr').length;
        var numPages;
        if(rowsTotal%5 == 0){
            numPages = Math.round(rowsTotal / rowsShown);
        }
        if(rowsTotal%5 != 0){
            numPages = Math.ceil(rowsTotal / rowsShown);
        }
        $('#table-demo').after('<div id="nav"><ul class="pagination"></ul></div>');
        for (var i = 0; i < numPages; i++) {
            var pageNum = i + 1;
            console.log("i"+i)
            $('#nav .pagination').append('<li class="page-item normal-page-item"><a class="page-link normalLink link' + i + '" rel="' + i + '">' + pageNum + '</a></li>');
        }
        $('#nav .pagination').prepend('<li class="page-item special-page-item"><a class="page-link lastPage" rel="0" aria-label="Previous"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a></li>');
        $('#nav .pagination').append('<li class="page-item special-page-item"><a class="page-link nextPage" aria-label="Next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li>');

        $('#table-demo tbody tr').hide();
        $('#table-demo tbody tr').slice(0, rowsShown).show();
        $('#nav a.normalLink:first').addClass('active');

        if (Number(CurrentPage) - 1 <= 0) {
            $('#nav .pagination li.normal-page-item').css('opacity', '0.0').hide().slice(CurrentPage, CurrentPage + 3).show().css('opacity', '1.0');
        }

        // normal link click enent handle
        $('#nav a.normalLink').bind('click', function () {

            $('#nav a').removeClass('active');
            $(this).addClass('active');

            var currPage = $(this).attr('rel');
            CurrentPage = $(this).attr('rel');
            var startItem = currPage * rowsShown;
            var endItem = startItem + rowsShown;

            $('#table-demo tbody tr').css('opacity', '0.0').hide().slice(startItem, endItem).
                css('display', 'table-row').animate({ opacity: 1 }, 300);

            if(numPages >= 3){
                if (Number(CurrentPage) - 1 <= 0) {
                    $('#nav .pagination li.normal-page-item').css('opacity', '0.0').hide().slice(CurrentPage, CurrentPage + 3).show().css('opacity', '1.0');
                }
                if (Number(CurrentPage) == numPages - 1) {
                    $('#nav .pagination li.normal-page-item').css('opacity', '0.0').hide().slice(CurrentPage - 2, Number(CurrentPage) + 1).show().css('opacity', '1.0');
                }
                if (Number(CurrentPage) - 1 >= 0 & Number(CurrentPage) != numPages - 1) {
                    $('#nav .pagination li.normal-page-item').css('opacity', '0.0').hide().slice(CurrentPage - 1, Number(CurrentPage) + 2).show().css('opacity', '1.0');
                }    
            }
            
            //console.log(CurrentPage);
        });

        // lastPage link click event handle
        $('#nav a.lastPage').bind('click', function () {

            $('#nav a.normalLink').removeClass('active');
            $('#nav a.lastPage').removeClass('active');
            $('#nav a.nextPage').removeClass('active');

            if ((CurrentPage - 1) >= 0) {
                $(this).attr('rel', CurrentPage - 1)
            } else {
                $(this).attr('rel', 0)
            }
            var currPage = $(this).attr('rel');
            CurrentPage = $(this).attr('rel');
            var startItem = currPage * rowsShown;
            var endItem = startItem + rowsShown;
            $('#table-demo tbody tr').css('opacity', '0.0').hide().slice(startItem, endItem).
                css('display', 'table-row').animate({ opacity: 1 }, 300);

            for (var i = 0; i < numPages; i++) {
                if (i == Number(CurrentPage)) {
                    $("#nav .pagination li.normal-page-item a.link" + String(i)).addClass("active");
                } else {
                    $("#nav .pagination li.normal-page-item a.link" + String(i)).removeClass("active");
                }
            }
            if(numPages >= 3){
                if (Number(CurrentPage) - 1 <= 0) {
                    $('#nav .pagination li.normal-page-item').css('opacity', '0.0').hide().slice(CurrentPage, CurrentPage + 3).show().css('opacity', '1.0');
                }
                if (Number(CurrentPage) == numPages - 1) {
                    $('#nav .pagination li.normal-page-item').css('opacity', '0.0').hide().slice(CurrentPage - 2, Number(CurrentPage) + 1).show().css('opacity', '1.0');
                }
                if (Number(CurrentPage) - 1 >= 0 & Number(CurrentPage) != numPages - 1) {
                    $('#nav .pagination li.normal-page-item').css('opacity', '0.0').hide().slice(CurrentPage - 1, Number(CurrentPage) + 2).show().css('opacity', '1.0');
                }
            }
            

            console.log(CurrentPage);
        });

        // nextPage link click event handle
        $('#nav a.nextPage').bind('click', function () {

            $('#nav a.normalLink').removeClass('active');
            $('#nav a.lastPage').removeClass('active');
            $('#nav a.nextPage').removeClass('active');

            $(this).addClass('active');
            if ((Number(CurrentPage) + 1) < numPages) {
                $(this).attr('rel', Number(CurrentPage) + 1)
            } else {
                $(this).attr('rel', CurrentPage)
            }
            var currPage = $(this).attr('rel');
            CurrentPage = $(this).attr('rel');
            var startItem = currPage * rowsShown;
            var endItem = startItem + rowsShown;
            $('#table-demo tbody tr').css('opacity', '0.0').hide().slice(startItem, endItem).
                css('display', 'table-row').animate({ opacity: 1 }, 300);

            for (var i = 0; i < numPages; i++) {
                if (i == Number(CurrentPage)) {
                    $("#nav .pagination li.normal-page-item a.link" + String(i)).addClass("active");
                } else {
                    $("#nav .pagination li.normal-page-item a.link" + String(i)).removeClass("active");
                }
            }

            $('#nav a.nextPage').removeClass('active');

            if(numPages >= 3){
                if (Number(CurrentPage) + 1 == numPages) {
                    $('#nav .pagination li.normal-page-item').css('opacity', '0.0').hide().slice(CurrentPage-2, CurrentPage + 1).show().css('opacity', '1.0');
                }
                if (Number(CurrentPage) + 1  < numPages) {
                    $('#nav .pagination li.normal-page-item').css('opacity', '0.0').hide().slice(CurrentPage - 1, Number(CurrentPage) + 2).show().css('opacity', '1.0');
                }
            }
            
            console.log(CurrentPage);
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