const {resolve} = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//process.env.NODE_ENV = 'production';//开发环境设置环境变量

module.exports = {
    entry:'./src/js/index.js',
    output:{
        filename:'js/build.js',
        path:resolve(__dirname, 'build')
    },
    module:{
        rules:[
            /*配置css*/
            {
                test:/^\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css.loader',
                    /*压css兼容处理*/
                    /*  还需要再package.json中定义
                        "browserslist":{ 
                            //需要设置环境变量
                            "development":[
                                "last 1 chrom version",
                                "last 1 firefox version",
                                "last 1 safari version"
                            ],
                            //不设置环境变量，默认生产环境
                            "production":[
                                ">0.2%",
                                "not dead",
                                "not op_mini all"
                            ]
                        }
                    */
                    {
                        loader:'postcss-loader',
                        options:{
                            ident:'postcss',
                            plugins:()=>[
                                require('postcss-preset-env')()
                            ]
                        }
                    }
                ]
            },
            /*配置less*/
            {
                test:/^\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html'
        }), 
        new MiniCssExtractPlugin({
            filename: 'css/build.js'
        })
    ],
    mode:'production'
}