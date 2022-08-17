// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Import additional function
import { switchChart, hideAllGraph, isNumeric, showdate, getCookie } from "./common_function.js";

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


//different kind of open data
var speed_avg = [];
var speed_v = [];
var acc_avg = [];
var acc_avg_g = [];
var acc_v = [];
var gyro_avg = [];
var left_avg = [];
var left_v = [];
var right_avg = [];
var right_v = [];
var back_avg = [];
var back_v = [];
var journey_time = [];
var score = [];

//建立 Firebase 中的 database 功能
var db = firebase.database();
db.ref("/OpenData/").once('value', function (snapshot) {
    //var size = Object.keys(data).length; 資料庫 key 的長度取得
    var data = snapshot.val(); //讀出資料庫的使用者資料
    console.log(data);

    //var size = Object.keys(data).length; 資料庫 key 的長度取得
    var data = snapshot.val(); //讀出資料庫的使用者資料
    console.log(Object.keys(data));

    //load different kind of data
    speed_avg = data['speed_avg'];
    speed_v = data['speed_v'];
    acc_avg = data['acc_avg'];

    acc_avg.forEach(element => {
        element = element * 9.8;
        acc_avg_g.push(element);
    });

    acc_v = data['acc_v'];
    gyro_avg = data['gyro_avg'];
    left_avg = data['left_avg'];
    left_v = data['left_v'];
    right_avg = data['right_avg'];
    right_v = data['right_v'];
    back_avg = data['back_avg'];
    back_v = data['back_v'];
    journey_time = data['journey_time'];
    score = data['score'];
    
    ddd()
});

//違規 donut chart
function ddd(bindto = '#chart') {
    var chart = c3.generate({
        bindto: bindto,
        data: {
            columns: [
                ['速度違規', speed_v.length],
                ['加速度違規', acc_v.length],
                ['車距違規', left_v.length+right_v.length+back_v.length]
            ],
            type: 'donut'
        },
        donut: {
            title: "違規比例"
        }
    });
}



