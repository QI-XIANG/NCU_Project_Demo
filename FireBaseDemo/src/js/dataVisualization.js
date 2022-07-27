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
var dates = [];

//store journey data key 
var journey_keys = [];

//store average speed
var avg_speed = [];

//store avg acceleration
var avg_acceleration = [];

//store avg distance 
var avg_left_distance = [];
var avg_right_distance = [];
var avg_back_distance = [];

//store different kind of violation
var accel_vio_count = []; // accelertaion violation count
var speed_vio_count = []; // speed violation count
var LD_vio_count = []; // left distance violation
var RD_vio_count = []; // right distance violation
var BD_vio_count = []; // back distance violation

//折線圖通用 function (速度、加速度適用)
function chartGraph(CurrentPage, OriginalData, bindElement, unitText, formatT) {
    var current_data = OriginalData.slice(0, 1);
    if (CurrentPage + 1 < TotalPage) {
        var from = Number(CurrentPage * 10) + Number(1);
        var end = (CurrentPage * 10) + 11;
        current_data = current_data.concat(OriginalData.slice(from, end));
    } else {
        var from = Number(CurrentPage * 10) + Number(1);
        var end = OriginalData.length;
        current_data = current_data.concat(OriginalData.slice(from, end));
    }


    //console.log(current_data);
    //console.log(CurrentPage);
    //console.log("length: " + current_data.length);
    //var from = Number(CurrentPage * 10) + Number(1);
    //var end = (CurrentPage * 10) + 11 - 1
    //console.log("start: " + from + " end: " + end);

    var chart = c3.generate({
        bindto: bindElement,
        data: {
            type: "line",
            columns: [
                current_data
            ]
        },
        axis: {
            x: {
                type: 'category',
                categories: dates.slice(from - 1, end - 1),
                label: {
                    text: '時間'
                },
                tick: {
                    fit: true
                }
            },
            y: {
                label: {
                    text: unitText,
                    position: 'outer-middle',
                },
                min: 0,
                tick: {
                    count: 5,
                    format: d3.format(formatT)
                },
                padding: {
                    bottom: 0
                }
            }
        },
        size: {
            height: 450, //調整圖表高度
            width: 1024
        },
        padding: {
            bottom: 15 //adjust chart padding bottom
        }
    });
}

//折線圖 function (車距適用)
function chartGraph_special(CurrentPage) {
    var current_left_distance = avg_left_distance.slice(0, 1);
    var current_right_distance = avg_right_distance.slice(0, 1);
    var current_back_distance = avg_back_distance.slice(0, 1);
    if (CurrentPage + 1 < TotalPage) {
        var from = Number(CurrentPage * 10) + Number(1);
        var end = (CurrentPage * 10) + 11;
    } else {
        var from = Number(CurrentPage * 10) + Number(1);
        var end = avg_left_distance.length;
    }

    current_left_distance = current_left_distance.concat(avg_left_distance.slice(from, end));
    current_right_distance = current_right_distance.concat(avg_right_distance.slice(from, end));
    current_back_distance = current_back_distance.concat(avg_back_distance.slice(from, end));

    //console.log(current_data);
    //console.log(CurrentPage);
    //console.log("length: " + current_data.length);
    //var from = Number(CurrentPage * 10) + Number(1);
    //var end = (CurrentPage * 10) + 11 - 1
    //console.log("start: " + from + " end: " + end);

    var chart = c3.generate({
        bindto: '#chart3',
        data: {
            type: "line",
            columns: [
                current_left_distance, current_back_distance, current_right_distance
            ]
        },
        axis: {
            x: {
                type: 'category',
                categories: dates.slice(from - 1, end - 1),
                label: {
                    text: '時間'
                },
                tick: {
                    fit: true
                }
            },
            y: {
                label: {
                    text: '我是單位',
                    position: 'outer-middle',
                },
                tick: {
                    count: 10,
                    format: function (d) {
                        return parseInt(d);
                    }
                },
                padding: {
                    bottom: 0
                },
                min: 0
            }
        },
        size: {
            height: 450, //調整圖表高度
            width: 1024
        },
        padding: {
            bottom: 15, //adjust chart padding bottom

        }
    });
}

