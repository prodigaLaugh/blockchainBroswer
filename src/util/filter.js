
let interceptStr = str => { //超过20个字符 截取
    return str ? str.length > 20
                    ? str.slice(0,20) + '...'
                    : str
               : '--';
}

let interceptStr1 = str => {//超过40个字符 截取
    return str ? str.length > 40
                    ? str.slice(0,40) + '...'
                    : str
               : '--';
}
let interceptStr2 = str => {//超过30个字符 截取
    return str ? str.length > 30
                    ? str.slice(0,30) + '...'
                    : str
               : '--';
}

let operStrNull = str => { //空字符处理
     return str ? str : '--';
}





export { 
	interceptStr, 
	interceptStr1,
	interceptStr2,
	operStrNull 
}