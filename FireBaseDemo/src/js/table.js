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


//建立資料表
var data_name = document.getElementById('data-name');
var data_start_time = document.getElementById('data-start-time');
var data_end_time = document.getElementById('data-end-time');
var data_journey_time = document.getElementById('data-journey-time');

db.ref("/").once('value', function (snapshot) {
    //var size = Object.keys(data).length;
    var data = snapshot.val();
    console.log(data);
    //var size = Object.keys(data).length;
    //console.log(size);
    for (var i = 1; i <= 3; i++) {
        var user_name = 'chock_test_' + String(i + 3);
        var user_data = data[user_name];
        console.log(user_data);
        var basic_table = String(`<div id="showData" style="display: flex;justify-content: center;margin: 25px 0 25px 0;">
                                  <table id="`+ user_name + `" style="border: 1px solid black;">
                                    <tr style="border: 1px solid black;text-align:center;">
                                        <th style="border: 1px solid black;padding:5px;">User Name</th>
                                        <th style="border: 1px solid black;padding:5px;"">Journey Title</th>
                                        <th style="border: 1px solid black;padding:5px;"">Distance Status</th>
                                        <th style="border: 1px solid black;padding:5px;"">Journey Detail</th>
                                    </tr>
                                  </table>          
                                </div>`)
        document.body.insertAdjacentHTML('beforeend', basic_table)
        for (var j = 1; j <= Object.keys(user_data).length; j++) {
            var row = `<tr style="border: 1px solid black;text-align:center;">
                              <td style="border: 1px solid black;padding:5px;"" id="data-user-name">chock_test_`+ String(i + 3) + `</td>
                              <td style="border: 1px solid black;padding:5px;"" id="data-journey-title">Journey`+ String(j) + `</td>
                              <td style="border: 1px solid black;padding:5px;"" id="data-distance-status" class="journey_`+ String(j) + `"><a href="#" id="distance_` + String(j) + `">Click me</a></td>
                              <td style="border: 1px solid black;padding:5px;"" id="data-journey-detail"><a href="#" id="journey_`+ String(j) + `">Click me</a></td>
                          </tr>`;
            document.querySelector("table#" + user_name).insertAdjacentHTML('beforeend', row);
            //document.body.insertAdjacentHTML('beforeend', basic_table)
            //行程資訊的 event handle
            document.querySelector("table#" + user_name + " #journey_" + String(j)).addEventListener("click", e => {
                console.log(e["path"][0].id);
                $("#journey-modal").dialog({
                    width: 600,
                    height: 250,
                    modal: true
                });
                $("#journey-modal").show();
                //行程資料
                var data_journey_start = document.getElementById("data-journey-start");
                var data_journey_end = document.getElementById("data-journey-end");
                var data_journey_totaltime = document.getElementById("data-journey-totaltime");
                var journey_start_time = new Date(data[e["path"][4].id][e["path"][0].id].start_time * 1000);
                var journey_end_time = new Date(data[e["path"][4].id][e["path"][0].id].end_time * 1000);
                var journey_time = data[e["path"][4].id][e["path"][0].id].journey_time;
                data_journey_start.innerHTML = journey_start_time;
                data_journey_end.innerHTML = journey_end_time;
                data_journey_totaltime.innerHTML = journey_time + "s";
            });

            //車距資料 event handle
            document.querySelector("table#" + user_name + " #distance_" + String(j)).addEventListener("click", e => {
                //e["path"][1].className => journey_?
                //e["path"][4].id => chock_test_?
                console.log(e["path"][4].id);
                $("#distance-modal").dialog({
                    width: 600,
                    height: 250,
                    modal: true
                });
                $("#distance-modal").show();
                //車距資料
                var data_left_distance = document.getElementById("data-left-distance");
                var data_right_distance = document.getElementById("data-right-distance");
                var data_back_distance = document.getElementById("data-back-distance");
                var left_distance = data[e["path"][4].id][e["path"][1].className]["distance_stat"][0].avg_distance;
                var right_distance = data[e["path"][4].id][e["path"][1].className]["distance_stat"][1].avg_distance;
                var back_distance = data[e["path"][4].id][e["path"][1].className]["distance_stat"][2].avg_distance;
                data_left_distance.innerHTML = left_distance + " mm";
                data_right_distance.innerHTML = right_distance + " mm";
                data_back_distance.innerHTML = back_distance + " mm";

                //左方車距違規有資料
                if (data[e["path"][4].id][e["path"][1].className]["distance_stat"][0].distance_violation != null) {

                    console.log("have data");

                    var dialog_1 = document.querySelector("#distance-modal div#violation_1");
                    var count = 1;

                    if (document.querySelector('table#violation1_' + String(e["path"][4].id) + '.' + e["path"][1].className) == null) { //避免重複修改 html 導致錯誤
                        console.log(document.querySelector('table#violation1_' + String(e["path"][4].id) + '.' + e["path"][1].className));
                        dialog_1.innerHTML = `<table id="violation1_` + String(e["path"][4].id) + `" class="` + e["path"][1].className + `" style="border: 1px solid black;"><p style="margin-top: 20px;">左方車距違規資訊:</p><tr style="border: 1px solid black;"><th style="border: 1px solid black;">違規編號</th><th style="border: 1px solid black;">違規車距差</th></tr></table>`;
                        data[e["path"][4].id][e["path"][1].className]["distance_stat"][0].distance_violation.forEach(element => {
                            console.log(element);
                            var violation_row = document.querySelector('table#violation1_' + String(e["path"][4].id) + '.' + e["path"][1].className);
                            violation_row.innerHTML += '<tr style="border: 1px solid black;"><td style="border: 1px solid black;" id="data-left-distance">' + count + '</td><td style="border: 1px solid black;" id="data-right-distance">' + element + ' mm</td></tr>';
                            count += 1;
                        });
                    }


                }
                //左方車距違規沒資料
                if (data[e["path"][4].id][e["path"][1].className]["distance_stat"][0].distance_violation == null) {
                    var dialog_1 = document.querySelector("#distance-modal div#violation_1");
                    dialog_1.innerHTML = "";
                }

                //右方車距違規有資料
                if (data[e["path"][4].id][e["path"][1].className]["distance_stat"][1].distance_violation != null) {

                    console.log("have data");

                    var dialog_2 = document.querySelector("#distance-modal div#violation_2");
                    var count = 1;

                    if (document.querySelector('table#violation2_' + String(e["path"][4].id) + '.' + e["path"][1].className) == null) { //避免重複修改 html 導致錯誤
                        console.log(document.querySelector('table#violation2_' + String(e["path"][4].id) + '.' + e["path"][1].className));
                        dialog_2.innerHTML = `<table id="violation2_` + String(e["path"][4].id) + `" class="` + e["path"][1].className + `" style="border: 1px solid black;"><p style="margin-top: 20px;">右方車距違規資訊:</p><tr style="border: 1px solid black;"><th style="border: 1px solid black;">違規編號</th><th style="border: 1px solid black;">違規車距差</th></tr></table>`;
                        data[e["path"][4].id][e["path"][1].className]["distance_stat"][1].distance_violation.forEach(element => {
                            console.log(element);
                            var violation_row = document.querySelector('table#violation2_' + String(e["path"][4].id) + '.' + e["path"][1].className);
                            violation_row.innerHTML += '<tr style="border: 1px solid black;"><td style="border: 1px solid black;" id="data-left-distance">' + count + '</td><td style="border: 1px solid black;" id="data-right-distance">' + element + ' mm</td></tr>';
                            count += 1;
                        });
                    }


                }
                //右方車距違規沒資料
                if (data[e["path"][4].id][e["path"][1].className]["distance_stat"][1].distance_violation == null) {
                    var dialog_2 = document.querySelector("#distance-modal div#violation_2");
                    dialog_2.innerHTML = "";
                }

                //後方車距違規有資料
                if (data[e["path"][4].id][e["path"][1].className]["distance_stat"][2].distance_violation != null) {

                    console.log("have data");

                    var dialog_3 = document.querySelector("#distance-modal div#violation_3");
                    var count = 1;

                    if (document.querySelector('table#violation3_' + String(e["path"][4].id) + '.' + e["path"][1].className) == null) { //避免重複修改 html 導致錯誤
                        console.log(document.querySelector('table#violation3_' + String(e["path"][4].id) + '.' + e["path"][1].className));
                        dialog_3.innerHTML = `<table id="violation3_` + String(e["path"][4].id) + `" class="` + e["path"][1].className + `" style="border: 1px solid black;"><p style="margin-top: 20px;">後方車距違規資訊:</p><tr style="border: 1px solid black;"><th style="border: 1px solid black;">違規編號</th><th style="border: 1px solid black;">違規車距差</th></tr></table>`;
                        data[e["path"][4].id][e["path"][1].className]["distance_stat"][2].distance_violation.forEach(element => {
                            console.log(element);
                            var violation_row = document.querySelector('table#violation3_' + String(e["path"][4].id) + '.' + e["path"][1].className);
                            violation_row.innerHTML += '<tr style="border: 1px solid black;"><td style="border: 1px solid black;" id="data-left-distance">' + count + '</td><td style="border: 1px solid black;" id="data-right-distance">' + element + ' mm</td></tr>';
                            count += 1;
                        });
                    }


                }
                //後方車距違規沒資料
                if (data[e["path"][4].id][e["path"][1].className]["distance_stat"][2].distance_violation == null) {
                    var dialog_3 = document.querySelector("#distance-modal div#violation_3");
                    dialog_3.innerHTML = "";
                }


            });


        }
    }


    //var user_data = data.chock_test_4;
    //console.log(user_data.end_time);
    /*data_name.innerHTML = 'chock_test_4';
    data_start_time.innerHTML = new Date(user_data.start_time*1000);
    data_end_time.innerHTML = new Date(user_data.end_time*1000);
    data_journey_time.innerHTML = user_data.journey_time+'s';*/

});


