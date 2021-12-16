/*
 * @Author: your name
 * @LastEditTime: 2021-12-16 22:51:02
 * @LastEditors: your name
 * @Description: 利用delay函数等待一秒之后输出
 */


/**
 * @description: 延迟一段指定的时间
 * @param {*number} duration
 * @return {*Promise} 返回一个任务，该任务在指定时间后完成
 */
function delay(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, duration);
    })
}

delay(1000).then(() => {
    console.log('finish');
})