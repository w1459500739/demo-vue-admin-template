import request from "@/api/myRequest";

//分页查询商品列表
export function productsByPage(start,limit,data){
    return request({
        url:`/lejuAdmin/product/productsByPage/${start}/${limit}`,
        method:'POST',
        data
    })
}

//更改是否最新状态
export function switchNewStatus(data){
    return request({
        url:`/lejuAdmin/product/switchNewStatus`,
        method:'POST',
        data
    })
}

//更改发布状态
export function switchPublishStatus(data){
    return request({
        url:`/lejuAdmin/product/switchPublishStatus`,
        method:'POST',
        data
    })
}


//更改推荐状态
export function switchRecommandStatus(data){
    return request({
        url:`/lejuAdmin/product/switchRecommandStatus`,
        method:'POST',
        data
    })
}


//更改审核状态
export function switchVerifyStatus(data){
    return request({
        url:`/lejuAdmin/product/switchVerifyStatus`,
        method:'POST',
        data
    })
}


//删除商品
export function delProduct(productId){
    return request({
        url:`/lejuAdmin/product/del/${productId}`,
        method:'DELETE',
    })
}


//添加商品
export function addProductAndSkus(data){
    return request({
        url:`/lejuAdmin/product/addProductAndSkus`,
        method:'POST',
        data
    })
}


export default {
    productsByPage,
    switchNewStatus,
    switchPublishStatus,
    switchRecommandStatus,
    switchVerifyStatus,
    delProduct,
    addProductAndSkus
}