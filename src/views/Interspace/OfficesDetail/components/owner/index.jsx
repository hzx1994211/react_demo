import React, { useState, useEffect } from 'react'
import { Card, Table, Tag } from 'antd'
import { getOwnerList, gaccountTypeList } from '@/api/owner'
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

  const defaultParams = {
    name: '', //	string	业主名称（模糊搜索）
    status: '', //	int	状态（1启用，0禁用）
    order_surplus_days: '', //	string	剩余时间排序（升序：ascend，降序：descend）
    order_project_count: '', //	string	项目数排序（升序：ascend，降序：descend）
    order_house_count: '', //	string	房源数排序（升序：ascend，降序：descend）
    order_total_area: '', //	string	管控面积排序（升序：ascend，降序：descend）
    order_tenant_count: '', //	string	客户数排序（升序：ascend，降序：descend）
    order_last_login_time: '', //	string	最后登录时间排序（升序：ascend，降序：descend）
    page: 1, //	int	页码
    limit: 15 //	int	每页条数
  }
  const [params, setParams] = useState(defaultParams)
  useEffect(() => {
    async function getOwnerListData () {
      setLoading(true)
      const result = await getOwnerList(params)
      setLoading(false)
      setTableData(result.list)
      setPage({
        current: params.page,
        pageSize: params.limit,
        total: result.total_count
      })
    }
    getOwnerListData()
  }, [params])
  const [accountList, setAccountList] = useState([])
  useEffect(() => {
    async function gaccountTypeListData () {
      const result = await gaccountTypeList()
      setAccountList(result.list)
      console.log(result, 'sadas')
    }
    gaccountTypeListData()
  }, [])
  const columns = [
    {
      title: '业主名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '账户类型',
      dataIndex: 'owner_account_type_id',
      render: text => '钻石'
    },
    {
      title: '剩余时间',
      dataIndex: 'surplus_days'
    },
    {
      title: '拥有房源',
      dataIndex: 'house_count'
    },
    {
      title: '房源面积',
      dataIndex: 'total_area'
    },
    {
      title: '客户线索',
      dataIndex: 'tenant_count'
    },
    {
      title: '状态',
      dataIndex: 'status',
      scopedSlots: { customRender: 'status' },
      filterMultiple: false
    },
    {
      title: '最后登录',
      dataIndex: 'last_login_time',

      scopedSlots: { customRender: 'last_login_time' }
    },
    {
      title: '操作',
      dataIndex: 'id',
      scopedSlots: { customRender: 'action' }
    }
  ]
  const onChange = ({ current, pageSize }, filters, sorter) => {
    defaultParams.page = current
    defaultParams.limit = pageSize
    setParams(defaultParams)
  }
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
