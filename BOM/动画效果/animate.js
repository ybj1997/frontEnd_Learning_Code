/*横向缓慢动画效果*/
function animate(obj, target, callback){
    clearInterval(obj.timer);//防止函数反复调用时不断添加定时器函数
    obj.timer = setInterval(function(){
        var step = (target - obj.offsetLeft) / 10 ;//缓动动画核心算法
        step = step>0?Math.ceil(step):Math.floor(step);//兼容前进和后退的算法取整
        if(obj.offsetLeft == target){
            clearInterval(obj.timer);
            if(callback){
                callback();
            }
        }else{
            obj.style.left = obj.offsetLeft + step + 'px';
        }
    },15);
}
//function animate(obj, target, callback) {
//    // console.log(callback);  callback = function() {}  调用的时候 callback()
//    // 先清除以前的定时器，只保留当前的一个定时器执行
//    clearInterval(obj.timer);
//    obj.timer = setInterval(function() {
//        // 步长值写到定时器的里面
//        // 把我们步长值改为整数 不要出现小数的问题
//        // var step = Math.ceil((target - obj.offsetLeft) / 10);
//        var step = (target - obj.offsetTop) / 10;
//        step = step > 0 ? Math.ceil(step) : Math.floor(step);
//        if (obj.offsetTop == target) {
//            // 停止动画 本质是停止定时器
//            clearInterval(obj.timer);
//            // 回调函数写到定时器结束里面
//            // if (callback) {
//            //     // 调用函数
//            //     callback();
//            // }
//            callback && callback();
//        }
//        // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
//        obj.style.top = obj.offsetTop + step + 'px';
//    }, 15);
//}