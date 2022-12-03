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
function generateCustomerRow(element, count, user_id) {
    customer_row = `<tr>
                        <td class="customer_number">`+ Number(count) + `</td>
                        <td class="customer_name">`+ element.realName + `</td>
                        <td class="customer_gender">`+ element.gender + `</td>
                        <td class="customer_birth">`+ element.birthDate + `</td>
                        <td class="customer_detail"><a href="#" id="user_info_`+ user_id + `" class="user_info">點擊查看</a></td>
                    </tr>`;
    customer_table_tbody.innerHTML += customer_row;

    if (count = users_id.length) {
        console.log(1212);
        customer_detail = document.querySelectorAll(".user_info");
        customer_detail.forEach(element => {
            element.addEventListener("click", e => {
                console.log(String(e.target.id).substring(10));
                if (getCookie("uid") != null) {
                    delCookie("uid");
                }
                document.cookie = 'uid=' + String(e.target.id).substring(10);
                window.location = "insuranceCompany_UserProfile.html";
            })
        });
        $(".loader-wrapper").fadeOut("slow");
        console.log("14111");

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
        db.ref("/Users/" + String(element)).once('value', function (snapshot) {
            //var size = Object.keys(data).length; 資料庫 key 的長度取得
            data = snapshot.val(); //讀出資料庫的使用者資料
            console.log(data);
            generateCustomerRow(data, count, element);
            count += 1;

        });

    });

    var CurrentPage = 0;
    var rowsShown = 5;
    var rowsTotal = users_id.length;
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

        if (numPages >= 3) {
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
        if (numPages >= 3) {
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

        if (numPages >= 3) {
            if (Number(CurrentPage) + 1 == numPages) {
                $('#nav .pagination li.normal-page-item').css('opacity', '0.0').hide().slice(CurrentPage - 2, CurrentPage + 1).show().css('opacity', '1.0');
            }
            if (Number(CurrentPage) + 1 < numPages) {
                $('#nav .pagination li.normal-page-item').css('opacity', '0.0').hide().slice(CurrentPage - 1, Number(CurrentPage) + 2).show().css('opacity', '1.0');
            }
        }

        console.log(CurrentPage);
    });

});
