//匿名函数自调用
(function(){
    var a = 'abc';
    //创建模块方法
    function uppercase (){
        console.log('这个模块是大写的' + a.toUpperCase());
    }
    function downcase (){
        console.log('这个模块是小写的' + a.toLowerCase());
    }
    //向外暴露的调用接口
    window.NewMoudle2 = {
        uppercase:uppercase,
        downcase:downcase
    }
})()