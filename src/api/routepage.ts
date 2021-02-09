import request from "@/utils/request"


/**
 * 
 * @param params 
 */
export const createPageRoute = (params:any) =>
{
    return request({
        url: '/routes',
        method: 'post',
        data:params
    })
}

/**
 * 
 * @param params 
 */
export const UpdatePageRoute = (params:any)=>
{
    return request({
        url: '/routes',
        method: 'put',
        data:params
    })
}




/**
 * 
 */
export const DeletePageRoute = (id:number)=>
{
    return request({
        url: `/routes/${id}`,
        method: 'delete'
    })
}