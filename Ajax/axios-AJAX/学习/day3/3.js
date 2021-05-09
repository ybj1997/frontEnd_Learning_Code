import {createInstance} from 'ybjfirstnpm'

let axios = createInstance();

axios({
    method:'GET',
    url:'http://localhost:3000/post'
})