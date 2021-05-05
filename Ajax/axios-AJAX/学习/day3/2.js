(function(){
    function Axios(config){
        this.config = config;
    }

    Axios.prototype.request = function(config){
        //发送请求
        let promise = Promise.resolve(config);
        let chains = [dispatchRequest,undefined];
        let result = promise.then(chains[0]);
        return result;
    }

    function dispatchRequest(config){
        //调用适配器函数发送请求
        return xhrAdapter(config).then(
            response => {
                //对响应结果进行转换处理
                return response;
            },
            error => {
                throw error;  
            }
        )
    }

    //adapter适配器
    function xhrAdapter(config) {
        return new Promise((resolve,reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open(config.method,config.url);
            xhr.send();
            xhr.onreadystatechange = function () {
                if(xhr.readyState === 4){
                    if(status >=200&&status<=300){
                        resolve({
                            config:config,
                            data:xhr.response,
                            header:xhr.getAllResponseHeaders(),
                            status:xhr.status,
                            request:xhr,
                            statusText:xhr.statusText
                        });
                    }else{
                        reject(
                            new Error('请求失败')
                        );
                    }
                }
            }
        })
    }

    //创建axios函数
    let axios = Axios.prototype.request.bind(null);
})()