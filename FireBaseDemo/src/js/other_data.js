// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
firebase.initializeApp(firebaseConfig,"other_data");

//建立 Firebase 中的 database 功能
var db = firebase.database();

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

//different kind of html data element
var other_avg_speed = document.getElementById("other_avg_speed");
var other_avg_accel = document.getElementById("other_avg_accel");
var other_avg_gyro = document.getElementById("other_avg_gyro");
var other_avg_LD = document.getElementById("other_avg_LD");
var other_avg_RD = document.getElementById("other_avg_RD");
var other_avg_BD = document.getElementById("other_avg_BD");
var other_avg_speed_count = document.getElementById("other_avg_speed_count");
var other_avg_accel_count = document.getElementById("other_avg_accel_count");
var other_avg_LD_count = document.getElementById("other_avg_LD_count");
var other_avg_RD_count = document.getElementById("other_avg_RD_count");
var other_avg_BD_count = document.getElementById("other_avg_BD_count");
var other_journey_time = document.getElementById("other_journey_time");
var other_safety_score = document.getElementById("other_safety_score");

//calculate average
const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

db.ref("/OpenData/").once('value', function (snapshot) {
    
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

    //edit innerHTML
    other_avg_speed.innerHTML = average(speed_avg).toFixed(2) + " km/hr"
    other_avg_accel.innerHTML = average(acc_avg_g).toFixed(2) + " m/s&#178;"
    other_avg_gyro.innerHTML = average(gyro_avg).toFixed(2) + "&#176;/s&#178;"
    other_avg_LD.innerHTML = average(left_avg).toFixed(2) + " mm";
    other_avg_RD.innerHTML = average(right_avg).toFixed(2) + " mm";
    other_avg_BD.innerHTML = average(back_avg).toFixed(2) + " mm";
    other_avg_LD_count.innerHTML = average(left_v).toFixed(2) + " 次";
    other_avg_RD_count.innerHTML = average(right_v).toFixed(2) + " 次";
    other_avg_BD_count.innerHTML = average(back_v).toFixed(2) + " 次";
    other_avg_speed_count.innerHTML = average(speed_v).toFixed(2) + " 次";
    other_avg_accel_count.innerHTML = average(acc_v).toFixed(2) + " 次";
    other_journey_time.innerHTML = average(journey_time).toFixed(2) + " 秒"
    other_safety_score.innerHTML = average(score).toFixed(2) + " 分"
});