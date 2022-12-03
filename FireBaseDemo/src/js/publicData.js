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

//calculate sum
const sum = arr => arr.reduce((p, c) => p + c, 0);

//calculate average
const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

//pattern color
var color1 = ['#FF0000', '#F97600', '#F6C600', '#60B044']; // big is good
var color2 = ['#60B044', '#F6C600', '#F97600', '#FF0000']; // small is good

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
var score_fail = [];
var score_pass = [];

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

    score.forEach(element => {
        if (element >= 60) {
            score_pass.push(element);
        } else (score_fail.push(element));
    });

    console.log(Math.min(...score));
    console.log(Math.max(...score));

    donutChart("#chart", '速度違規', sum(speed_v), '加速度違規', sum(acc_v), '車距違規', sum(left_v) + sum(right_v) + sum(back_v), "各類違規");
    donutChart("#chart2", '左方車距違規', sum(left_v), '右方車距違規', sum(right_v), '後方車距違規', sum(back_v), "車距違規");
    donutChart_safety("#chart3", "安全分數高於60分", score_pass.length, "安全分數低於60分", score_fail.length, "安全分數");
    gauge_chart("#chart4", "平均速度", average(speed_avg).toFixed(0), Math.min(...speed_avg).toFixed(0), Math.max(...speed_avg).toFixed(0), " km/hr",color2);
    gauge_chart("#chart5", "平均加速度", average(acc_avg_g).toFixed(2), Math.min(...acc_avg_g).toFixed(2), Math.max(...acc_avg_g).toFixed(2), " m/s\u00B2",color2);
    gauge_chart("#chart6", "平均角加速度", average(gyro_avg).toFixed(2), Math.min(...gyro_avg).toFixed(2), Math.max(...gyro_avg).toFixed(2), "\u00B0/s\u00B2",color2);
    gauge_chart("#chart7", "平均左方車距", average(left_avg).toFixed(0), Math.min(...left_avg).toFixed(0), Math.max(...left_avg).toFixed(0), " mm",color1);
    gauge_chart("#chart8", "平均右方車距", average(right_avg).toFixed(0), Math.min(...right_avg).toFixed(0), Math.max(...right_avg).toFixed(0), " mm",color1);
    gauge_chart("#chart9", "平均後方車距", average(back_avg).toFixed(0), Math.min(...back_avg).toFixed(0), Math.max(...back_avg).toFixed(0), " mm",color1);
    gauge_chart("#chart10", "平均安全分數", average(score).toFixed(0), Math.min(...score).toFixed(0), Math.max(...score).toFixed(0), " 分",color1);
    $(".loader-wrapper").fadeOut("slow");
},error => (console.log(error)));

//違規 donut chart
function donutChart(bindto, vio1_t, vio1, vio2_t, vio2, vio3_t, vio3, title) {
    var chart = c3.generate({
        bindto: bindto,
        data: {
            columns: [
                [vio1_t, vio1],
                [vio2_t, vio2],
                [vio3_t, vio3]
            ],
            type: 'donut'
        },
        donut: {
            title: title
        },
        size: {
            height: 320
        }
    });
}

function donutChart_safety(bindto, score1_t, score1, score2_t, score2, title) {
    var chart = c3.generate({
        bindto: bindto,
        data: {
            columns: [
                [score1_t, score1],
                [score2_t, score2]
            ],
            type: 'donut'
        },
        donut: {
            title: title
        },
        size: {
            height: 320
        }
    });
}

function gauge_chart(bindto, data_t, data, min, max, unit,color) {
    var chart = c3.generate({
        bindto: bindto,
        data: {
            columns: [
                [data_t, data]
            ],
            type: 'gauge',
        },
        gauge: {
            label: {
                format: function (value, ratio) {
                    return value + unit; //returning here the value and not the ratio
                },
            },
            min: min,
            max: max,
        },
        color: {
            pattern: color, // the three color levels for the percentage values.
            threshold: {
                //            unit: 'value', // percentage is default
                //            max: 200, // 100 is default
                values: [max*0.5, max*0.7, max*0.8, max]
            }
        },
        size: {
            height: 200
        }
    });
}



