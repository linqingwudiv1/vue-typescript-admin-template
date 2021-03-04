import request from '@/utils/request'


/**
 * 
 * @param query 
 */
export const getAppInfos = (query:any)=>
{
    return request(
        {
            url: '/asset/appinfo/GetAppInfos',
            method:'post',
            data: query
        });
}

/**
 * 
 * @param data 
 */
export const createAppInfo = (data:any) =>
{
    return request
    ({
        url: '/asset/appinfo',
        method:'post',
        data: data
    });
}

/**
 * 
 * @param data 
 */
export const deleteAppInfo = (id:number) =>
{
    return request
    ({
        url: `/asset/AppInfo/${id}`,
        method:'delete'
    });
}

/**
 * 
 * @param data 
 */
export const updateAppInfo = (data:any) =>
{
    return request
    ({
        url: '/asset/appinfo',
        method:'put',
        data: data
    })
}