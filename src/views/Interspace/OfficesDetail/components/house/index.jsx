import React, { useState, useEffect } from 'react'
import { Card, Table, Tag } from 'antd'
import { getHouseList } from '@/api/interspace'
import classNames from 'classnames'
import Styles from './index.module.scss'

function House () {
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState({
    current: 1,
    pageSize: 15,
    total: 0
  })
  const pagination = {
    ...page,
    pageSizeOptions: [15, 30, 50, 100]
  }
  const statusMap = key => {
    let map = new Map([
      [1, '不招商'],
      [2, '招商中'],
      [3, '已锁定'],
      [4, '在租'],
      [5, '即将到期'],
      [6, '马上到期']
    ])
    return map.get(key)
  }

  const columns = [
    { title: '房间号', dataIndex: 'room_number' },
    { title: '楼层', dataIndex: ['floor', 'floor'] },
    { title: '楼栋', dataIndex: ['building', 'building_number'] },
    {
      title: '业主/项目',
      dataIndex: '',
      render: text => (
        <span>
          {text?.owner_user?.name ?? ''}
          {text?.project?.name ? '/' : ''}
          {text?.project?.name}
        </span>
      )
    },
    { title: '面积', dataIndex: 'area' },
    { title: '单价', dataIndex: 'advance_rental_price' },
    {
      title: '总价',
      dataIndex: 'rent_unit_price_total',
      render: text => (text ? text : '0.00')
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: text => (
        <span className={classNames(Styles.ststus)}>{statusMap(text)}</span>
      )
    },
    {
      title: '小店铺',
      dataIndex: 'shop_status',
      render: text =>
        text === 1 ? (
          <Tag color='success'>上架</Tag>
        ) : (
          <Tag color='error'>下架</Tag>
        )
    },
    {
      title: '曝光量',
      dataIndex: 'exposure_count',
      render: text => (text ? text : 0)
    },
    { title: '最近维护', dataIndex: 'format_time' },
    {
      title: '操作',
      dataIndex: '',
      render: () => <span className={Styles.detail}>详情</span>
    }
  ]
  const onChange = ({ current, pageSize }, filters, sorter) => {
    defaultParams.page = current
    defaultParams.limit = pageSize
    setParams(defaultParams)
  }
  const defaultParams = {
    page: 1, //	int	当前页：默认第1页
    limit: 15, //	int	每页展示条数：默认每页15条
    room_number: '', //	int	房间号
    building_id: '', //	int	楼栋id
    owner_user_name: '', //	string	业主 / 项目
    status: '', //	int	状态（1不招商、2招商中、3已锁定、4在租、5即将到期、6马上到期）
    shop_status: '', //	int	小店铺上架状态（1上架、0下架）
    order_area: '', //	int	面积排序（升序：ascend，降序：descend）
    order_unit_price: '', //	int	单价排序（升序：ascend，降序：descend）
    order_exposure_count: '', //	int	曝光量排序（升序：ascend，降序：descend）
    order_update_time: '', //	int	最近维护时间排序（升序：ascend，降序：descend）
    owner_floor_number: '', //	string	楼层精确查询
    owner_building_number: '' //	string	楼栋模糊查询
  }
  const [params, setParams] = useState(defaultParams)
  useEffect(() => {
    async function getOfficeList () {
      setLoading(true)
      const result = await getHouseList(params)
      setLoading(false)
      setTableData(result.list)
      setPage({
        current: params.page,
        pageSize: params.limit,
        total: result.total_count
      })
    }
    getOfficeList()
  }, [params])
  return (
    <div>
      <Card>
        <Table
          style={{ width: '100%' }}
          dataSource={tableData}
          columns={columns}
          pagination={pagination}
          loading={loading}
          rowKey={record => record.id}
          onChange={onChange}
        />
      </Card>
    </div>
  )
}

export default House
