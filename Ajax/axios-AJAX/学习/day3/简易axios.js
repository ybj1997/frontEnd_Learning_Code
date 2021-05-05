(function () {
   function Axios(config){
       this.default = config;
       this.intercepters = {
           request:{},
           response:{}
       }
   }
   
   Axios.prototype.request = function(config){
       console.log(config.method);
   }

   Axios.prototype.get = function(config){
       return this.request({
           method:'GET'
       })
   }

   Axios.prototype.post = function(config){
       return this.request({
           method:'POST'
       })
   }

   function createInstance(config){
       //实例化一个对象
       let Obj = new Axios(config);
       //instance是一个函数，可以使用instance({})调用
       let instance = Axios.prototype.request.bind(Obj);
       Object.keys(Axios.prototype).forEach(key=>{
           instance[key] = Axios.prototype[key].bind(Obj);
       });
       Object.keys(Obj).forEach(key => {
           instance[key] = Obj[key];
       });
       return instance;
   }
   window.axios = createInstance();
})()