//import {createInstance} from 'ybjfirstnpm'
//
//let axios = createInstance();
//
//axios({
//    method:'GET',
//    url:'http://localhost:3000/post'
//})
const axios = require('../node_modules/ybjfirstnpm/test/bundle');

axios({
    method:'GET',
    url:'http://localhost:3000/post'
})