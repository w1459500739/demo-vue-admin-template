import request from '@/api/myRequest'


//订单列表
export function findOrdersByPage(data,start,limit){
    return request({
        url:`/lejuAdmin/order/findOrdersByPage/${start}/${limit}`,
        method:'POST',
        data
    })
}

//查看订单明细
export function orderDetail(orderId){
    return request({
        url:`/lejuAdmin/order/orderDetail/${orderId}`,
        method:'GET',
    })
}

//确认发货
export function sendDone(data){
    return request({
        url:`/lejuAdmin/order/sendDone`,
        method:'POST',
        data
    })
}


//确认发货
export function finishOrder(data,orderId){
    return request({
        url:`/lejuAdmin/order/finishOrder/${orderId}`,
        method:'POST',
        data
    })
}

//查看退单列表
export function findReturnApply(data,start,limit){
    return request({
        url:`/lejuAdmin/orderReturn/findReturnApply/${start}/${limit}`,
        method:'POST',
        data
    })
}


export default {
    findOrdersByPage,
    orderDetail,
    sendDone,
    finishOrder,
    findReturnApply
}


