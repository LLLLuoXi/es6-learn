//完成delay函数
// 该函数可以等待一段时间
// 返回promise
function delay(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, duration)
    });
}

// delay(1000).then(() => {
//     console.log('ok')
//     return delay(1000)
// }).then(() => {
//     console.log('ok')
//     return delay(1000)
// }).then(() => {
//     console.log('ok')
//     return delay(1000)
// })

(async() => {
    for (let i = 0; i < 3; i++) {
        await delay(1000)
        console.log('ok')
    }
})()