//長條圖通用 function (速度、加速度違規適用)
function bar_chartGraph(CurrentPage, OriginalData, bindElement) {
    var current_data = OriginalData.slice(0, 1);

    if (CurrentPage + 1 < TotalPage) {
        var from = Number(CurrentPage * 10) + Number(1);
        var end = (CurrentPage * 10) + 11;
    } else {
        var from = Number(CurrentPage * 10) + Number(1);
        var end = OriginalData.length;
    }

    current_data = current_data.concat(OriginalData.slice(from, end));

    var chart = c3.generate({
        bindto: bindElement,
        data: {
            type: "bar",
            columns: [
                current_data
            ]
        },
        bar: {
            width: {
                ratio: 0.5 // this makes bar width 50% of length between ticks
            } // width: 100 // this makes bar width 100px
        },
        axis: {
            x: {
                type: 'category',
                categories: dates.slice(from - 1, end - 1),
                label: {
                    text: '時間'
                },
                tick: {
                    fit: true
                }
            },
            y: {
                label: {
                    text: '我是單位',
                    position: 'outer-middle',
                }
            }
        },
        size: {
            height: 450, //調整圖表高度
            width: 1024
        },
        padding: {
            bottom: 15, //adjust chart padding bottom
        }
    });
}

//長條圖通用 function (速度、加速度適用)
function bar_chartGraph_special(CurrentPage) {
    var current_LD_vio_count = LD_vio_count.slice(0, 1);
    var current_RD_vio_count = RD_vio_count.slice(0, 1);
    var current_BD_vio_count = BD_vio_count.slice(0, 1);

    if (CurrentPage + 1 < TotalPage) {
        var from = Number(CurrentPage * 10) + Number(1);
        var end = (CurrentPage * 10) + 11;
    } else {
        var from = Number(CurrentPage * 10) + Number(1);
        var end = avg_left_distance.length;
    }

    current_LD_vio_count = current_LD_vio_count.concat(LD_vio_count.slice(from, end));
    current_RD_vio_count = current_RD_vio_count.concat(RD_vio_count.slice(from, end));
    current_BD_vio_count = current_BD_vio_count.concat(BD_vio_count.slice(from, end));

    var chart = c3.generate({
        bindto: '#chart6',
        data: {
            type: "bar",
            columns: [
                current_LD_vio_count,
                current_RD_vio_count,
                current_BD_vio_count
            ],
            groups: [
                ['車距違規(左)', '車距違規(右)', '車距違規(後)']
            ]
        },
        axis: {
            x: {
                type: 'category',
                categories: dates.slice(from - 1, end - 1),
                label: {
                    text: '時間'
                },
                tick: {
                    fit: true
                }
            },
            y: {
                label: {
                    text: '我是單位',
                    position: 'outer-middle',
                },
            }
        },
        size: {
            height: 450, //調整圖表高度
            width: 1024
        },
        padding: {
            bottom: 15, //adjust chart padding bottom

        }
    });
}

