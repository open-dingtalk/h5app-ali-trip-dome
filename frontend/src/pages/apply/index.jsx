/**
 *  Created by pw on 2021/11/24 下午5:54.
 */
import React, { useState, useContext, useEffect } from 'react'
import { Form, Input, Button, CascadePicker, NavBar, Dialog, DatePicker } from 'antd-mobile'
import DateRange from './../../components/DateRange'
import TripItem from './../../components/TripItem'
import moment from 'moment'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { UserInfoContext } from '../../App'
import axios from 'axios'
import short from 'short-uuid'
import icon from './../../images/clbz.svg'
import more from './../../images/more.svg'

const options1 = [
  {
    label: '差旅申请单',
    value: '差旅申请单'
  }
]
// const person = [['张三', '李四', '王五', '赵六']]
const Main = () => {
  const context = useContext(UserInfoContext)
  // console.log('-----', context)
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [visibleDate, setVisibleDate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('差旅申请单')
  const [type, setType] = useState('flow')
  const [options, secOptions] = useState(options1)
  const [person, setPerson] = useState([])
  const [trips, setTrips] = useState([])
  const [value1, setValue1] = useState('')
  const [day, setDay] = useState(0)

  const back = () => {
    navigate('/', { replace: true })
  }
  const request = (values) => {
    setLoading(true)
    let temp = { ...values, userName: value1, flowStartTime: values?.date?.start, flowEndTime: values?.date?.end }
    const uuid = short.generate()
    axios
      .post(context.domain + '/biz/createTask', {
        ...temp,
        uuid,
        url: `/#/bill?uuid=${uuid}`
      })
      .then((res) => {
        setLoading(false)
        if (res && res.data.success) {
          Dialog.alert({
            content: '差旅申请提交成功!',
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
  const getList = () => {
    axios
      .post(context.domain + '/biz/query/user/list')
      .then((res) => {
        if (res && res.data.success) {
          const data = res?.data?.data
          const pp = data.map((e) => {
            return { label: e?.name, value: e?.userid }
          })
          setPerson(pp)
        } else {
          alert('request failed --->' + JSON.stringify(res))
        }
      })
      .catch((error) => {
        alert('httpRequest failed --->' + JSON.stringify(error))
      })
  }
  const deleteTrip = (index) => {
    const temp = JSON.parse(JSON.stringify(trips))
    temp?.splice(index, 1)
    setTrips(temp)
  }
  const add = () => {
    const uuid = short.generate()
    setTrips(
      trips.concat({
        uuid,
        tool: '',
        date: '',
        startCity: '',
        endCity: ''
      })
    )
  }
  const onSubmit = async () => {
    try {
      const values = await form.validateFields()
      console.log(values)
      if (trips?.length > 0) {
        request(values)
      } else {
        Dialog.alert({
          content: '行程规划必须填写!',
          confirmText: '立即添加',
          onConfirm: () => {
            add()
          }
        })
      }
    } catch (errorList) {
      console.log(errorList)
      // errorList.forEach(({ name, errors }) => {
      //   // Do something...
      // })
    }
  }
  useEffect(() => {
    form.setFieldsValue({
      flowName: '差旅申请单'
    })
    getList()
    add()
  }, [])

  return (
    <div className="apply">
      <div className="header">
        <NavBar onBack={back}>差旅申请</NavBar>
      </div>
      <div className="form">
        <Form form={form}>
          <Form.Item name="flowName" label="单据模板" rules={[{ required: true, message: '单据模板为空' }]}>
            <div
              className="flex j_between"
              onClick={() => {
                secOptions(options1)
                setType('flowName')
                !visible && setVisible(true)
              }}
            >
              <Input placeholder="请选单据模板" value={value} disabled />
              <img src={more} alt="" srcset="" />
            </div>
          </Form.Item>
          <Form.Item name="userId" label={`出行人`} rules={[{ required: true, message: `出行人人不能为空` }]}>
            <div
              className="flex j_between"
              onClick={() => {
                if (person?.length > 0) {
                  secOptions(person)
                  setType('userId')
                  !visible && setVisible(true)
                } else {
                  getList()
                }
              }}
            >
              <Input placeholder={`请选择出行人`} value={value1} disabled />
              <img src={more} alt="" srcset="" />
            </div>
          </Form.Item>
          <Form.Item name="flowDesc" label={`出差事由`} rules={[{ required: true, message: `出差事由不能为空` }]}>
            <Input placeholder={`请输入出差事由`} />
          </Form.Item>
          <Form.Item
            name="date"
            label={`起止日期`}
            rules={[
              {
                required: true,
                validator: (_, value) => {
                  if (!value?.start) {
                    day !== 0 && setDay(0)
                    return Promise.reject(new Error('起始日期必填'))
                  }
                  if (!value?.end) {
                    day !== 0 && setDay(0)
                    return Promise.reject(new Error('结束日期必填'))
                  }
                  if (moment(value?.end).isBefore(value?.start)) {
                    day !== 0 && setDay(0)
                    return Promise.reject(new Error('结束日期要大于等于起始日期'))
                  }
                  const d = moment(value?.end).diff(moment(value?.start), 'days')
                  setDay(d + 1)
                  return Promise.resolve()
                }
              }
            ]}
          >
            <DateRange />
          </Form.Item>
          <Form.Item label={`行程规划`}>
            <div>
              {trips.map((it, index) => {
                return (
                  <Form.Item
                    key={it?.uuid}
                    name={['tripList', index]}
                    noStyle
                    rules={[
                      {
                        required: true,
                        validator: (_, value) => {
                          if (!value?.tripType) {
                            return Promise.reject(new Error('交通工具为必填项!'))
                          }
                          if (!value?.tripStartDate) {
                            return Promise.reject(new Error('出发时间为必填项!'))
                          }
                          if (!value?.tripStartCity) {
                            return Promise.reject(new Error('出发城市为必填项!'))
                          }
                          if (!value?.tripEndCity) {
                            return Promise.reject(new Error('目的城市为必填项!'))
                          }
                          return Promise.resolve()
                        }
                      }
                    ]}
                  >
                    <TripItem
                      data={it}
                      onDelete={() => {
                        const tripsData = form.getFieldValue('tripList')
                        console.log(tripsData)
                        deleteTrip(index)
                      }}
                    />
                  </Form.Item>
                )
              })}
              <Button block style={{ marginTop: 20 }} onClick={add}>
                添加行程规划
              </Button>
            </div>
          </Form.Item>
        </Form>
        <CascadePicker
          options={options}
          visible={visible}
          onClose={() => {
            setVisible(false)
          }}
          value={value}
          onConfirm={(v) => {
            if (type === 'flowName') {
              setValue(v[0])
            } else {
              const e = person.find((e) => e?.value === v[0])
              setValue1(e?.label)
            }
            form.setFieldsValue({ [type]: v[0] })
          }}
        />
      </div>

      <div className="clbz">
        <div className="container">
          <div className="flex a_center" style={{ fontSize: '16px' }}>
            <img src={icon} alt="" style={{ marginRight: 10 }} />
            差旅补助:
          </div>
          <div className="flex j_between m20 mt25">
            <div className="flex">
              补助天数:<div className="ml8 fw600">{day}天</div>
            </div>
            <div className="flex">
              费用标准: <div className="ml8 fw600">60 元/天</div>
            </div>
          </div>
          <div className="flex m20 mt11">
            <div className="flex">
              补助金额: <div className="ml8 fw600">¥ {day * 60}元</div>
            </div>
          </div>
          <div className="mt25 w100 tips">
            <div style={{ fontSize: '14px', marginBottom: 10 }}>预置规则：</div>
            <div className="">1. 补助金额=费用标准 * 天数；</div>
            <div className="">2. 强管控：申请行程必须和报销单行程一致；</div>
            <div className="">3. 支持手动修改；</div>
          </div>
        </div>
      </div>
      <div className="dip" />
      <div className="submit_view">
        <Button block className="btn" type="submit" loading={loading} color="primary" onClick={onSubmit}>
          提交送审
        </Button>
      </div>
    </div>
  )
}
export default Main
