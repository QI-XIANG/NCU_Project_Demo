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
var user_account = document.querySelector(".user_account"); //帳號
var user_birthDate = document.querySelector(".user_birthDate"); //生日
var user_gender = document.querySelector(".user_gender"); //性別
var user_idCardNumber = document.querySelector(".user_idCardNumber"); //身分證字號
var user_realName = document.querySelector(".user_realName"); //真實姓名
var user_motorcycle = document.querySelector(".user_motorcycle"); //摩托車 (暫未使用)
var user_referenceNumber = document.querySelector(".user_referenceNumber"); //管轄編號 (駕照)
var user_insuranceCompanyName = document.querySelector('.user_insuranceCompanyName'); //投保的保險公司  

//console.log(user_account);

db.ref("/Users/" + getCookie("uid")).once('value', function (snapshot) {
    //var size = Object.keys(data).length; 資料庫 key 的長度取得
    var data = snapshot.val(); //讀出資料庫的使用者資料
    console.log(data); 
    //var size = Object.keys(data).length;
    //console.log(size);
    /*===========使用者基本資料處理==============*/
    user_account.innerHTML = data['account']; //修改帳號的 innerHTML
    user_birthDate.innerHTML = data['birthDate']; //修改生日的 innerHTML
    user_gender.innerHTML = data['gender']; //修改性別的 innerHTML
    user_idCardNumber.innerHTML = data['idCardNumber']; //修改身分證字號的 innerHTML
    user_realName.innerHTML = data['realName']; //修改真實名稱的 innerHTML
    user_insuranceCompanyName.innerHTML = data['insuranceCompany']['name']; //修改保險公司的 innerHTML
    user_referenceNumber.innerHTML = data['referenceNumber']; //修改管轄編號的 innerHTML
});

//刪除cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1); //強制讓 cookie 過期
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

//登出功能
var user_logout = document.querySelector(".user_logout");
user_logout.addEventListener("click", e => {
    if (getCookie("uid") != null) {
        delCookie("uid");
        window.location = "userLogin.html"; //登出會強制導引到登入頁面
    }
});

//是否已經登入
if (getCookie("uid") == null) {
    alert("您還沒有登入喔~\n即將跳轉回登入頁面!");
    window.location = "userLogin.html"; //未登入會強制導引到登入介面
}

//摩托車資料變數宣告
var motorcycle_brand = document.getElementById("motorcycle_brand");
var motorcycle_cc = document.getElementById("motorcycle_cc");
var motorcycle_owner = document.getElementById("motorcycle_owner");
var motorcycle_plateNumber = document.getElementById("motorcycle_plateNumber");

