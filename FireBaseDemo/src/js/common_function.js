export function switchChart() {
    //console.log(document.querySelectorAll('.graph-dropdown-menu .graph-dropdown-item'));
    document.querySelectorAll('.graph-dropdown-menu .graph-dropdown-item').forEach(element => {
        element.addEventListener('click', e => {
            //console.log(e.target.id);
            document.querySelector('.dropdown .graph-dropdown-toggle').innerHTML = element.innerHTML;
            hideAllGraph();
            showSpecificGraph(e.target.id);
            //console.log(element.innerHTML)
        })
    });
}

export function hideAllGraph() {
    document.querySelector('#avg_speed_graph_dropdown div').style.display = 'none';
    document.querySelector('#avg_acceleration_graph_dropdown div').style.display = 'none';
    document.querySelector('#safety_score_graph_dropdown div').style.display = 'none';
    document.querySelector('#avg_distance_graph_dropdown div').style.display = 'none';
    document.querySelector('#avg_speed_vio_count_graph_dropdown div').style.display = 'none';
    document.querySelector('#avg_acceleration_vio_count_graph_dropdown div').style.display = 'none';
    document.querySelector('#avg_distance_vio_count_graph_dropdown div').style.display = 'none';
}

export function showSpecificGraph(graph_id) {
    $('#' + String(graph_id).replace("_dropdown", "") + '_graph_dropdown #chart').fadeIn(500);
}

//判斷是否可以轉換成數字
export function isNumeric(num) {
    return !isNaN(num)
}

export function showdate(now) {
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
    return year + '年' + month + '月' + day + '日 ' + ' ' + hour + ':' + min;
}

// Reference: https://stackoverflow.com/questions/10730362/get-cookie-by-name
export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

//刪除cookie
export function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1); //強制讓 cookie 過期
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}