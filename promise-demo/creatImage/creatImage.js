/*
 * @Author: luoxi
 * @LastEditTime: 2021-12-16 23:53:55
 * @LastEditors: your name
 * @Description: 根据指定的图片路径，创建一个img元素 
 * 该函数需要返回一个promise，当图片加载完成后，任务完成，若图片加载失败，任务失败
 * 任务完成后，需要提供的数据是图片DOM元素；任务失败时，需要提供失败的原因
 * 提示：img元素又两个事件，load事件会在图像加载完成时触发，error事件会在图像加载失败时触发
 */
function createImage(imgUrl) {
    return new Promise(function(resolve, reject) {
        const img = document.createElement('img')
        img.src = imgUrl
        img.onload = () => {
            resolve(img)
        }
        img.onerror = (e) => {
            reject(e)
        }
    })
}

const url = 'https://img2.baidu.com/it/u=4013422379,3018162940&fm=26&fmt=auto'
const container = document.querySelector('.container')
createImage(url).then(img => {
    container.appendChild(img)
    console.log(`图片的宽：${img.width},高：${img.height}`)
}, err => {
    console.log('图片加载失败,请尝试更换图片地址', err);
})