//處理摩托車資料
document.querySelector("#user_motorcycle").addEventListener("click", e => {
    $("#motorcycle_detail").dialog({
        width: 320,
        height: 280,
        modal: true,
        show: { effect: 'fade', duration: 500 },
        hide: { effect: 'fade', duration: 500 }
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


/*===============表格範例================*/
var row = `
        <td id="journey-title"></td>
        <td id="acceleration_stat"></td>
        <td id="distance_stat"><a href="#">Click me</a></td>
        <td id="gps_stat"><a href="#">Click me</a></td>
        <td id="journey-detail"><a href="#">Click me</a></td>
        `;


/*===================星期轉換=====================*/

function showweek(now) {
    if (now.getDay() == 0) return ('星期日');
    if (now.getDay() == 1) return ('星期一');
    if (now.getDay() == 2) return ('星期二');
    if (now.getDay() == 3) return ('星期三');
    if (now.getDay() == 4) return ('星期四');
    if (now.getDay() == 5) return ('星期五');
    if (now.getDay() == 6) return ('星期六');
}

/*====================日期轉換=========================*/

function showdate(now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (min < 10) {
        min = '0' + min;
    }
    return year + '年' + month + '月' + day + "日 " + showweek(now) + " " + hour + ":" + min;
}

/*===============判斷是否可以轉換成數字=================*/

function isNumeric(num) {
    return !isNaN(num)
}

/*=====================所有表格資料的處理=================================*/

db.ref("/Users/" + getCookie("uid")).once('value', function (snapshot) { //連結到特定使用者的資料庫資料表
    //var size = Object.keys(data).length;
    var data = snapshot.val();
    //console.log(Object.keys(data["journey"]));
    //var size = Object.keys(data).length;
    //console.log(size);

    var journey_row_count = 0; //確認行程資料的筆數

    for (var journey_count = 0; journey_count < Object.keys(data["journey"]).length; journey_count++) {
        if (isNumeric(Object.keys(data["journey"])[journey_count])) {
            journey_row_count += 1;
            //console.log("總共的行程數:"+Object.keys(data["journey"])[journey_count]);
        }
    }

    if (journey_row_count == 0) { // 沒有行程資料
        console.log("no data");
        var journey_table = document.querySelector(".journey-table-tbody");
        //預設顯示 no data
        row = `<tr> 
                <td id="journey-title">查無資料</td>
                <td id="acceleration_stat">查無資料</td>
                <td id="distance_stat">查無資料</td>
                <td id="gps_stat">查無資料</td>
                <td id="journey-detail">查無資料</td>
            </tr>`;
        journey_table.insertAdjacentHTML('afterbegin', row);
        $(".loader-wrapper").fadeOut("slow");
    }

    if (journey_row_count > 0) { //有行程資料
        //console.log("aru");
        var journey_table = document.querySelector(".journey-table-tbody");
        var journey = data["journey"]; //將資料限縮在 journey 資料表上

        //console.log("eeeee"+journey_row_count);

        for (var i = 0; i < journey_row_count; i++) { //透過迴圈依序把資料放進資料表裡面
            //console.log(journey[Object.keys(journey)[i]]['start_time']);
            row = `
                <td id="journey-title">`+ journey[Object.keys(journey)[i]].start_time + `</td>
                <td id="acceleration_stat"><a id="journey_`+ journey[Object.keys(journey)[i]]['start_time'] + `">點擊查看</a></td>
                <td id="distance_stat"><a id="journey_`+ journey[Object.keys(journey)[i]]['start_time'] + `">點擊查看</a></td>
                <td id="gps_stat"><a id="journey_`+ journey[Object.keys(journey)[i]]['start_time'] + `">點擊查看</a></td>
                <td id="journey-detail"><a id="journey_`+ journey[Object.keys(journey)[i]]['start_time'] + `">點擊查看</a></td>
            `;

            //console.log(row);

            journey_table.insertAdjacentHTML('afterbegin', row); //越新的資料會被顯示在越上層


            //console.log(document.querySelector("td#journey-detail a#journey_" + String(journey[Object.keys(journey)[i]]['start_time'])));


            //行程資訊的 event handle
            //在行程資訊上註冊 click event
            document.querySelector("td#journey-detail a#journey_" + String(journey[Object.keys(journey)[i]]['start_time'])).addEventListener("click", e => {
                console.log(String(e.target.id.substring(8)));
                //console.log(String(e.target.id.substring(8)));
                $("#journey-modal").dialog({ //彈出視窗的外觀大小設定
                    width: 400,
                    height: 250,
                    modal: true,
                    show: { effect: 'fade', duration: 500 },
                    hide: { effect: 'fade', duration: 500 }
                });          
                $("#journey-modal").show(); //實際顯示視窗
                //行程資料
                var data_journey_start = document.getElementById("data-journey-start"); //行程開始時間
                var data_journey_end = document.getElementById("data-journey-end"); //行程結束時間
                var data_journey_totaltime = document.getElementById("data-journey-totaltime"); //行程總時間
                console.log(journey[String(e.target.id.substring(8))]); //取出觸發事件的 journey 編號
                //行程資料數值取出
                var journey_start_time = showdate(new Date(journey[String(e.target.id.substring(8))].start_time * 1000));
                var journey_end_time = showdate(new Date(journey[String(e.target.id.substring(8))].end_time * 1000));
                var journey_time = journey[String(e.target.id.substring(8))].journey_time;
                //實際修改行程資料的 innerHTML
                data_journey_start.innerHTML = journey_start_time;
                data_journey_end.innerHTML = journey_end_time;
                data_journey_totaltime.innerHTML = journey_time + "秒";
            });

            //車距資料 event handle
            //在車距上註冊 click event
            document.querySelector("td#distance_stat a#journey_" + String(journey[Object.keys(journey)[i]]['start_time'])).addEventListener("click", e => {
                $("#distance-modal").dialog({ //彈出視窗的外觀大小設定
                    width: 420,
                    height: 250,
                    modal: true,
                    show: { effect: 'fade', duration: 500 },
                    hide: { effect: 'fade', duration: 500 }
                });
                $("#distance-modal").show();//實際顯示視窗
                //車距資料
                var data_left_distance = document.getElementById("data-left-distance"); //左方車距
                var data_right_distance = document.getElementById("data-right-distance"); //右方車距
                var data_back_distance = document.getElementById("data-back-distance"); // 後方車距
                //車距資料數值取出
                var left_distance = journey[String(e.target.id.substring(8))]["distance_stat"][0].avg_distance;
                var right_distance = journey[String(e.target.id.substring(8))]["distance_stat"][1].avg_distance;
                var back_distance = journey[String(e.target.id.substring(8))]["distance_stat"][2].avg_distance;
                //實際修改車距資料的 innerHTML
                data_left_distance.innerHTML = left_distance + " mm";
                data_right_distance.innerHTML = right_distance + " mm";
                data_back_distance.innerHTML = back_distance + " mm";

                //左方車距違規有資料
                if (journey[String(e.target.id.substring(8))]["distance_stat"][0].distance_violation != null) {

                    console.log("have data");

                    var dialog_1 = document.querySelector("#distance-modal div#violation_1");
                    var count = 1; //用來計算違規編號的 count

                    if (document.querySelector('table#violation1_' + String(e.target.id.substring(8))) == null) { //避免重複修改 html 導致錯誤
                        console.log(document.querySelector('table#violation1_' + String(e.target.id.substring(8))));
                        //新增車距違規的資料表
                        dialog_1.innerHTML = `<table id="violation1_` + String(e.target.id.substring(8)) + `" style="border: 1px solid black;text-align: center;"><p style="margin-top: 20px;">左方車距違規資訊:</p><tr style="border: 1px solid black;"><th style="border: 1px solid black;padding: 5px;">違規編號</th><th style="border: 1px solid black;padding: 5px;">違規車距差</th></tr></table>`;
                        //針對每個違規做處理並各自生成 row 後添加到 table 中
                        journey[String(e.target.id.substring(8))]["distance_stat"][0].distance_violation.forEach(element => {
                            console.log(element);
                            //選取特定 journey 編號的 table
                            var violation_row = document.querySelector('table#violation1_' + String(e.target.id.substring(8)));
                            violation_row.innerHTML += '<tr style="border: 1px solid black;"><td style="border: 1px solid black;padding: 5px;" id="data-left-distance">' + count + '</td><td style="border: 1px solid black;padding: 5px;" id="data-right-distance">' + element + ' mm</td></tr>';
                            count += 1; //編號加一
                        });
                    }


                }

                //左方車距違規沒資料
                if (journey[String(e.target.id.substring(8))]["distance_stat"][0].distance_violation == null) {
                    var dialog_1 = document.querySelector("#distance-modal div#violation_1");
                    dialog_1.innerHTML = ""; //沒資料預設違規的 innerHTML 為空值
                }

                //右方車距違規有資料
                if (journey[String(e.target.id.substring(8))]["distance_stat"][1].distance_violation != null) {

                    console.log("have data");
                    var dialog_1 = document.querySelector("#distance-modal div#violation_2");
                    var count = 1; //用來計算違規編號的 count

                    if (document.querySelector('table#violation2_' + String(e.target.id.substring(8))) == null) { //避免重複修改 html 導致錯誤
                        console.log(document.querySelector('table#violation2_' + String(e.target.id.substring(8))));
                        //新增車距違規的資料表
                        dialog_1.innerHTML = `<table id="violation2_` + String(e.target.id.substring(8)) + `" style="border: 1px solid black;text-align: center;"><p style="margin-top: 20px;">右方車距違規資訊:</p><tr style="border: 1px solid black;"><th style="border: 1px solid black;padding: 5px;">違規編號</th><th style="border: 1px solid black;padding: 5px;">違規車距差</th></tr></table>`;
                        //針對每個違規做處理並各自生成 row 後添加到 table 中
                        journey[String(e.target.id.substring(8))]["distance_stat"][1].distance_violation.forEach(element => {
                            console.log(element);
                            //選取特定 journey 編號的 table
                            var violation_row = document.querySelector('table#violation2_' + String(e.target.id.substring(8)));
                            violation_row.innerHTML += '<tr style="border: 1px solid black;"><td style="border: 1px solid black;padding: 5px;" id="data-left-distance">' + count + '</td><td style="border: 1px solid black;padding: 5px;" id="data-right-distance">' + element + ' mm</td></tr>';
                            count += 1;//編號加一
                        });
                    }


                }

                //右方車距違規沒資料
                if (journey[String(e.target.id.substring(8))]["distance_stat"][1].distance_violation == null) {
                    var dialog_1 = document.querySelector("#distance-modal div#violation_2");
                    dialog_1.innerHTML = ""; //沒資料預設違規的 innerHTML 為空值
                }

                //後方車距違規有資料
                if (journey[String(e.target.id.substring(8))]["distance_stat"][2].distance_violation != null) {

                    console.log("have data");

                    var dialog_1 = document.querySelector("#distance-modal div#violation_3");
                    var count = 1;

                    if (document.querySelector('table#violation3_' + String(e.target.id.substring(8))) == null) { //避免重複修改 html 導致錯誤
                        console.log(document.querySelector('table#violation3_' + String(e.target.id.substring(8))));
                        //新增車距違規的資料表
                        dialog_1.innerHTML = `<table id="violation3_` + String(e.target.id.substring(8)) + `" style="border: 1px solid black;text-align: center;"><p style="margin-top: 20px;">後方車距違規資訊:</p><tr style="border: 1px solid black;"><th style="border: 1px solid black;padding: 5px;">違規編號</th><th style="border: 1px solid black;padding: 5px;">違規車距差</th></tr></table>`;
                        //針對每個違規做處理並各自生成 row 後添加到 table 中
                        journey[String(e.target.id.substring(8))]["distance_stat"][2].distance_violation.forEach(element => {
                            console.log(element);
                            //選取特定 journey 編號的 table
                            var violation_row = document.querySelector('table#violation3_' + String(e.target.id.substring(8)));
                            violation_row.innerHTML += '<tr style="border: 1px solid black;"><td style="border: 1px solid black;padding: 5px;" id="data-left-distance">' + count + '</td><td style="border: 1px solid black;padding: 5px;" id="data-right-distance">' + element + ' mm</td></tr>';
                            count += 1; //編號加一
                        });
                    }


                }

                //後方車距違規沒資料
                if (journey[String(e.target.id.substring(8))]["distance_stat"][2].distance_violation == null) {
                    var dialog_1 = document.querySelector("#distance-modal div#violation_3");
                    dialog_1.innerHTML = "";  //沒資料預設違規的 innerHTML 為空值
                }



            });

            /*================加速度資料處理===============*/
            //加速度 event handle
            document.querySelector("td#acceleration_stat a#journey_" + String(journey[Object.keys(journey)[i]]['start_time'])).addEventListener("click", e => {
                $("#acceleration-modal").dialog({
                    width: 300,
                    height: 250,
                    modal: true,
                    show: { effect: 'fade', duration: 500 },
                    hide: { effect: 'fade', duration: 500 }
                });
                $("#acceleration-modal").show();
                //加速度資料
                var avg_acceleration = document.getElementById("avg_acceleration");
                var avg_gyro = document.getElementById("avg_gyro");
                //將實際資料放入 variable
                var data_avg_acceleration = (Math.round(journey[String(e.target.id.substring(8))]["acceleration_stat"][0].avg_acceleration * 1000) / 1000).toFixed(3);
                var data_avg_gyro = (Math.round(journey[String(e.target.id.substring(8))]["acceleration_stat"][1].avg_gyro * 1000) / 1000).toFixed(3);
                //修改表格內資料
                avg_acceleration.innerHTML = data_avg_acceleration;
                avg_gyro.innerHTML = data_avg_gyro;

                //加速度違規有資料
                if (journey[String(e.target.id.substring(8))]["acceleration_stat"][0].acceleration_violation != null) {

                    console.log("have data");

                    var dialog_1 = document.querySelector("#acceleration-modal div#violation_1");
                    var count = 1;

                    if (document.querySelector('table#acceleration_violation1_' + String(e.target.id.substring(8))) == null) { //避免重複修改 html 導致錯誤
                        console.log(document.querySelector('table#acceleration_violation1_' + String(e.target.id.substring(8))));
                        dialog_1.innerHTML = `<table id="acceleration_violation1_` + String(e.target.id.substring(8)) + `" style="border: 1px solid black;text-align: center;"><p style="margin-top: 20px;">加速度違規資訊:</p><tr style="border: 1px solid black;"><th style="border: 1px solid black;padding: 5px;">違規編號</th><th style="border: 1px solid black;padding: 5px;">違規加速度差</th></tr></table>`;
                        journey[String(e.target.id.substring(8))]["acceleration_stat"][0].acceleration_violation.forEach(element => {
                            console.log(element);
                            var violation_row = document.querySelector('table#acceleration_violation1_' + String(e.target.id.substring(8)));
                            violation_row.innerHTML += '<tr style="border: 1px solid black;"><td style="border: 1px solid black;padding: 5px;" id="data-left-distance">' + count + '</td><td style="border: 1px solid black;padding: 5px;" id="data-right-distance">' + (Math.round(element * 1000) / 1000).toFixed(3); + '</td></tr>';
                            count += 1;
                        });
                    }
                }

                //加速度違規沒資料
                if (journey[String(e.target.id.substring(8))]["acceleration_stat"][0].acceleration_violation == null) {
                    var dialog_1 = document.querySelector("#acceleration-modal div#violation_1");
                    dialog_1.innerHTML = "";
                }


            });
            /*================加速度資料處理結束===============*/


            document.querySelector("td#gps_stat a#journey_" + String(journey[Object.keys(journey)[i]]['start_time'])).addEventListener("click", e => {
                $("#speed-modal").dialog({
                    width: 460,
                    height: 250,
                    modal: true,
                    show: { effect: 'fade', duration: 500 },
                    hide: { effect: 'fade', duration: 500 }
                });
                $("#speed-modal").show();
                //速度資料
                var avg_speed = document.getElementById("avg_speed");
                //將實際資料放入 variable
                var data_avg_speed = (Math.round(journey[String(e.target.id.substring(8))]["speed_stat"].avg_speed * 1000) / 1000).toFixed(2);
                //修改表格內資料
                avg_speed.innerHTML = data_avg_speed + " km/hr";

                //速度違規有資料
                if (journey[String(e.target.id.substring(8))]["speed_stat"].speed_violation != null) {

                    console.log("have data");

                    var dialog_1 = document.querySelector("#speed-modal div#violation_1");
                    var count = 1;

                    if (document.querySelector('table#speed_violation1_' + String(e.target.id.substring(8))) == null) { //避免重複修改 html 導致錯誤
                        console.log(document.querySelector('table#speed_violation1_' + String(e.target.id.substring(8))));
                        dialog_1.innerHTML = `<table id="speed_violation1_` + String(e.target.id.substring(8)) + `" style="border: 1px solid black;text-align: center;"><p style="margin-top: 20px;">速度違規資訊:</p><tr style="border: 1px solid black;"><th style="border: 1px solid black;padding: 5px;">違規編號</th><th style="border: 1px solid black;padding: 5px;">道路名稱</th><th style="border: 1px solid black;padding: 5px;">車速</th><th style="border: 1px solid black;padding: 5px;">道路速限</th></tr></table>`;
                        journey[String(e.target.id.substring(8))]["speed_stat"].speed_violation.forEach(element => {
                            console.log(element);
                            var violation_row = document.querySelector('table#speed_violation1_' + String(e.target.id.substring(8)));
                            violation_row.innerHTML += `<tr style="border: 1px solid black;"><td style="border: 1px solid black;padding: 5px;">` + count + `</td><td style="border: 1px solid black;padding: 5px;">` + element.road + `</td><td style="border: 1px solid black;padding: 5px;">` + (Math.round(element.speed * 1000) / 1000).toFixed(2) + " km/hr" + `</td><td style="border: 1px solid black;padding: 5px;">` + (Math.round(element.speed_limit * 1000) / 1000).toFixed(0) + " km/hr" + `</td></tr>`;
                            count += 1;
                        });
                    }
                }

                //速度違規沒資料
                if (journey[String(e.target.id.substring(8))]["speed_stat"].speed_violation == null) {
                    var dialog_1 = document.querySelector("#speed-modal div#violation_1");
                    dialog_1.innerHTML = "";
                }

            });

        }

        /*================表格資料分頁功能===============*/
        if ($('#table-demo tbody tr').length == journey_row_count) { //等資料都載入完才做分頁功能的載入(pagination)
            //console.log("data length" + $('#table-demo tbody tr').length);
            var CurrentPage = 0;
            $('#table-demo').after('<div id="nav"><ul class="pagination"></ul></div>');
            var rowsShown = 5;
            var rowsTotal = $('#table-demo tbody tr').length;
            var numPages = rowsTotal / rowsShown;
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

                if (Number(CurrentPage) - 1 <= 0) {
                    $('#nav .pagination li.normal-page-item').css('opacity', '0.0').hide().slice(CurrentPage, CurrentPage + 3).show().css('opacity', '1.0');
                }
                if (Number(CurrentPage) == numPages - 1) {
                    $('#nav .pagination li.normal-page-item').css('opacity', '0.0').hide().slice(CurrentPage - 2, Number(CurrentPage) + 1).show().css('opacity', '1.0');
                }
                if (Number(CurrentPage) - 1 >= 0 & Number(CurrentPage) != numPages - 1) {
                    $('#nav .pagination li.normal-page-item').css('opacity', '0.0').hide().slice(CurrentPage - 1, Number(CurrentPage) + 2).show().css('opacity', '1.0');
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

                if (Number(CurrentPage) - 1 <= 0) {
                    $('#nav .pagination li.normal-page-item').css('opacity', '0.0').hide().slice(CurrentPage, CurrentPage + 3).show().css('opacity', '1.0');
                }
                if (Number(CurrentPage) == numPages - 1) {
                    $('#nav .pagination li.normal-page-item').css('opacity', '0.0').hide().slice(CurrentPage - 2, Number(CurrentPage) + 1).show().css('opacity', '1.0');
                }
                if (Number(CurrentPage) - 1 >= 0 & Number(CurrentPage) != numPages - 1) {
                    $('#nav .pagination li.normal-page-item').css('opacity', '0.0').hide().slice(CurrentPage - 1, Number(CurrentPage) + 2).show().css('opacity', '1.0');
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

                if (Number(CurrentPage) - 1 <= 0) {
                    $('#nav .pagination li.normal-page-item').css('opacity', '0.0').hide().slice(CurrentPage, CurrentPage + 3).show().css('opacity', '1.0');
                }
                if (Number(CurrentPage) == numPages - 1) {
                    $('#nav .pagination li.normal-page-item').css('opacity', '0.0').hide().slice(CurrentPage - 2, Number(CurrentPage) + 1).show().css('opacity', '1.0');
                }
                if (Number(CurrentPage) - 1 >= 0 & Number(CurrentPage) != numPages - 1) {
                    $('#nav .pagination li.normal-page-item').css('opacity', '0.0').hide().slice(CurrentPage - 1, Number(CurrentPage) + 2).show().css('opacity', '1.0');
                }

                console.log(CurrentPage);
            });
        }
        $(".loader-wrapper").fadeOut("slow");
        /*預防資料載入後 Pagination 不正常顯示*/
        $('#nav a.normalLink').first().click();
        //console.log($('#table-demo tbody tr').length);
        //console.log(document.querySelector(".journey-table-tbody"));
        //console.log(Object.keys(data['journey']));
    }
    
});

$(".navbar-toggler").bind("click", function (e) { // toggle button bug fix
    console.log(e);
    $('div.navbar-collapse').slideToggle(500);
});

