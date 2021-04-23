import {getToken} from '@/utils/myAuth'
export default {
    data(){
        return{
            imgUploderUrl:'/lejuAdmin/material/uploadFileOssSave'
        }
    },
    computed:{
        headers(){
            const token = getToken()
            return{
                token
            }
        }
    }
}