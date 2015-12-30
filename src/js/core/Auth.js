import superagent from 'superagent';
import {isObject} from './isObject';

class Auth{

    isLogin(authCode, fn) {

        if (authCode) {

            superagent.post('/userController/weixinExists').query({authCode: authCode}).then((res) => {

                if (res.ok) {
                    let body = res.body;

                    // 验证成功 （曾经授权过）
                    if (body.code == '0000') {
                        fn && fn(body.result);
                    } else {
                        fn && fn();
                    }
                }
            });
        } else {
            // 其它页面刷新时
            superagent.get('/userController/member').then((res) => {

                if (res.ok) {
                    let body = res.body;

                    // 返回登录信息
                    if (body.code == '0000') {
                        fn && fn(body.result);
                    } else {
                        fn && fn();
                    }
                }
            });
        }
    }
    setToken(token){
        localStorage.setItem('login', JSON.stringify(token));
    }
    // authCode 如果存在就是微信入口页面（必须需要微信认证） 注： 其它页面刷新的时候判断是否有localStorage
    getToken(){
        let toKen = localStorage.getItem('login');
        return toKen && JSON.parse(JSON.parse(toKen));
    }
}
export default new Auth();