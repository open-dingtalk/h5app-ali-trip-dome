/**
 *  Created by pw on 2021/11/24 下午5:54.
 */
import React, { useState, useEffect, useContext } from 'react'
import { Form, Input, Button, Picker, NavBar, Dialog, List } from 'antd-mobile'
import DateRange from './../../components/DateRange'
import './index.css'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { UserInfoContext } from '../../App'
import axios from 'axios'

const Main = () => {
  const navigate = useNavigate()
  const context = useContext(UserInfoContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const [showFooter, setShowFooter] = useState(false)
  const [workRecordId, setWorkRecordId] = useState('')
  const [data, setData] = useState({})

  const back = () => {
    navigate('/', { replace: true })
  }
  const onSubmit = (type) => {
    type === 'agree' ? setLoading(true) : setLoading1(true)
    const uuid = searchParams.get('uuid')
    axios
      .post(context.domain + '/biz/update', {
        userId: context.userId,
        userName: context.userName,
        workRecordId: workRecordId,
        flowStatus: type,
        uuid
      })
      .then((res) => {
        type === 'agree' ? setLoading(false) : setLoading1(false)
        if (res && res.data.success) {
          Dialog.alert({
            content: `${type === 'agree' ? '同意' : '驳回'}成功!`,
            onConfirm: () => {
              back()
            }
          })
        } else {
          alert('request failed --->' + JSON.stringify(res))
        }
      })
      .catch((error) => {
        type === 'agree' ? setLoading(false) : setLoading1(false)
        alert('httpRequest failed --->' + JSON.stringify(error))
      })
  }
  useEffect(() => {
    // const str = searchParams.get('data')
    const uuid = searchParams.get('uuid')
    axios
      .post(context.domain + '/biz/query/uuid', { uuid })
      .then((res) => {
        if (res?.data?.success) {
          setData(res?.data?.data)
          if (!res?.data?.data?.flowStatus) {
            setShowFooter(true)
          }
          setWorkRecordId(res?.data?.data?.workRecordId)
        } else {
          alert('request failed --->' + JSON.stringify(res))
        }
      })
      .catch((error) => {
        alert('httpRequest failed --->' + JSON.stringify(error))
      })
    // try {
    //   const data = JSON.parse(str)
    //   setData(data)
    // } catch (error) {}
  }, [])
  return (
    <div className="bill">
      <div className="header">
        <NavBar onBack={back}>差旅申请单</NavBar>
      </div>
      <div className="form_bill">
        <List>
          <List.Item title="单据模板：">
            <div className="content">{data?.flowName || ''}</div>
          </List.Item>
          <List.Item title="出行人：">
            <div className="content">{data?.userName || ''}</div>
          </List.Item>
          <List.Item title="起止日期：">
            <div className="content">{data?.flowStartTime ? `${data?.flowStartTime} 至 ${data?.flowEndTime}` : ''}</div>
          </List.Item>
          <List.Item title="出差事由：">
            <div className="content">{data?.flowDesc || ''}</div>
          </List.Item>
        </List>
      </div>
      <div className="form_bill" style={{ marginTop: '10px' }}>
        <List>
          <List.Item title="行程规划：">
            <div className="content">
              {data?.tripList?.map((it, index) => {
                return (
                  <div>
                    {it?.tripType}：{it?.tripStartCity}
                    {`  `} -{`  `} {it?.tripEndCity}
                    {`  `} {it?.tripStartDate}
                  </div>
                )
              })}
            </div>
          </List.Item>
        </List>
      </div>
      <div className="dip" />
      {showFooter && (
        <div className="submit_view">
          <Button
            block
            className="btn"
            disabled={!workRecordId}
            type="submit"
            loading={loading1}
            color="danger"
            onClick={() => onSubmit('refuse')}
          >
            驳回
          </Button>
          <Button
            block
            disabled={!workRecordId}
            className="btn"
            type="submit"
            loading={loading}
            color="primary"
            onClick={() => onSubmit('agree')}
          >
            同意
          </Button>
        </div>
      )}
    </div>
  )
}
export default Main
