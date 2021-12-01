/*
 * @Author: luoxi
 * @Date: 2021-12-01 22:21:23
 * @LastEditTime: 2021-12-01 22:28:33
 * @LastEditors: Please set LastEditors
 * @Description: 柯里化，用户固定某个函数的前面的参数，得到一个新的函数，新的函数调用时，接收剩余的参数
 */

function cal(a, b, c, d) {
    return a + b * c - d;
}
//curry
function curry(func, ...args) {
    return function(...subArgs) {
        const allArgs = [...args, ...subArgs];
        if (allArgs.length >= func.length) {
            //参数够了
            return func(...allArgs);
        } else {
            //参数不够，继续固定
            return curry(func, ...allArgs);
        }
    }
}

const newCal = curry(cal, 1, 2)

console.log(newCal(3, 4)) // 1+2*3-4
console.log(newCal(4, 5)) // 1+2*4-5
console.log(newCal(5, 6)) // 1+2*5-6
console.log(newCal(6, 7)) // 1+2*6-7

const newCal2 = newCal(8)

console.log(newCal2(9)); // 1+2*8-9