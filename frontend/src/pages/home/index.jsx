/**
 *  Created by pw on 2021/11/24 下午5:54.
 */
import React, { useContext, useState } from 'react'
import { Button } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import './index.css'
import { UserInfoContext } from '../../App'
import axios from 'axios'

const Main = () => {
  let navigate = useNavigate()
  const context = useContext(UserInfoContext)
  const [loading, setLoading] = useState(false)

  const goTo = (path) => {
    console.log('---path----', path)
    navigate(path)
  }
  function openwin(url) {
    var a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('id', 'openwin')
    document.body.appendChild(a)
    a.click()
  }
  const goToUrl = () => {
    setLoading(true)
    axios
      .post(context.domain + '/biz/get/address', {
        userId: context?.userId
      })
      .then((res) => {
        setLoading(false)
        if (res && res.data.success) {
          const url = res?.data?.data
          openwin(url)
          console.log('-------res----', res)
        } else {
          alert('request failed --->' + JSON.stringify(res))
        }
      })
      .catch((error) => {
        setLoading(false)
        alert('httpRequest failed --->' + JSON.stringify(error))
      })
  }

  return (
    <div className="main">
      <div className={'title'}>操作列表</div>
      <Button
        className={'button'}
        block
        color="primary"
        onClick={() => {
          goTo('/apply')
        }}
      >
        差旅申请
      </Button>
      <Button
        className={'button'}
        block
        color="primary"
        onClick={() => {
          goTo('/todoList')
        }}
      >
        审批待办
      </Button>
      <Button className={'button'} block color="primary" loading={loading} onClick={goToUrl}>
        一键订购
      </Button>
    </div>
  )
}
export default Main