db.ref("/Users/ZlRfQF2N6TYTU8s7SJ5ielsyd6G3/journey").once('value', function (snapshot) {
    //var size = Object.keys(data).length; 資料庫 key 的長度取得
    var data = snapshot.val(); //讀出資料庫的使用者資料
    //console.log(data);
    Object.keys(data).forEach(element => {
        if (isNumeric(element)) {
            journey_keys.push(element);
        }
    });
    for (var i = 0; i < journey_keys.length; i++) {

        dates.push(showdate(new Date(data[journey_keys[i]].end_time * 1000)));

        avg_speed.push((data[journey_keys[i]]['speed_stat']['avg_speed'] * 100 / 100).toFixed(2));

        avg_acceleration.push((data[journey_keys[i]]['acceleration_stat'][0]['avg_acceleration'] * 100 / 100).toFixed(2));

        avg_left_distance.push(data[journey_keys[i]]['distance_stat'][0]['avg_distance']);
        avg_right_distance.push(data[journey_keys[i]]['distance_stat'][1]['avg_distance']);
        avg_back_distance.push(data[journey_keys[i]]['distance_stat'][2]['avg_distance']);

        //accceleration violation
        if (data[journey_keys[i]]['acceleration_stat'][0].acceleration_violation != null) {
            accel_vio_count.push(Object.keys(data[journey_keys[i]]['acceleration_stat'][0].acceleration_violation).length);
        }
        if (data[journey_keys[i]]['acceleration_stat'][0].acceleration_violation == null) {
            accel_vio_count.push(0);
        }

        //speed violation
        if (data[journey_keys[i]]['speed_stat'].speed_violation != null) {
            speed_vio_count.push(Object.keys(data[journey_keys[i]]['speed_stat'].speed_violation).length);
        }
        if (data[journey_keys[i]]['speed_stat'].speed_violation == null) {
            speed_vio_count.push(0);
        }

        //distance violation
        if (data[journey_keys[i]]['distance_stat'][0].distance_violation != null) {
            LD_vio_count.push(Object.keys(data[journey_keys[i]]['distance_stat'][0].distance_violation).length);
        }
        if (data[journey_keys[i]]['distance_stat'][0].distance_violation == null) {
            LD_vio_count.push(0);
        }
        if (data[journey_keys[i]]['distance_stat'][1].distance_violation != null) {
            RD_vio_count.push(Object.keys(data[journey_keys[i]]['distance_stat'][1].distance_violation).length);
        }
        if (data[journey_keys[i]]['distance_stat'][1].distance_violation == null) {
            RD_vio_count.push(0);
        }
        if (data[journey_keys[i]]['distance_stat'][2].distance_violation != null) {
            BD_vio_count.push(Object.keys(data[journey_keys[i]]['distance_stat'][2].distance_violation).length);
        }
        if (data[journey_keys[i]]['distance_stat'][2].distance_violation == null) {
            BD_vio_count.push(0);
        }

    }

    //console.log(speed_vio_count);

    avg_speed.push('平均速度');
    avg_acceleration.push('平均加速度');
    avg_left_distance.push('平均車距(左)');
    avg_right_distance.push('平均車距(右)');
    avg_back_distance.push('平均車距(後)');
    accel_vio_count.push('加速度違規次數');
    speed_vio_count.push('速度違規次數');
    LD_vio_count.push('車距違規(左)');
    RD_vio_count.push('車距違規(右)');
    BD_vio_count.push('車距違規(後)');

    dates = dates.reverse();

    avg_acceleration.reverse();
    avg_speed = avg_speed.reverse();
    avg_left_distance = avg_left_distance.reverse();
    avg_right_distance = avg_right_distance.reverse();
    avg_back_distance = avg_back_distance.reverse();
    accel_vio_count = accel_vio_count.reverse();
    speed_vio_count = speed_vio_count.reverse();
    LD_vio_count = LD_vio_count.reverse();
    RD_vio_count = RD_vio_count.reverse();
    BD_vio_count = BD_vio_count.reverse();

    TotalPage = Math.round(avg_speed.length / 10);



    //console.log("avg_speed length: " + avg_speed.length);
    //console.log("Total Page: " + Math.round(avg_speed.length / 10));
    //console.log(avg_left_distance);

    var nextBtn = document.querySelector('.nextBtn');
    nextBtn.addEventListener('click', e => {
        if (CurrentPage + 1 < TotalPage) {
            CurrentPage += 1;
        }
        //console.log(CurrentPage);
        chartGraph(CurrentPage, avg_speed, '#chart', '我是單位', '.2f');
        chartGraph(CurrentPage, avg_acceleration, '#chart2', '我是單位', '.3f');
        chartGraph_special(CurrentPage);
        bar_chartGraph(CurrentPage, accel_vio_count, '#chart4');
        bar_chartGraph(CurrentPage, speed_vio_count, '#chart5');
        bar_chartGraph_special(CurrentPage);
    });

    var lastBtn = document.querySelector('.lastBtn');
    lastBtn.addEventListener('click', e => {
        if (CurrentPage - 1 >= 0) {
            CurrentPage -= 1;
        }
        //console.log(CurrentPage);
        chartGraph(CurrentPage, avg_speed, '#chart', '我是單位', '.2f');
        chartGraph(CurrentPage, avg_acceleration, '#chart2', '我是單位', '.3f');
        chartGraph_special(CurrentPage);
        bar_chartGraph(CurrentPage, accel_vio_count, '#chart4');
        bar_chartGraph(CurrentPage, speed_vio_count, '#chart5');
        bar_chartGraph_special(CurrentPage);
    });

    chartGraph(CurrentPage, avg_speed, '#chart', '我是單位', '.2f');
    chartGraph(CurrentPage, avg_acceleration, '#chart2', '我是單位', '.3f');
    chartGraph_special(CurrentPage);
    bar_chartGraph(CurrentPage, accel_vio_count, '#chart4');
    bar_chartGraph(CurrentPage, speed_vio_count, '#chart5');
    bar_chartGraph_special(CurrentPage);
});

//console.log(new Date(1658767445000));
