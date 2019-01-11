
let interceptStr = str => {
    return str ? str.length > 20
                    ? str.slice(0,20) + '...'
                    : str
               : '--';
}

let operStrNull = str => {
     return str ? str : '--';
}


let timestampToTime = (timestamp) => {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y+M+D+h+m+s;
}

let userType = (val) => {
     var obj = {
          0:'超级用户',
          1:'常规用户'
     }
     return obj[val]
}



export { interceptStr,  timestampToTime, userType, operStrNull }