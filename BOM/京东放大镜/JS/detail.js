window.addEventListener('load',function(){
    let mask = document.querySelector('.mask');
    let big = document.querySelector('.big');
    let preview_img = document.querySelector('.preview_img');
    /*(1)第一步当鼠标经过时，遮挡层显示，鼠标离开时遮挡层消失*/
    preview_img.addEventListener('mouseover',function(){
        mask.style.display = 'block';
        big.style.display = 'block';
        
        })
    preview_img.addEventListener('mouseout',function(){
        mask.style.display = 'none';
        big.style.display = 'none';
         })
    /*（2）第二步遮挡层随鼠标的移动而移动且不超过大盒子preview_img*/
    preview_img.addEventListener('mousemove',function(e){
        let maskMAX = preview_img.offsetWidth - mask.offsetWidth;//遮挡层mask在盒子preview_img中可以上下左右移动的最大距离
        let maskX = e.pageX - this.offsetLeft - mask.offsetWidth / 2 ;//鼠标在盒子中的横坐标
        let maskY = e.pageY - this.offsetTop - mask.offsetWidth / 2 ;//鼠标在盒子中的纵坐标
        /*通过判断鼠标在盒子中的横纵坐标来限制遮挡层mask的移动*/
        /*限制横坐标maskX、maskY的值在0和maskMAX之间则遮挡层不会超出盒子preview_img*/
        if(maskX <= 0){
            maskX = 0;
        }else if(maskX >= maskMAX){
            maskX = maskMAX;
        }else{
            mask.style.left = maskX + 'px';
        }
        if(maskY <= 0){
            maskY = 0 + 'px';
        }else if(maskY >= maskMAX){
            maskY = maskMAX + 'px';
        }else{
            mask.style.top = maskY + 'px';
        }
    /*(3）第三步大图片big随遮挡层mask的移动而移动*/ 
    /*大图片移动距离 = （遮挡层*大图片移动最大距离/遮挡层移动最大距离）*/
    let bigimg = document.querySelector('.bigImg')
    //大图片移动距离 = 图片大小减去盒子大小
    //需要将img定位到big盒子上  
    let bigMAX = bigimg.offsetWidth -  big.offsetWidth;
    bigimg.style.left = - maskX * bigMAX / maskMAX + 'px';
    bigimg.style.top = - maskY * bigMAX / maskMAX + 'px';     
        })
})