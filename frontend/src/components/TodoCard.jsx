import React from 'react'
import { Button } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import './TodoCard.css'
import icon from './../images/file.svg'
import more from './../images/more.svg'
const TodoCard = (props) => {
  const { id, title, submiter, reason, todo, isDone } = props
  const navigate = useNavigate()

  const handleClick = () => {
    // delete todo['forms']
    // delete todo['taskId']
    // delete todo['url']
    // delete todo['instanceId']
    todo?.url && navigate(todo?.url.split('#')?.[1])
  }

  return (
    <div className="todo-card" onClick={handleClick}>
      <div className="todo-title flex">
        <img src={icon} alt="" srcset="" />
        <div>{title}</div>
      </div>
      <div className="user">提交人：{submiter}</div>
      <div className="reason">出差事由：{reason}</div>
      <img className="more" src={more} alt="" srcset="" />
    </div>
  )
}

export default TodoCard
