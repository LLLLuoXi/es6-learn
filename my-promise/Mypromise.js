/*
 * @Author: luoxi
 * @LastEditTime: 2022-01-05 23:51:03
 * @LastEditors: your name
 * @Description: 手写promise A+规范
 */
//记录Promise 的三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
/**
 * @description: 运行一个微队列任务 把传递的函数放到微队列中
 * @param {*Function} callback
 * @return {*}
 */
function runMicroTask(callback) {
  // 判断环境为node 环境
  if (process && process.nextTick) {
    process.nextTick(callback);
  } else if (MutationObserver) {
    //浏览器环境
    const p = document.createElement("p");
    const observer = new MutationObserver(callback);
    observer.observe(p, {
      childList: true, // 观察改元素内部的变化
    });
    p.innerHTML = "1";
  } else {
    //其他环境
    setTimeout(callback, 0);
  }
}
class MyPromise {
  /**
   * @description: 创建一个Promise
   * @param {*} executor 任务执行器，立即执行
   * @return {*}
   */
  constructor(executor) {
    this._state = PENDING; //状态
    this._value = undefined; //数据
    this._handlers = []; //处理函数形成的队列
    try {
      executor(this._rosolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this._reject(error);
    }
  }
  /**
   * @description: 向处理队列中添加一个函数
   * @param {* Function} executor  添加的函数
   * @param {* String} state 该函数什么状态下执行
   * @param {* Function} resolve 让then函数返回的Promise成功
   * @param {* Function} reject 让then函数返回的Promise失败
   * @return {*}
   */
  _pushHandler(executor, state, resolve, reject) {
    this._handlers.push({
      executor,
      state,
      resolve,
      reject,
    });
  }
  /**
   * @description: 根据实际情况，执行队列
   * @return {*}
   */
  _runHandlers() {
    if (this._state === PENDING) {
      //目前任务仍在挂起
      return;
    }
    console.log(`处理${this._handlers.length}函数`);
    while (this._handlers[0]) {
      const handler = this._handlers[0];
      this._runOneHandler(handler);
      this._handlers.shift();
    }
    // for (const handler of this._handlers) {
    //   this._runOneHandler(handler);
    // }
  }
  /**
   * @description: 处理一个handler
   * @param {*Object} handler
   * @return {*}
   */
  _runOneHandler(handler) {}
  /**
   * @description: PromiseA+ 规范里的then
   * @param {*Function} onFulfilled
   * @param {*Function} onRejected
   * @return {*}
   */
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this._pushHandler(onFulfilled, FULFILLED, resolve, reject);
      this._pushHandler(onRejected, REJECTED, resolve, reject);
      this._runHandlers(); //执行队列
    });
  }
  /**
   * @description:
   * @param {Sring} newState 新状态
   * @param {any} value 相关数据
   * @return {*}
   */
  _changeState(newState, value) {
    console.log("changeState");
    if (this._state !== PENDING) {
      // 目前状态已经更改
      return;
    }
    this._state = newState;
    this._value = value;
    this._runHandlers(); //状态改变，执行队列
  }
  /**
   * @description: 标记当前任务完成
   * @param {*} data 任务完成的相关数据
   * @return {*}
   */
  _rosolve(data) {
    this._changeState(FULFILLED, data);
  }
  /**
   * @description: 标记当前任务完成
   * @param {*} reason 任务失败的相关数据   * @return {*}
   */
  _reject(reason) {
    this._changeState(REJECTED, reason);
  }
}

const pro = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  });
});
pro.then(function A1() {});
setTimeout(() => {
  pro.then(function A2() {});
});

console.log(pro);

// const pro1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1);
//   });
// });
// pro1.then(function A1() {console.log('A1')});
// setTimeout(() => {
//   pro1.then(function A2() {console.log('A2')});
// });
