<!--
 * @Author: luoxi
 * @LastEditTime: 2022-04-04 18:32:18
 * @LastEditors: luoxi
 * @Description: 原型和原型链
-->
# 原型和原型链

- 所有对象都是通过`new 函数`创建

```jsx
// 当一个函数返回一个{}时，可以通过new来获取
function test(){
     return {}
}
console.log(new test())  // 通过new Object产生
```

- 所有的函数也是对象（通过一个`new Function`来创建，`Function`是直接放在内存里的，js引擎启动就有了）。
    - 函数中可以有属性.``["length", "name", "arguments", "caller", "prototype"]``，默认情况下这5个属性都是不可枚举的.可以用``Object.getOwnPropertyNames()``返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性）组成的数组来获取。
- 所有对象都是引用类型（保存和赋值都是地址。
 ```js
 typeof Object  // logs: 'function'
 typeof Array  // logs: 'function'
 ```

 ## 原型 prototype

所有函数都有一个属性：``prototype``，称之为函数原型。

默认情况下，``prototype``是一个普通的Object对象。

默认情况下，``prototype``中有一个属性，``constructor``，它也是一个对象，它指向构造函数本身。

```jsx
function test(){
    return {}  // => return new Object()
}
console.log(new test())

test.prototype.constructor === test  // true
Object.prototype.constructor === Object // true
```

## 隐式原型 proto

所有的对象都有一个属性：`__proto__`，称之为隐式原型。

默认情况下，隐式原型指向创建该对象的函数（构造函数）的原型。

```jsx
function test(){

}
var obj = new test()

obj._proto_ === test.prototype  // true
```

```jsx
function User(name, age) {
    this.name = name
    this.age = age
    this.sayHello = function() {
        console.log('hello');
    }
}
var u1 = new User('abc', 11)
var u2 = new User('bcd', 12)

console.log(u1.sayHello === u2.sayHello); // logs:false
```
此时u1的sayHello 和u2的sayHello 不是一个东西，意味着每次创建对象的时候我要重复的创建这些东西，但是这些对象的函数是没有变化的。
需要共享的话，要吧函数放到User原型里。

**当访问一个对象的成员时**：

1. 看该对象自身是否拥有该成员，如果有直接使用。
2. 在原型链中依次查找是否拥有该成员，如果有直接使用。
    
    ```js
    function User(name, age) {
        this.name = name
        this.age = age
    }
    User.prototype.sayHello = function() {
        console.log('hello');
    }
    var u1 = new User('abc', 11)
    var u2 = new User('bcd', 12)
    
    console.log(u1._proto_.sayHello === u2._proto_.sayHello ); //true
    console.log(u1.sayHello === u2.sayHello); //true
    ```
    

猴子补丁：在函数原型中加入成员，以增强起对象的功能，猴子补丁会导致原型污染，使用需谨慎。

## 原型链

**特殊点：**

1. Function的**proto**指向自身的prototype
2. Object的prototype的**proto**指向null

![原型链.png](https://s2.loli.net/2022/04/02/G9AcjNvuXSKQszd.png)

`Function`是直接加到内存里的，因为所有东西都是靠它来产生的，所有的函数都是通过`Function` 来产生的，而所有的对象又是通过函数来产生的。

针对Function.**proto** === Function.prototype的理解。
 js理解为采用原型设计模式，这种设计模式是在对象内部属性庞大，创建对象成本高的情况下使用的,相当于java的克隆对象。Function即函数，函数不同于对象，其内部是没有属性的，所以函数复制出的本身就是一个空函数，而不像构造对象可以包含一些属性，即Function.**proto**=== Function.prototype。

### 覆盖
```js
function A(){}
var obj = new A()
obj.toString = function(){
    return 'abc'
}

obj.toString()  // 'abc'
var arr = [34,56,5,5]
arr.toString() // '34,56,5,5'

//toString() 被自己写的覆盖之后  用call调用Object原型上的toString方法
//强行调用
Object.prototype.toString.call(arr)

//例子2
// 在自定义函数原型上找到了toString()就不会往上找Object原型，只有通过new A()出来的对象才有重写的toString()，确保了Object原型上toString()不会被覆盖
function A(){}
A.prototype.toString = function(){
    return '123'
}
var obj = new A()
obj.toString()  // '123'
```