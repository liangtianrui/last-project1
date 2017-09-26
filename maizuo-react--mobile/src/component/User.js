/**
 * Created by dllo on 17/9/26.
 */
import React, {Component} from 'react'
import '../assets/styles/user.css'
class User extends Component {
    render (){
        var userA = document.getElementsByClassName('user')
        var passA = document.getElementsByClassName('pass')
        var butA = document.getElementsByClassName('but')
        
        return(
            <div className="wrap">
                <div className="box">
                    <input type="text" className="user" placeholder="输入手机号/邮箱"/>
                    <div className="input-bg" />
                    <input type="text" className="pass" placeholder="输入密码/验证码"/>
                    <div className="input-bg" />
                    <button type="submit" className="but">登录</button>
                </div>
            </div>
        )
    }
}
export default User