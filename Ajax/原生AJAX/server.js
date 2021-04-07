//1.引入express
const express = require('express');

//2.创建应用对象
const app = express();

//3.创建路由规则
app.all('/json-server',(request,response)=>{
    //设置相应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    //设置相应头
    response.setHeader('Access-Control-Allow-Headers','*');
    //设置响应体,字符串直接再send方法里面
    //对象数据要进行json格式的字符串转换
    const data = {
        name:'cqupt'
    }
    //对对象进行字符串转换
    let str = JSON.stringify(data);
    response.send(str);
});

//4.监听端口启动服务
app.listen(8000,()=>{
    console.log('服务已经启动，8000端口监听中。。。');
})