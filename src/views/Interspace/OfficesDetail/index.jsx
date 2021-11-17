import React, { useState } from 'react'
import Styles from './index.module.scss'
import { EditOutlined, QrcodeOutlined } from '@ant-design/icons'
import { Button, Row, Col, Descriptions } from 'antd'
import classNames from 'classnames'
import DetailInfo from './components/detail'
import HouseInfo from './components/house'
import Owner from './components/owner'
// const { TabPane } = Tabs

const tabList = [
  { key: 'detail', text: '详情' },
  { key: 'house', text: '房源' },
  { key: 'owner', text: '业主' }
  // { key: 'tenant', text: '租客' }
]

function switchTabContent (tab) {
  switch (tab) {
    case 'detail':
      return <DetailInfo />
    case 'house':
      return <HouseInfo />
    case 'owner':
      return <Owner />
    case 'tenant':
      return <span>tenant</span>

    default:
      break
  }
}

function Detail () {
  const [currentTab, setCurrentTab] = useState('detail')
  const tabChange = key => {
    setCurrentTab(key)
  }
  return (
    <div className={Styles.offices_detail_wrap}>
      <div className={Styles.base_info}>
        <Row justify='space-between'>
          <Col span={18}>
            <p>
              科兴科学园 <EditOutlined style={{ marginLeft: '5px' }} />
            </p>
            <Descriptions style={{ marginTop: '15px' }}>
              <Descriptions.Item label='编码'>Zhou Maomao</Descriptions.Item>
              <Descriptions.Item label='创建人'>1810000000</Descriptions.Item>
              <Descriptions.Item label='状态'>Hangzhou </Descriptions.Item>
              <Descriptions.Item label='创建时间'>
                2021-01-20 25:00:00
              </Descriptions.Item>
              <Descriptions.Item label='更新时间'>
                2021-01-20 14:00:00
              </Descriptions.Item>
            </Descriptions>
            <div className='listWrap'>
              <ul className={Styles.sub_nav_wrap}>
                {tabList.map(tab => {
                  const tabActiveStyle =
                    tab.key === currentTab ? Styles.active : ''
                  return (
                    <li
                      key={tab.key}
                      onClick={() => tabChange(tab.key)}
                      className={classNames(Styles.tab_item, tabActiveStyle)}
                    >
                      {tab.text}
                    </li>
                  )
                })}
              </ul>
            </div>
          </Col>
          <Col span={6}>
            <Row justify='space-between'>
              <Col>
                <Button>
                  <QrcodeOutlined /> 写字楼展示码
                </Button>
              </Col>
              <Col>
                <Button disabled>删除</Button>
              </Col>
              <Col>
                <Button type='primary'>编辑</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className={Styles.content}>{switchTabContent(currentTab)}</div>
    </div>
  )
}

export default Detail
