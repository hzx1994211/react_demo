import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { customersList } from '@/api/customer'
import TableSearch from '@/components/TableSearch'
import './index.scss'

const CustomerCaseList = () => {
  const [page, setPage] = useState({
    current: 1,
    pageSize: 15,
    total: 0
  })
  let pagination = {
    ...page,
    pageSizeOptions: [10, 30, 50, 100]
  }
  //入参
  const parameter = {
    page: 1, // 	int	当前页：默认第1页
    limit: 10, // 	int	每页展示条数：默认每页15条
    owner_name: null, // 	string	业主名称
    mobile: null, // 	string	客户手机
    name: null, // 	string	客户姓名
    company: null, // 	string	公司名称
    source: null, // 	string	线索来源
    status: null, // 	int	状态（1有需求、2待跟进、3已关闭）
    order_clue_source: null, // 	string	线索记录（升序：ascend，降序：descend）
    order_update_time: null // 	string	线索更新（升序：ascend，降序：descend）
  }
  const [parame, setParameter] = useState(parameter)
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)
  const columns = [
    {
      title: '业主',
      dataIndex: 'owner_user.name',
      render: val => (val ? val : '-'),
      ...TableSearch('name', '业主')
    },
    {
      title: '客户手机',
      dataIndex: 'mobile'
    },
    {
      title: '客户姓名',
      dataIndex: 'name'
    },
    {
      title: '公司名称',
      dataIndex: 'company'
    },

    {
      title: '线索来源',
      dataIndex: 'clue_source',
      render: val => (val ? val : '-')
    },
    {
      title: '线索记录',
      dataIndex: 'clue_source_count',
      render: val => (val ? val : '-'),
      sorter: true
    },
    {
      title: '线索更新',
      dataIndex: 'source_update_time',
      render: val => (val ? val : '-'),
      sorter: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      filterMultiple: false,
      filters: [
        { text: '有需求', value: 1 },
        { text: '待跟进', value: 2 },
        { text: '已关闭', value: 3 }
      ]
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (text, row, index) => {
        return <a className={'details'}>详情</a>
      }
    }
  ]
  //列表数据
  async function getList(parame) {
    setLoading(true)
    await customersList(parame).then(res => {
      setLoading(false)
      const { list, total_count } = res
      setPage({
        current: parame.page,
        pageSize: parame.limit,
        total: total_count
      })
      setDataSource(list)
    })
  }
  const handleTableChange = ({ current, pageSize }, filters, sorter) => {
    setParameter({
      page: current,
      limit: pageSize,
      order_update_time: sorter.order,
      status: filters.status,
      owner_name: filters['owner_user.name'] ? filters['owner_user.name'][0] : []
    })
    console.log(pagination, filters, sorter, filters['owner_user.name'])
  }
  useEffect(() => {
    getList(parame)
  }, [parame])
  return (
    <div className={'customer_case_warp'}>
      <Table
        style={{ width: '100%' }}
        rowKey={record => record.id}
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default CustomerCaseList
