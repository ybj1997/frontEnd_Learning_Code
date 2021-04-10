/*
自定义Promise函数模块：IIFE
*/
(function (window) {
    function Promise(excutor) {

    }

    /* 
    Promise原型对象的方法then()
       --->指定成功和失败的回调函数
       --->返回一个新的Promise对象
    */
    Promise.prototype.then = function (onResolved, onRejected) {

    }

    /*
    Promise原型对象的方法catch()
       --->指定失败的回调函数
       --->返回一个新的Promise对象
    */
    Promise.prototype.cacth = function (onRejected) {

    }

    /*
    Promise函数对象的resolve方法
       --->返回一个成功的Promise对象，其中value指定
    */
    Promise.resolve = function (value) {

    }

    /*
    Promise函数对象的reject方法
       --->返回一个失败的Promise对象，其中reason指定
    */
    Promise.reject = function (reason) {

    }

    /*
    Promise函数对象的all方法
       --->返回一个Promise对象，只有数组中的实例对象---‘一假全假，全真才真’
    */
    Promise.all = function (promises) {

    }

    /*
    Promise函数对象的race方法
       --->返回一个Promise对象，其结果由第一个完成的Promise决定
    */
    Promise.race = function (promises) {

    }
    /*向外暴露的Promise函数*/
    window.Promise = Promise;
})(window)