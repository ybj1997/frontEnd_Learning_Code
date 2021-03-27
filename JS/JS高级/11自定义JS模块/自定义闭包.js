//创建模块
function NewMoudle(){
    var a = 'abc';
    //创建模块方法
    function uppercase (){
        console.log('这个模块是大写的' + a.toUpperCase());
    }
    function downcase (){
        console.log('这个模块是小写的' + a.toLowerCase());
    }
    //向外暴露的调用接口
    return {
        uppercase:uppercase,
        downcase:downcase
    }
}