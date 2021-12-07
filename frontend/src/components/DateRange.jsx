import React, { useState } from 'react'
import { Form, Input, Button, DatePicker } from 'antd-mobile'
import moment from 'moment'

const now = new Date()
const PriceInput = ({ value = {}, onChange }) => {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [type, setType] = useState('start')
  const [visibleDate, setVisibleDate] = useState(false)

  const triggerChange = (changedValue) => {
    onChange?.({ start, end, ...value, ...changedValue })
  }

  const triggerPicker = (type) => {
    setType(type)
    setVisibleDate(true)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div
        onClick={() => {
          triggerPicker('start')
        }}
      >
        <Input type="text" placeholder="起始日期" value={value?.start || start} disabled style={{ width: 100 }} />
      </div>
      至
      <div
        onClick={() => {
          triggerPicker('end')
        }}
      >
        <Input
          className="i_right"
          type="text"
          placeholder="结束日期"
          value={value?.end || end}
          disabled
          style={{ width: 100 }}
        />
      </div>
      <DatePicker
        title="时间选择"
        visible={visibleDate}
        onClose={() => {
          setVisibleDate(false)
        }}
        defaultValue={now}
        onConfirm={(val) => {
          // Toast.show(val.toDateString())
          if (type === 'end') {
            const end = moment(val).format('YYYY-MM-DD')
            setEnd(end)
            triggerChange({ end })
          } else {
            const start = moment(val).format('YYYY-MM-DD')
            setStart(start)
            triggerChange({ start })
          }
        }}
      />
    </div>
  )
}

export default PriceInput
