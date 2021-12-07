/**
 *  Created by pw on 2021/11/24 下午5:54.
 */
import React from 'react'
import { Button } from 'antd-mobile'
import './index.css'

const Main = () => {
  const goTo = (path) => {}
  return (
    <div className="main">
      <div className={'title'}>发起报销</div>
      <Button className={'button'} block color="primary" onClick={goTo}>
        待办审批
      </Button>
    </div>
  )
}
export default Main
