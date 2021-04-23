import request from "@/api/myRequest";

//分页查询商品列表
export function productsByPage(start,limit,data){
    return request({
        url:`/lejuAdmin/product/productsByPage/${start}/${limit}`,
        method:'POST',
        data
    })
}

//查询品牌列表
export function findAllBrand(){
    return request({
        url:`/lejuAdmin/brand/findAllBrand`,
        method:'GET',
    })
}

//查询商品明细
export function productSkusDetail(productId){
    return request({
        url:`/lejuAdmin/product/productSkusDetail/${productId}`,
        method:'GET',
    })
}



export default {
    productsByPage,
    findAllBrand,
    productSkusDetail
}