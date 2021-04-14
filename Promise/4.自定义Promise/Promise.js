/*
自定义Promise函数模块：IIFE
*/
(function (window) {
   const PENDING = 'pending';
   const RESOLVED = 'resolved';
   const REJECTED = 'rejected';
   /*
   Promise构造函数
      --->执行器函数
      --->
   */
   function Promise(excutor) {
      const _this = this;
      //初始化状态、属性、结构
      _this.status = PENDING;
      _this.data = undefined;
      _this.callback = [];//接受回调函数onResolved()和onRejected()

      function resolve(value) {
         if (_this.status !== PENDING) return;//当调用resolve()时，Promise状态不为待定时，退出执行器
         //改变状态为resolve
         _this.status = RESOLVED;
         //保存value的数据
         _this.data = value;
         //如果有待执行的callback函数，立即异步执行回调函数
         setTimeout(() => {//将所有执行成功的回调函数放入消息队列中
            if (_this.callback.length > 0) {
               _this.callback.forEach(callbacksObj => {
                  callbacksObj.onResolved(value);
               });
            }
         }
         )
      }

      function reject(reason) {
         if (_this.status !== PENDING) return;

         _this.status = REJECTED;
         _this.data = reason;
         setTimeout(() => {
            if (_this.callback.length > 0) {
               _this.callback.forEach(callbacksObj => {
                  callbacksObj.onRejected(reason);
               });

            }
         })
      }

      //捕获异常
      try{
         excutor(resolve, reject)
      } catch (error) {
         reject(error)
      }
   }

   /* 
   Promise原型对象的方法then()
      --->指定成功和失败的回调函数
      --->返回一个新的Promise对象
   */
   Promise.prototype.then = function (onResolved, onRejected) {
      //默认成功，继续向下传递
      onResolved = typeof 'function' ? onResolved : value => value; 
      //指定默认的失败的回调函数（异常传透的关键）
      onRejected = typeof 'function' ? onRejected : reason => {throw reason}; 

      const _this = this;

      return new Promise((resolve, reject) => {

         //封装回调函数
         function handle(callback) {
            /*状态改变为（成功/失败）后，调用[onResolved(value)/onRejected(reason)]回调函数，有三种结果：
              1.如果抛出异常，return的Promise状态改变为rejected，reason为error
              2.如果回调函数返回的为非Promise，return默认成功，状态改变为resolved，value为result
              3.如果回调函数返回的是Promise，return的Promise是什么结果，这个Promise就是什么结果
            */
            try {
               let result = callback(_this.data);//保存回调函数的值
               if (result instanceof Promise) {//当这个result是一个Promise对象时
                  //返回的Promise的结果，就是result的结果，
                  //如果当前这个Promise成功，则返回的Promise调用resolve，并且值为value
                  //如果当前这个Promise失败，则返回的Promise调用reject，并且值为reason
                  //result.then(//Promise.then()得到当前result的结果，
                  //   value => resolve(value),//result成功，返回的新Promise执行resolve()
                  //   reason => reject(reason)//result失败，返回的新Promise执行reject()
                  //)
                  result.then(resolve,reject);
               } else {
                  resolve(result)
               }
            } catch (error) {
               reject(error)
            }
         }

         if (_this.status === PENDING) {
            //当状态为pending是保存回调函数到callback，不执行
            //并推到Promise.callback属性里，这样才能异步执行执行器函数
            _this.callback.push({
               onResolved() {
                  handle(onResolved)
               },
               onRejected() {
                  handle(onRejected)
               }
            })
         } else if (_this.status === RESOLVED) {//如果当前状态为resolved状态，则异步执行回调函数onResolved并改变返回新Promise的状态
            setTimeout(() => {
               handle(onResolved);
            })
         } else {
            setTimeout(() => {
               handle(onRejected);
            })
         }
      })
   }

   /*
   Promise原型对象的方法catch()
      --->指定失败的回调函数
      --->返回一个新的Promise对象
   */
   Promise.prototype.catch = function (onRejected) {
      return this.then(undefined,onRejected);
   }

   /*
   Promise函数对象的resolve方法
      --->返回一个成功的Promise对象，其中value指定
   */
   Promise.resolve = function (value) {
      return new Promise((resolve,reject) =>{
         if(value instanceof Promise){
            value.then(resolve,reject);
         }else{
            resolve(value)
         }
      })
   }

   /*
   Promise函数对象的reject方法
      --->返回一个失败的Promise对象，其中reason指定
   */
   Promise.reject = function (reason) {
      return new Promise((resolve,reject)=>{
         reject(reason)
      })
   }

   /*
   Promise函数对象的all方法
      --->返回一个Promise对象，只有数组中的实例对象---‘一假全假，全真才真’
   */
   Promise.all = function (promises) {
      const values = new Array(promises.length);//定义一个长度为Promise对象数的数组，用来保存value
      let resolvedCount = 0;//成功的标志数
      return new Promise((resolve,reject)=>{
          promises.forEach((p,index)=>{
             p.then(//对每个Promise读值(改善：Promise.resolve(p))
               value =>{
                  resolvedCount++;
                  //如果p成功，就将这个p的value值保存到values数组中
                  values[index] = value;
                  //如果全部成功了，就返回的promise就成功
                  if(resolvedCount === promises.length){
                     resolve(values)
                  }
               },
               //对每个promise读值，有失败，则返回的promise失败
               reason=>{
                  reject(reason)
               }
             )
          })
      })
   }

   /*
   Promise函数对象的race方法
      --->返回一个Promise对象，其结果由第一个完成的Promise决定
   */
   Promise.race = function (promises) {
      return new Promise((resolve,reject)=>{
         promises.forEach((p,index)=>{
            p.then(//改善：Promise.resolve(p)
               value=>resolve(value),
               reason=>reject(reason)
            )
         })
      })
   }
   /*向外暴露的Promise函数*/
   window.Promise = Promise;
})(window)