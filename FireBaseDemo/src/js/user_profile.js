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

db.ref("/Users/" + getCookie("uid")).once('value', function (snapshot) {
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
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

//登出
var user_logout = document.querySelector(".user_logout");
user_logout.addEventListener("click", e => {
    if (getCookie("uid") != null) {
        delCookie("uid");
        window.location = "index.html";
    }
});

//是否已經登入
if (getCookie("uid") == null) {
    alert("您還沒有登入喔~\n即將跳轉回登入頁面!");
    window.location = "index.html";
}

//摩托車資料變數宣告
var motorcycle_brand = document.getElementById("motorcycle_brand");
var motorcycle_cc = document.getElementById("motorcycle_cc");
var motorcycle_oener = document.getElementById("motorcycle_owner");
var motorcycle_plateNumber = document.getElementById("motorcycle_plateNumber");

//處理摩托車資料
document.querySelector("#user_motorcycle").addEventListener("click", e => {
    $("#motorcycle_detail").dialog({
        width: 320,
        height: 280,
        modal: true
    });
    db.ref("/Users/" + getCookie("uid")).once('value', function (snapshot) {
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

var row = `
        <td id="journey-title"></td>
        <td id="acceleration_stat"></td>
        <td id="distance_stat"><a href="#">Click me</a></td>
        <td id="gps_stat"><a href="#">Click me</a></td>
        <td id="journey-detail"><a href="#">Click me</a></td>
        `;




function showweek(now) {

    

    if (now.getDay() == 0) return ('星期日');

    if (now.getDay() == 1) return ('星期一');

    if (now.getDay() == 2) return ('星期二');

    if (now.getDay() == 3) return ('星期三');

    if (now.getDay() == 4) return ('星期四');

    if (now.getDay() == 5) return ('星期五');

    if (now.getDay() == 6) return ('星期六');

}



function showdate(now) {

    var year = now.getFullYear();

    var month = now.getMonth() + 1;

    var day = now.getDate();

    var hour = now.getHours();

    var min = now.getMinutes();

    return year + '年' + month + '月' + day+"日 "+showweek(now)+" "+hour+":"+min;

}



db.ref("/Users/" + getCookie("uid")).once('value', function (snapshot) {
    //var size = Object.keys(data).length;
    var data = snapshot.val();
    //console.log(Object.keys(data));
    //var size = Object.keys(data).length;
    //console.log(size);
    if (data["journey"] == null){
        var journey_table = document.querySelector(".journey-table-tbody");
        row = `<tr>
                <td id="journey-title">查無資料</td>
                <td id="acceleration_stat">查無資料</td>
                <td id="distance_stat">查無資料</td>
                <td id="gps_stat">查無資料</td>
                <td id="journey-detail">查無資料</td>
            </tr>`;
        journey_table.insertAdjacentHTML('afterbegin', row);
    }
    if (data["journey"] != null) {
        console.log("aru");
        var journey_table = document.querySelector(".journey-table-tbody");
        var journey = data["journey"];
        for (var i = 0; i < Object.keys(journey).length - 1; i++) {
            console.log(journey[Object.keys(journey)[i]]);
            row = `
                <td id="journey-title">`+ journey[Object.keys(journey)[i]]['start_time'] + `</td>
                <td id="acceleration_stat"><a href="#">Click me</a></td>
                <td id="distance_stat"><a href="#">Click me</a></td>
                <td id="gps_stat"><a href="#">Click me</a></td>
                <td id="journey-detail"><a id="journey_`+ journey[Object.keys(journey)[i]]['start_time'] + `">Click me</a></td>
            `;

            journey_table.insertAdjacentHTML('afterbegin', row);

            console.log(document.querySelector("td#journey-detail a#journey_" + String(journey[Object.keys(journey)[i]]['start_time'])));


            //行程資訊的 event handle
            document.querySelector("td#journey-detail a#journey_" + String(journey[Object.keys(journey)[i]]['start_time'])).addEventListener("click", e => {
                console.log(String(e['path'][0].id).substring(8));
                $("#journey-modal").dialog({
                    width: 375,
                    height: 250,
                    modal: true
                });
                $("#journey-modal").show();
                //行程資料
                var data_journey_start = document.getElementById("data-journey-start");
                var data_journey_end = document.getElementById("data-journey-end");
                var data_journey_totaltime = document.getElementById("data-journey-totaltime");
                console.log(journey[String(e['path'][0].id).substring(8)]);
                var journey_start_time = showdate(new Date(journey[String(e['path'][0].id).substring(8)].start_time * 1000));
                var journey_end_time = showdate(new Date(journey[String(e['path'][0].id).substring(8)].end_time * 1000));
                var journey_time = journey[String(e['path'][0].id).substring(8)].journey_time;
                data_journey_start.innerHTML = journey_start_time;
                data_journey_end.innerHTML = journey_end_time;
                data_journey_totaltime.innerHTML = journey_time + "秒";
            });
        }
        console.log(Object.keys(data['journey']));


    }

});

