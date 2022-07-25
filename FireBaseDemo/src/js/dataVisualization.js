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

//目前在的圖表頁數
var CurrentPage = 0;
var TotalPage = 0;

/*===============判斷是否可以轉換成數字=================*/

function isNumeric(num) {
    return !isNaN(num)
}

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
    return year + '年' + month + '月' + day + '日 ' + hour + ':' + min;
}

//存放 journey 結束的時間點
var dates = []

//store journey data key 
var journey_keys = []

//store average speed
var avg_speed = []

//dates.push('times');
//avg_speed.push('平均速度');

//折線圖通用 function
function chartGraph(CurrentPage) {
    var current_avg_speed = avg_speed.slice(0, 1);
    if (CurrentPage + 1 < TotalPage) {
        var from = Number(CurrentPage * 10) + Number(1);
        var end = (CurrentPage * 10) + 11;
        current_avg_speed = current_avg_speed.concat(avg_speed.slice(from, end));
    } else {
        var from = Number(CurrentPage * 10) + Number(1);
        var end = avg_speed.length;
        current_avg_speed = current_avg_speed.concat(avg_speed.slice(from,end));
    }


    console.log(current_avg_speed);
    console.log(CurrentPage);
    console.log("length: " + current_avg_speed.length);
    //var from = Number(CurrentPage * 10) + Number(1);
    //var end = (CurrentPage * 10) + 11 - 1
    console.log("start: " + from + " end: " + end);
    
    var chart = c3.generate({
        bindto: '#chart',
        data: {
            type: "line",
            columns: [
                current_avg_speed
            ]
        },
        axis: {
            x: {
                type: 'category',
                categories: dates.slice(from-1, end-1),
                label: {
                    text: '時間'
                },
                tick: {
                    fit: true
                }
            },
            y: {
                label: {
                    text: '速度: km / hr',
                    position: 'outer-middle',
                }

            }
        },
        size: {
            height: avg_speed.length * 15, //調整圖表高度
            width: 1024
        },
        padding: {
            bottom: 10 //adjust chart padding bottom
        }
    });
}

db.ref("/Users/Ar3W9RW0eCbDhEUqCWNQjJdrJcA3/journey").once('value', function (snapshot) {
    //var size = Object.keys(data).length; 資料庫 key 的長度取得
    var data = snapshot.val(); //讀出資料庫的使用者資料
    console.log(data);
    Object.keys(data).forEach(element => {
        if (isNumeric(element)) {
            journey_keys.push(element);
        }
    });
    for (var i = 0; i < journey_keys.length; i++) {
        dates.push(showdate(new Date(data[journey_keys[i]].end_time * 1000)));
        avg_speed.push((data[journey_keys[i]]['speed_stat']['avg_speed'] * 100 / 100).toFixed(2));
    }
    avg_speed.push('平均速度');
    dates = dates.reverse();
    avg_speed = avg_speed.reverse();
    TotalPage = Math.round(avg_speed.length / 10);
    chartGraph(CurrentPage);
    console.log("avg_speed length: " + avg_speed.length)
    console.log("Total Page: " + Math.round(avg_speed.length / 10))

    var nextBtn = document.querySelector('.nextBtn');
    nextBtn.addEventListener('click', e => {
        if (CurrentPage + 1 < TotalPage) {
            CurrentPage += 1;
        }
        console.log(CurrentPage);
        chartGraph(CurrentPage);
    });

});

console.log(new Date(1658767445000));
