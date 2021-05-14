//1.引入express
const express = require('express');

//2.创建应用对象
const app = express();

//3.创建路由规则
//request对请求报文封装
//response对响应报文的封装
app.get('/server',(request,response)=>{
    //设置相应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    //设置相应头
    response.setHeader('Access-Control-Allow-Headers','*')

    //设置一个其他类型数据
    //var data = {
    //    name:'ybj'
    //}
    //设置响应体，延时响应加一个定时器即可
    response.send('String');
});

//4.监听端口启动服务
app.listen(8000,()=>{
    console.log('服务已经启动，8000端口监听中。。。');
})


//****启动服务使用node
//****利用nodemon启动一次后，更改数据后，就自动更新启动