/*$(function() {
$( "#openDialog").on("click", function(){ 
    $( "#dialog-modal" ).dialog({
      height: 300,
      width: 400,
      modal: true
    });
    $( "#dialog-modal" ).show();
    //建立 Firebase 中的 database 功能
    var db = firebase.database();
    db.ref("/").once('value', function (snapshot) {
        //var size = Object.keys(data).length;
        var data = snapshot.val(); 
        console.log(data.chock_test_4.distance_stat);
        //車距資料
        var data_left_distance = document.getElementById('data-left-distance');
        var data_right_distance = document.getElementById('data-right-distance');
        var data_back_distance = document.getElementById('data-back-distance');  
        var user_distance_data = data.chock_test_4.distance_stat;
        //修改車距表格資料
        data_left_distance.innerHTML = data.chock_test_4.distance_stat[0].avg_distance+" mm";
        data_right_distance.innerHTML = data.chock_test_4.distance_stat[1].avg_distance+" mm";
        data_back_distance.innerHTML = data.chock_test_4.distance_stat[2].avg_distance+" mm";
        if(data.chock_test_4.distance_stat[0].distance_violation != null){
            var dialog = document.getElementById("dialog-modal");
            var count = 1;
            if(document.getElementById('violation1 chock_test_4') == null){ //避免重複修改 html 導致錯誤
                dialog.innerHTML += '<table id="violation1 chock_test_4" style="border: 1px solid black;"><p style="margin-top: 20px;">右方車距違規資訊:</p><tr style="border: 1px solid black;"><th style="border: 1px solid black;">違規編號</th><th style="border: 1px solid black;">違規車距差</th></tr></table>';
                data.chock_test_4.distance_stat[0].distance_violation.forEach(element => {
                    console.log(element);
                    var violation_row = document.getElementById('violation2 chock_test_4');
                    violation_row.innerHTML += '<tr style="border: 1px solid black;"><td style="border: 1px solid black;" id="data-left-distance">'+count+'</td><td style="border: 1px solid black;" id="data-right-distance">'+element+' mm</td></tr>';
                    count += 1;
                });
            }
        }
        if(data.chock_test_4.distance_stat[1].distance_violation != null){
            var dialog = document.getElementById("dialog-modal");
            var count = 1;
            if(document.getElementById('violation2 chock_test_4') == null){ //避免重複修改 html 導致錯誤
                dialog.innerHTML += '<table id="violation2 chock_test_4" style="border: 1px solid black;"><p style="margin-top: 20px;">右方車距違規資訊:</p><tr style="border: 1px solid black;"><th style="border: 1px solid black;">違規編號</th><th style="border: 1px solid black;">違規車距差</th></tr></table>';
                data.chock_test_4.distance_stat[1].distance_violation.forEach(element => {
                    console.log(element);
                    var violation_row = document.getElementById('violation2 chock_test_4');
                    violation_row.innerHTML += '<tr style="border: 1px solid black;"><td style="border: 1px solid black;" id="data-left-distance">'+count+'</td><td style="border: 1px solid black;" id="data-right-distance">'+element+' mm</td></tr>';
                    count += 1;
                });
            }
        }
        if(data.chock_test_4.distance_stat[2].distance_violation != null){
            var dialog = document.getElementById("dialog-modal");
            var count = 1;
            if(document.getElementById('violation3 chock_test_4') == null){ //避免重複修改 html 導致錯誤
                dialog.innerHTML += '<table id="violation3 chock_test_4" style="border: 1px solid black;"><p style="margin-top: 20px;">後方車距違規資訊:</p><tr style="border: 1px solid black;"><th style="border: 1px solid black;">違規編號</th><th style="border: 1px solid black;">違規車距差</th></tr></table>';
                data.chock_test_4.distance_stat[2].distance_violation.forEach(element => {
                    console.log(element);
                    var violation_row = document.getElementById('violation3 chock_test_4');
                    violation_row.innerHTML += '<tr style="border: 1px solid black;"><td style="border: 1px solid black;" id="data-left-distance">'+count+'</td><td style="border: 1px solid black;" id="data-right-distance">'+element+' mm</td></tr>';
                    count += 1;
                });
            }     
        }
    });
});
});*/