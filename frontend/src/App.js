import axios from 'axios';
import React from 'react';
import './App.css';
import * as dd from "dingtalk-jsapi";
import Router from './Router'
import ekb from './images/ekb.svg'

export const UserInfoContext = React.createContext({})

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //内网穿透工具介绍:
      // https://developers.dingtalk.com/document/resourcedownload/http-intranet-penetration?pnamespace=app
      // domain: 'https://e5df-47-52-218-55.ngrok.io',
      // webDomain: 'https://e5df-47-52-218-55.ngrok.io',
      domain: '',
      webDomain: '',
      corpId: '',
      authCode: '',
      userId: '',
      userName: ''
      // userId: '01222149405038033292',
      // userName: '陈苍山'
    }
  }

  componentDidMount() {
    // 免登操作
    this.login()
  }
  render() {
    // if (this.state.userId === '') {
    //   // 免登操作
    //   this.login()
    // }
    return (
      // 主编写模块
      <div className="App">
        <UserInfoContext.Provider value={this.state}>
          <Router />
        </UserInfoContext.Provider>
        <div className="fixName flex a_center j_center">
          {this.state.userName ? <img src={ekb} alt="" srcset="" /> : null}
          {this.state.userName ? `易快报` : ``}
        </div>
      </div>
    )
  }

  //登录-获取corpId
  login() {
    axios
      .get(this.state.domain + '/getCorpId')
      .then((res) => {
        if (res && res.status === 200) {
          const corpId = res.data
          this.setState({ corpId })
          this.loginAction(corpId)
        } else {
          alert('login failed --->' + JSON.stringify(res))
        }
      })
      .catch((error) => {
        alert('corpId err, ' + JSON.stringify(error))
      })
    // this.loginAction('dingffe554ce94dc7033acaaa37764f94726')
  }

  //登录操作
  loginAction(corpId) {
    let _this = this
    dd?.runtime?.permission
      ?.requestAuthCode({
        corpId: corpId, //企业 corpId
        onSuccess: function (res) {
          // 调用成功时回调
          _this.state.authCode = res.code
          console.log('---------', res.code)
          axios
            .get(_this.state.domain + '/login?authCode=' + res.code)
            .then((res) => {
              if (res && res.data.success) {
                let userId = res.data.data.userId
                let userName = res.data.data.userName
                console.log('登录成功，你好' + userName + userId)
                setTimeout(function () {
                  _this.setState({
                    userId: userId,
                    userName: userName
                  })
                }, 0)
                // alert('login  --->' + JSON.stringify({ a: _this.state.authCode, b: userId, c: userName }))
              } else {
                alert('login failed --->' + JSON.stringify(res))
              }
            })
            .catch((error) => {
              alert('httpRequest failed --->' + JSON.stringify(error))
            })
        },
        onFail: function (err) {
          // 调用失败时回调
          alert('requestAuthCode failed --->' + JSON.stringify(err))
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export default App;
