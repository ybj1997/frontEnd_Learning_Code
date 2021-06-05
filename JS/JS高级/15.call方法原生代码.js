//1.构造一个新的newcall方法达到call的改变this指向功能
function person() {
    console.log(this.name);
}

var obj = {
    name:'Allen'
}

Function.prototype.newcall = function (obj) {
    obj.p = this;//this指向person函数,因为Function是所有函数的构造函数，也是person函数的构造函数
    console.log(obj.p);
    obj.p();
    delete obj.p;//不改写person对象
}

person.newcall(obj);

//2.newcall实现参数传入
 function person1(a,b,c,d) {
     console.log(this.name);
     console.log(a,b,c,d);
 }

//Function.prototype.newcall1 = function (obj,...arr) {
//    const obj1 = obj||window;//
//    obj1.p = this;
//    const result = obj1.p(...arr);
//    delete obj1.p;
//    return result;
//}
//
//person1.newcall1(obj,1,2,3,4);

Function.prototype.newcall1 = function (obj) {
    var obj = obj||window;//当绑定对象为null时，对象改为window（原生call方法）
    obj.p = this;
    //获取参数
    let newArr = [];
    for(var i = 0;i<arguments.length;i++){
        newArr.push('arguments['+i+']');
    }
    let result = eval('obj.p('+ newArr +')');//eval方法去除字符串
    delete obj.p;
    return result;
}

person1.newcall1(obj,'a','b','c');

