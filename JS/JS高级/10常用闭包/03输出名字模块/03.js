(
    function (name) {
        function output_name(name) {
                console.log('您输入的名字为:' + name);
        }
        window.output_name = output_name;
    }
)(window)