

let moneySeparate = value => {
    value = value + ''
    var newValue = '';

    let newArr = value.split('.');
    let arr = [...newArr[0]].reverse();
    let arr1 = newArr[1] ? ('.' + newArr[1]) : '';

    arr.map((item,i) => {
        newValue += item + (i % 3 === 2 && i !== (arr.length - 1) ? ',' : '');
    })
    newValue = newValue.split('').reverse().join('')  + arr1;
    return newValue;
    
}

let interceptStr = str => {
    return str ? str.length > 20
                    ? str.slice(0,20) + '...'
                    : str
               : '--';
}

let interceptStr1 = str => {
    return str ? str.length > 40
                    ? str.slice(0,40) + '...'
                    : str
               : '--';
}
let interceptStr2 = str => {
    return str ? str.length > 30
                    ? str.slice(0,30) + '...'
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



export { 
	moneySeparate,
	interceptStr, 
	interceptStr1,
	interceptStr2,
	timestampToTime, 
	userType, 
	operStrNull 
}