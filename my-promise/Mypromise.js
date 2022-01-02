/*
 * @Author: luoxi
 * @LastEditTime: 2022-01-02 22:41:25
 * @LastEditors: your name
 * @Description: 手写promise A+规范
 */
//记录Promise 的三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
  /**
   * @description: 创建一个Promise
   * @param {*} executor 任务执行器，立即执行
   * @return {*}
   */
  constructor(executor) {
    this._state = PENDING; //状态
    this._value = undefined; //数据
    try {
        executor(this._rosolve.bind(this), this._reject.bind(this));
    } catch (error) {
        this._reject(error)
        
    }
  }
  /**
   * @description:
   * @param {Sring} newState 新状态
   * @param {any} value 相关数据
   * @return {*}
   */
  _changeState(newState, value) {
    if(this._state !== PENDING){
        // 目前状态已经更改
        return

    }
    this._state = newState;
    this._value = value;
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
   * @param {*} reason 任务失败的相关数据
   * @return {*}
   */
  _reject(reason) {
    this._changeState(REJECTED, reason);
  }
}

const pro = new MyPromise((resolve, reject) => {
//   resolve(123);
//   reject(123)
  throw new Error(123)
});
console.log(pro);
