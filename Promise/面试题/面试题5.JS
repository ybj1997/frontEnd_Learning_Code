(
    function (window) {
        const PENDING = 'pending';
        const RESOLVED = 'resolved';
        const REJECTED = 'rejected';

        function Promise(excutor) {
            //第一步：给Promise构造函数设置标志属性
            _this.status = PENDING;
            _this.data = undefined;
            _this.callbacks = [];

            const __this = this;

            //第三步：成功与失败函数
            //  ===>改变Promise函数对象成功状态的属性
            //  ===>回调函数异步执行
            function resolve(value) {
                _this.status = RESOLVED;
                _this.data = value;
                setTimeout(() => {
                    if (_this.callbacks.length > 0) {
                        __this.callbacks.forEach(callbackObj => {
                            callbackObj.onResolve(value)
                        });
                    }
                })
            }

            //第四步：成功与失败函数
            //  ===>改变Promise函数对象失败状态的属性
            //  ===>回调函数异步执行
            function reject(reason) {
                _this.status = REJECTED;
                _this.data = value;
                setTimeout(() => {
                    if (_this.callbacks.length > 0) {
                        __this.callbacks.forEach(callbackObj => {
                            callbackObj.onResject(reason)
                        });
                    }
                })
            }

            //第二步：Promise对象的执行器函数
            try {
                excutor(resolve, reject)
            } catch (error) {
                reject(error)
            }
        }

        Promise.prototype.then = function (onResolved, onRejected) {
            onResolved = typeof 'function' ? onResolved : value => value;
            //当不指定onRejected回调函数时，指定默认失败的回调为 reason=>{throw reason}
            //实现异常传透的关键步骤
            onRejected = typeof 'function' ? onRejected : reason => {throw reason}


            const _this = this;
            return new Promise((resolve, reject) => {
                //第五步：封装回调函数
                function handle(callback) {
                    try {
                        //保存回调函数结果
                        let result = callback(_this.data);
                        //判断结果类型
                        if (result instanceof Promise) {
                            result.then(resolve, reject)
                        } else {
                            resolve(result)
                        }
                    }
                    catch (error) {
                        reject(error)
                    }
                }

                //第一步：确定有三种状态下的then()方法
                if (_this.status === PENDING) {
                    //第二步：待定状态下，保存回调函数并且入回调函数栈
                    _this.callbacks.push({
                        onResolve() {
                            handle(onResolved)
                        },
                        onReject() {
                            handle(onRejected)
                        }
                    })
                    //第三步：成功状态下的回调函数
                    //  ===>1.返回一个全新的Promise对象
                    //  ===>2.执行成功回调函数，并对其进行判断
                    //  ===>3.如果返回的是异常，则返回Promise为失败状态，值为异常值
                    //        如果返回的是非Promise，则返回Promise默认成功，并且其值为返回值
                    //        如果返回的是一个新的Promise对象，则返回的Promise状态和值，就是新的Promise的状态
                } else if (_this.status === RESOLVED) {
                    setTimeout(() => {
                        handle(onResolved)
                    })
                    //第四步：失败状态类似
                } else {
                    setTimeout(() => {
                        handle(onRejected)
                    })
                }
            })
        }

        Promise.prototype.catch = function (onRejected) {
            return this.then(undefined, onRejected)

        }

        Promise.resolve = function (value) {
            return new Promise((resolve, reject) => {
                if (value instanceof Promise) {
                    value.then(resolve, reject)
                } else {
                    resolve(value)
                }
            })
        }

        Promise.reject = function (reason) {
            return new Promise((resolve, reject) => {
                reject(reason)
            })
        }

        Promise.all = function (promises) {
            const values = new Array(promises.length);
            let resolvedCount = 0;
            return new Promise((resolve, reject) => {
                promises.forEach((p, index) => {
                    p.then(
                        value => {
                            resolvedCount++;
                            values[index] = value;
                            if(resolvedCount === promises.length){
                                resolve(values)
                            }
                        },
                        reason => { 
                            reject(reason)
                        }
                    )
                })
            })
        }

        Promise.race = function (promises) {
            return new Promise((resolve,reject)=>{
                promises.forEach((p,index)=>{
                    p.then(
                        value=>resolve(value),
                        reason=>reject(reason)
                    )
                })
            })
        }

        window.Promise = Promise
    }
)(window)