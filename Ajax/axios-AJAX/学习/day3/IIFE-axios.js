(function () {
    function Axios(config) {
        this.default = config;
        this.intercepters = {
            request: {},
            response: {}
        }
    }

    Axios.prototype.request = function (config) {
        //发送请求
        let promise = Promise.resolve(config);
        let chains = [dispatchRequest, undefined];
        let result = promise.then(chains[0]);
        return result;
    }

    function dispatchRequest(config) {
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
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(config.method, config.url);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status <= 300) {
                        resolve({
                            config: config,
                            data: xhr.response,
                            header: xhr.getAllResponseHeaders(),
                            status: xhr.status,
                            request: xhr,
                            statusText: xhr.statusText
                        });
                    } else {
                        reject(
                            console.log('请求失败')
                        );
                    }
                }
            }
        })
    }

    Axios.prototype.get = function (config) {
        return this.request({
            method: 'GET'
        })
    }

    Axios.prototype.post = function (config) {
        return this.request({
            method: 'POST'
        })
    }

    function createInstance(config) {
        //实例化一个对象
        let Obj = new Axios(config);
        //instance是一个函数，可以使用instance({})调用
        let instance = Axios.prototype.request.bind(Obj);
        Object.keys(Axios.prototype).forEach(key => {
            instance[key] = Axios.prototype[key].bind(Obj);
        });
        Object.keys(Obj).forEach(key => {
            instance[key] = Obj[key];
        });
        return instance;
    }
    window.axios = createInstance();
})()