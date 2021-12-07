import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { NavBar, Form, Input, Button, Dialog, TextArea } from 'antd-mobile'
import axios from 'axios'
import { UserInfoContext } from '../../App'
import './index.css'

function rand(min, max) {
  return (Math.random() * (max - min + 1) + min) | 0
}
const billColumns = [['申请单', '报销单', '借款单']]
const approveColumns = [['审批流A', '审批流B', '审批流C', '审批流D', '审批流E']]
const person = ['张三', '李四', '王五', '赵六']
const applyReason = ['申请去北京的出差报销', '报销 4 月份的办公室费用', '6 月份团建费用报销']
const applyMoney = [12, 23, 200, 400, 666]
const TodoDetail = (props) => {
  const navigate = useNavigate()
  const context = useContext(UserInfoContext)
  const [form] = Form.useForm()
  const routeParams = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const [isDone, setIsDone] = useState('yes')

  const back = () => {
    navigate('/todoList', { replace: true })
  }
  const onAgree = () => {
    const { id } = routeParams
    setLoading(true)
    axios
      .post(context.domain + '/biz/update', {
        userId: context.userId,
        userName: context.userName,
        workRecordId: id,
        flowStatus: 'agree'
      })
      .then((res) => {
        setLoading(false)
        if (res && res.data.success) {
          Dialog.alert({
            content: '同意成功!',
            onConfirm: () => {
              back()
            }
          })
        } else {
          alert('request failed --->' + JSON.stringify(res))
        }
      })
      .catch((error) => {
        setLoading(false)
        alert('httpRequest failed --->' + JSON.stringify(error))
      })
  }

  const onReject = () => {
    const { id } = routeParams
    setLoading1(true)
    axios
      .post(context.domain + '/biz/update', {
        userId: context.userId,
        userName: context.userName,
        workRecordId: id,
        flowStatus: 'refuse'
      })
      .then((res) => {
        setLoading1(false)
        if (res && res.data.success) {
          Dialog.alert({
            content: '驳回成功!',
            onConfirm: () => {
              back()
            }
          })
        } else {
          alert('request failed --->' + JSON.stringify(res))
        }
      })
      .catch((error) => {
        setLoading1(false)
        alert('httpRequest failed --->' + JSON.stringify(error))
      })
  }

  useEffect(() => {
    const str = searchParams.get('data')
    const isDone = searchParams.get('isDone')
    setIsDone(isDone)
    console.log('routeParams', routeParams, str)
    try {
      const data = JSON.parse(str)
      form.setFieldsValue({
        单据模板: data?.title?.split('的')?.[1] || billColumns[0][rand(0, billColumns[0].length - 1)],
        审批流: approveColumns[0][rand(0, approveColumns[0].length - 1)],
        报销人: data?.['报销人'] || person[rand(0, person.length - 1)],
        报销事由: data?.['申请事由'] || applyReason[rand(0, applyReason.length - 1)],
        报销金额: data?.['申请金额'] || applyMoney[rand(0, applyMoney.length - 1)]
      })
      console.log('routeParams', routeParams, data)
    } catch (error) {
      form.setFieldsValue({
        单据模板: billColumns[0][rand(0, billColumns[0].length - 1)],
        审批流: approveColumns[0][rand(0, approveColumns[0].length - 1)],
        报销人: person[rand(0, person.length - 1)],
        报销事由: applyReason[rand(0, applyReason.length - 1)],
        报销金额: applyMoney[rand(0, applyMoney.length - 1)]
      })
    }
  }, [])
  console.log('---1---', isDone)
  return (
    <div className="todo-detail">
      <NavBar onBack={back}>待办详情</NavBar>
      <div className="todo-detail-content">
        <Form form={form}>
          <Form.Item
            className="row"
            layout="horizontal"
            name="单据模板"
            label="单据模板"
            rules={[{ required: true, message: '请选择单据模板' }]}
          >
            <Input placeholder="请选择单据模板" disabled value={billColumns[0][rand(0, billColumns[0].length - 1)]} />
          </Form.Item>
          <Form.Item name="审批流" label="审批流" rules={[{ required: true, message: '请选择审批流' }]}>
            <Input
              placeholder="请选择审批流"
              disabled
              value={approveColumns[0][rand(0, approveColumns[0].length - 1)]}
            />
          </Form.Item>
          <Form.Item name="报销人" label="报销人" rules={[{ required: true, message: '请选择报销人' }]}>
            <Input placeholder="请选择报销人" disabled value={person[rand(0, person.length - 1)]} />
          </Form.Item>
          <Form.Item name="报销事由" label="报销事由" rules={[{ required: true, message: '请输入报销事由' }]}>
            <TextArea placeholder="请输入报销事由" disabled value={applyReason[rand(0, applyReason.length - 1)]} />
          </Form.Item>
          <Form.Item name="报销金额" label="报销金额" rules={[{ required: true, message: '请输入报销金额' }]}>
            <Input placeholder="请输入报销金额" disabled value={applyMoney[rand(0, applyMoney.length - 1)]} />
          </Form.Item>
        </Form>
        {isDone === 'no' ? (
          <div style={{ display: 'flex', marginTop: '10px', padding: '10px' }}>
            <Button block type="submit" color="primary" onClick={onAgree} loading={loading}>
              同意
            </Button>
            <Button
              block
              style={{ marginLeft: '10px' }}
              type="submit"
              color="danger"
              onClick={onReject}
              loading={loading1}
            >
              驳回
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default TodoDetail
