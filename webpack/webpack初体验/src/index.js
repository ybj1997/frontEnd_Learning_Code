/*    index.js 入口文件   */

/*
    1.运行命令：
        开发环境：webpack ./src/index.js -o ./build/build.js --mode=development
        =====>>webpack 以index.js为入口文件打包输出到build.js中，打包环境为开发环境
        生产环境: webpack ./src/index.js -o ./build/build.js --mode=production

    2.webpack自身只能识别JS和JSON语言
        需要使用Loader来识别其他语言
        使用Plugins来扩展webpack的功能
    
    3.webpack.config.js  webpack的配置文件
        作用：当运行webpack指令时，会加载配置文件中的配置
*/
import './iconfont.css';
import './index.css'


let root = document.getElementById('root');
console.log(root);