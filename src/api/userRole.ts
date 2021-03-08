/**
 * 
 **/
import request from '@/utils/request';

/**
 * 
 * @param data 
 * @returns 
 */
export const getUsers = (data:any) =>
{
    return request(
        {
            url:'/users/GetUsers',
            method: 'post',
            data: data
        });
}

/**
 * 
 * @param data 
 * @returns 
 */
export const updateUserRoles = (data:any)=>
{
    return request(
        {
            url:'/users/updateUsersRole',
            method: 'put',
            data: data
        });
} 