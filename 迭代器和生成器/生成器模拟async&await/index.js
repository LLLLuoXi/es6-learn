/*
 * @Author: luoxi
 * @LastEditTime: 2022-03-11 23:19:38
 * @LastEditors: your name
 * @Description: 生成器模拟async&await进行异步控制
 */

function* tasks() {
    const d = yield 1;
    console.log(d);
    const resp = yield fetch('https://dog.ceo/api/breeds/image/random');
    const result = yield resp.json();
    console.log(result);
}
run(tasks);
// logs: 1 {message: 'https://images.dog.ceo/breeds/buhund-norwegian/hakon1.jpg', status: 'success'}

function run(generatorFunc) {
    const generator = generatorFunc();
    // 启动，开始迭代
    let result = generator.next();
    handleResult(result);

    function handleResult() {
        if (result.done) {
            return;
        }
        if (typeof result.value.then === 'function') {
            // 1. 迭代的数据是一个Promise 等待迭代的数据是一个Promise完成后，在进行下一次迭代
            result.value.then(
                (data) => {
                    result = generator.next(data);
                    handleResult();
                },
                (err) => {
                    generator.throw(err);
                }
            );
        } else {
            // 2.其他数据,直接进行下次迭代
            result = generator.next(result.value);
            handleResult();
        }
    }
}