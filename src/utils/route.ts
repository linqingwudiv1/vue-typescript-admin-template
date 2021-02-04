import { Component } from "vue";
import { VueConstructor } from "vue/types/umd";

import Layout from '@/layout/index.vue';
const Map_Views:Map<string, any> = new Map<string, object> ();
/**
 * 
 * @param path 
 */
export const loadView = function (path:string|VueConstructor<Vue>) : Function
{
    return (resolve:any) => {
        // console.log(resolve);
        require.ensure([], (require) => {
          resolve(require(`@/${path}`));
        });
    };
}

/**
 * 
 * @param path 
 */
export const loadViewToMap = function (param:string|VueConstructor<Vue>)
{    
    if (typeof param == 'string' )
    {
        const val = Map_Views.get(param);
        if ( val )
        {
            return val;
        }
        else 
        {
            if (param.match(/^.+(\.vue)$/))
            {
                let ret_fn = loadView(param);
                Map_Views.set(param, ret_fn);
                return ret_fn;
            }
            else 
            {
                switch (param.toLowerCase())
                {
                    case 'layout':
                        {
                            return Layout;
                        }
                    default:
                        {
                            return loadView('error-page/404.vue');
                        }
                }
            }
        }
    }
    else 
    {
        const com = Map_Views.get(param.name);
        if (!com)
        {
            Map_Views.set(param.name , param);
        }
        
        return param;
    }
}