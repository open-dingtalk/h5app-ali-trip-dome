/**
 *  Created by pw on 2021/11/24 下午5:54.
 */
import React, { useEffect, useState, useContext } from 'react'
import './index.css'
import { NavBar, Tabs } from 'antd-mobile'
import TodoCard from '../../components/TodoCard'
import { useNavigate } from 'react-router-dom'
import { UserInfoContext } from '../../App'
import axios from 'axios'

function rand(min, max) {
  return (Math.random() * (max - min + 1) + min) | 0
}
const billColumns = [['申请单', '报销单', '借款单']]
const approveColumns = [['审批流A', '审批流B', '审批流C', '审批流D', '审批流E']]
const person = ['张三', '李四', '王五', '赵六']
const applyReason = ['申请去北京的出差报销', '报销 4 月份的办公室费用', '6 月份团建费用报销']
const applyMoney = [12, 23, 200, 400, 666]

const ToDoList = () => {
  const navigate = useNavigate()
  const context = useContext(UserInfoContext)
  const [processedList, setProcessedList] = useState([])
  const [unprocessedList, setUnprocessedList] = useState([])
  const [processedCount, setProcessedCount] = useState(0)
  const [unprocessedCount, setUnprocessedCount] = useState(0)

  useEffect(() => {
    axios
      .post(context.domain + '/biz/query/tasks', {
        userId: context.userId,
        userName: context.userName,
        taskStatus: 1
      })
      .then((res) => {
        if (res?.data?.success) {
          const data = res?.data?.data || {}
          const list = data?.result?.list || []
          list.forEach((e) => {
            const forms = e?.forms || []
            forms.forEach((it) => {
              if (it?.title) {
                e[it?.title] = it.content
              }
            })
          })
          setUnprocessedList(list)
          setUnprocessedCount(list.length)
        } else {
          alert('request failed --->' + JSON.stringify(res))
        }
      })
      .catch((error) => {
        alert('httpRequest failed --->' + JSON.stringify(error))
      })
    axios
      .post(context.domain + '/biz/query/tasks', {
        userId: context.userId,
        userName: context.userName,
        taskStatus: 0
      })
      .then((res) => {
        if (res?.data?.success) {
          const data = res?.data?.data || {}
          const list = data?.result?.list || []
          list.forEach((e) => {
            const forms = e?.forms || []
            forms.forEach((it) => {
              if (it?.title) {
                e[it?.title] = it.content
              }
            })
          })
          setProcessedList(list)
          setProcessedCount(list.length)
        } else {
          alert('request failed --->' + JSON.stringify(res))
        }
      })
      .catch((error) => {
        alert('httpRequest failed --->' + JSON.stringify(error))
      })
  }, [context])

  return (
    <div className="todo-list">
      <NavBar
        onBack={() => {
          navigate('/', { replace: true })
        }}
      >
        查看待办
      </NavBar>
      <div className={'nav-title'}></div>
      <Tabs style={{ paddingBottom: '45px' }}>
        <Tabs.Tab style={{ backgroundColor: '#fff' }} title={'未处理 ' + processedCount} key="未处理">
          {processedList?.map((todo) => (
            <TodoCard
              todo={todo}
              id={todo.instanceId}
              key={todo.instanceId}
              title={todo.title}
              isDone={'no'}
              reason={todo?.['出差事由'] || applyReason[rand(0, applyReason.length - 1)]}
              submiter={todo?.['提交人'] || person[rand(0, person.length - 1)]}
            />
          ))}
        </Tabs.Tab>
        <Tabs.Tab style={{ backgroundColor: '#fff' }} title={'已处理 ' + unprocessedCount} key="已处理">
          {unprocessedList?.map((todo) => (
            <TodoCard
              todo={todo}
              id={todo.instanceId}
              key={todo.instanceId}
              title={todo.title}
              isDone={'yes'}
              reason={todo?.['出差事由'] || applyReason[rand(0, applyReason.length - 1)]}
              submiter={todo?.['提交人'] || person[rand(0, person.length - 1)]}
            />
          ))}
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}

export default ToDoList
