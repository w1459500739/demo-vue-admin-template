import request from "@/api/myRequest";

// 获取文章列表
export function findArticles(start,limit,data){
    return request({
        url:`/lejuAdmin/productArticle/findArticles/${start}/${limit}`,
        method:'POST',
        data
    })
}

// 删除文章
export function delArticle(id){
    return request({
        url:`/lejuAdmin/productArticle/del/${id}`,
        method:'DELETE',
    })
}


// 更新文章状态
export function changeShow(data){
    return request({
        url:`/lejuAdmin/productArticle/changeShowStatus`,
        method:'POST',
        data
    })
}


//新增文章
export function addArticle(data){
    return request({
        url:`/lejuAdmin/productArticle/addArticle`,
        method:'POST',
        data
    })
}

//获取文章明细
export function productArticle(id){
    return request({
        url:`/lejuAdmin/productArticle/productArticle/${id}`,
        method:'GET',
    })
}


//更新文章
export function updateArticle(data){
    return request({
        url:`/lejuAdmin/productArticle/updateArticle`,
        method:'POST',
        data
    })
}
export default {
    findArticles,
    delArticle,
    changeShow,
    addArticle,
    productArticle,
    updateArticle
}