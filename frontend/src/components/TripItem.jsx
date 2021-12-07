import React, { useState } from 'react'
import { Form, Input, Button, DatePicker, CascadePicker } from 'antd-mobile'
import moment from 'moment'
import './TripItem.css'
import more from './../images/more.svg'
import deleteicon from './../images/delete.svg'
const now = new Date()

const options = [
  {
    label: '飞机',
    value: '飞机'
  },
  {
    label: '火车',
    value: '火车'
  }
]
const PriceInput = (props) => {
  const { onChange, value, data, onDelete } = props
  const [tripType, setTripType] = useState('')
  const [form] = Form.useForm()
  const [visibleTool, setVisibleTool] = useState(false)
  const [tripStarDate, setTripStarDate] = useState()
  const [visibleDate, setVisibleDate] = useState(false)

  const triggerChange = async (changedValue) => {
    try {
      const values = await form.validateFields()
      // console.log('-----validateFields------', values)
      onChange?.(values)
    } catch (errorList) {
      const values = errorList?.values
      onChange?.(values)
      // console.log('-----errorList------', errorList)
    }
  }

  return (
    <div className="trip-item">
      <div className="trip-header">
        <div className="">行程</div>
        <div className="" onClick={onDelete}>
          <img src={deleteicon} alt="" srcset="" />
        </div>
      </div>
      <Form
        form={form}
        onValuesChange={(changedValues, allValues) => {
          triggerChange()
          // console.log('onValuesChange', changedValues, allValues)
        }}
      >
        <Form.Item
          name="tripType"
          label={`交通工具`}
          // rules={[{ required: true, message: `交通工具不能为空` }]}
        >
          <div
            className="flex j_between"
            onClick={() => {
              setVisibleTool(true)
            }}
          >
            <Input type="text" placeholder="请选择交通工具" value={value?.tripType || tripType} disabled />
            <img src={more} alt="" srcset="" />
          </div>
        </Form.Item>
        <Form.Item
          name="tripStartDate"
          label={`出发时间`}
          // rules={[{ required: true, message: `出发时间不能为空` }]}
        >
          <div
            className="flex j_between"
            onClick={() => {
              setVisibleDate(true)
            }}
          >
            <Input type="text" placeholder="请选择出发时间" value={value?.tripStarDate || tripStarDate} disabled />
            <img src={more} alt="" srcset="" />
          </div>
        </Form.Item>
        <Form.Item
          name="tripStartCity"
          label={`出发城市`}
          // rules={[{ required: true, message: `出发城市不能为空` }]}
        >
          <Input placeholder={`请输入出发城市`} />
        </Form.Item>
        <Form.Item
          name="tripEndCity"
          label={`目的城市`}
          // rules={[{ required: true, message: `目的城市不能为空` }]}
        >
          <Input placeholder={`请输入目的城市`} />
        </Form.Item>
      </Form>
      <DatePicker
        title="时间选择"
        visible={visibleDate}
        onClose={() => {
          setVisibleDate(false)
        }}
        defaultValue={now}
        onConfirm={(val) => {
          const date = moment(val).format('YYYY-MM-DD')
          setTripStarDate(date)
          form.setFieldsValue({ tripStartDate: date })
          triggerChange()
        }}
      />
      <CascadePicker
        options={options}
        visible={visibleTool}
        onClose={() => {
          setVisibleTool(false)
        }}
        value={tripType}
        onConfirm={(v) => {
          setTripType(v[0])
          form.setFieldsValue({ tripType: v[0] })
          triggerChange()
        }}
      />
    </div>
  )
}

export default PriceInput
