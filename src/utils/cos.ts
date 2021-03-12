import { getUserCOSToken } from "@/api/users";
import COS from "cos-js-sdk-v5";

export const NewCOS = ():COS =>
{
    const cos = new COS(
        {
            getAuthorization: (opts, callback)=>
            {
                getUserCOSToken().then((res) => 
                {
                    //console.log(`success ============  `, res.data);
                    const data = res.data;
                    const credentials = data.credentials;

                    if (!data || !credentials) return console.error('credentials invalid');
                    callback(
                        {
                            TmpSecretId: credentials.TmpSecretId,
                            TmpSecretKey: credentials.TmpSecretKey,
                            XCosSecurityToken: credentials.Token,
                            StartTime: data.startTime, // 时间戳，单位秒，如：1580000000，建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                            ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
                        });
                })
                .catch( (err) => 
                {
                    // this.$message({type:'error', message : err});
                    console.error(`============  `, err);
                })
            }
        });

        return cos;
}


