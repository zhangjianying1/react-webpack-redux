import React from 'react'
import {Router, Route} from 'react-router';
import App from '../containers/App';
import Login from '../containers/login/Login';
import FindPsd from '../containers/login/FindPsd';
import ForgetSetPsd from '../containers/login/ForgetSetPsd';
import Lottery from '../containers/lottery/Lottery';
import FootBall from '../containers/football/FootBall';
import LotteryHistory from '../containers/lottery/LotteryHistory';
import LotteryDetail from '../containers/lottery/LotteryDetail';
import UserCenter from '../containers/usercenter/UserCenter';
import ModifyUsername from '../containers/usercenter/ModifyUsername';
import ManagePassword from '../containers/usercenter/ManagePassword';
import SetPhone from '../containers/usercenter/SetPhone';
import SetRealName from '../containers/usercenter/SetRealName';
import createBrowserHistory from 'history/lib/createHashHistory'

let history = createBrowserHistory();
let routes = (
    <Router history={history}>
        <Route path="/" component={App}>
            <Route path="login" component={Login}>
            </Route>
            <Route path="findpsd" component={FindPsd} />
            <Route path="forgetsetpsd" component={ForgetSetPsd} />
            <Route path="usercenter" component={UserCenter} />
            <Route path="modifyusername" component={ModifyUsername} />
            <Route path="managepassword" component={ManagePassword} />
            <Route path="setphone" component={SetPhone} />
            <Route path="setrealname" component={SetRealName} />
            <Route path="lottery" component={Lottery} />
            <Route path="football" component={FootBall}/>
            <Route path="lotteryhistory" component={LotteryHistory}/>
            <Route path="lotterydetail" component={LotteryDetail}/>

        </Route>
    </Router>
    );
export default routes