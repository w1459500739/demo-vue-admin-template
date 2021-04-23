import request from "@/api/myRequest";


//添加限时活动
export function addRecommend(data){
    return request({
        url:'/lejuAdmin/homeRecommend/addRecommend',
        method:'POST',
        data
    })
}

//修改限时活动
export function updateRecommend(data){
    return request({
        url:'/lejuAdmin/homeRecommend/updateRecommend',
        method:'POST',
        data
    })
}

//获取活动列表
export function findAllRecommends(){
    return request({
        url:'/lejuAdmin/homeRecommend/findAllRecommends',
        method:'GET'
    })
}

//删除限时活动
export function delRecommend(recommendId){
    return request({
        url:`/lejuAdmin/homeRecommend/delRecommend/${recommendId}`,
        method:'DELETE'
    })
}

export default {
    addRecommend,
    updateRecommend,
    findAllRecommends,
    delRecommend
}