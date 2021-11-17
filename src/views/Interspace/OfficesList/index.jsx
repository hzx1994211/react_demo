import React, { useEffect, useState } from 'react'
import { Button, Table, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Styles from './index.module.scss'
import TableSearch from '@/components/TableSearch'
import { getProjectObjectList, getRegionList } from '@/api/interspace'
import { HashRouter } from 'react-router-dom'
const router = new HashRouter()
function OfficesList () {
  const [tableData, setTableData] = useState([])
  const [provinceCity, setProvinceCity] = useState([])

  const [page, setPage] = useState({
    current: 1,
    pageSize: 15,
    total: 0
  })
  const pagination = {
    ...page,
    pageSizeOptions: [15, 30, 50, 100]
  }
  const [loading, setLoading] = useState(false)
  // const [cityID, setCityID] = useState([])
  const defaultParams = {
    page: 1, //	int	当前页：默认第1页
    limit: 15, //	int	每页展示条数：默认每页15条
    object_name: '', //	string	写字楼
    province_ids: '', //	string	省ID
    city_ids: '', //	string	市ID
    region_ids: '', //	string	区域ID
    busines_ids: '', //	string	商圈ID
    is_exist_picture: null, //	int	照片：（1有照片，2无照片）
    status: null, //	int	状态：（1上架，null下架）
    order_house: '', //	string	房源排序：（升序：ascend，降序：descend）
    order_owners: '', //	string	业主排序：（升序：ascend，降序：descend）
    order_average_investment: '', //	string	招商均价排序：（升序：ascend，降序：descend）
    order_average_rent: '' //	string	在租均价排序：（升序：ascend，降序：descend）
  }
  const [params, setParams] = useState(defaultParams)

  useEffect(() => {
    async function getOfficeList () {
      setLoading(true)
      const result = await getProjectObjectList(params)
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
  const toDetail = e => {
    router.history.push('/interspace/officesDetail')
  }
  const columns = [
    {
      title: '写字楼',
      dataIndex: 'name',
      ...TableSearch('name', '写字楼')
    },
    {
      title: '省/市',
      dataIndex: '',
      filterMode: 'tree',
      filterSearch: true,
      render: text => (
        <span>
          {text.province_name}/{text.city_name}
        </span>
      ),
      filters: provinceCity
    },
    {
      title: '商圈',
      dataIndex: '',
      render: text => (
        <span>
          {text.region_name}
          {text.busines_name ? '/' : ''}
          {text.busines_name}
        </span>
      )
    },
    {
      title: '照片',
      dataIndex: 'picture_url',
      filterMultiple: false,
      filters: [
        { text: '有照片', value: 1 },
        { text: '没照片', value: 2 }
      ],
      render: text =>
        text ? (
          <img src={text} className={Styles.table_img} alt='' />
        ) : (
          '暂无图片'
        )
    },
    { title: '均单价', dataIndex: 'avg_price', sorter: true },
    {
      title: '业主',
      dataIndex: 'project_house_count',
      sorter: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      filterMultiple: false,
      filters: [
        { text: '上架', value: 1 },
        { text: '下架', value: 0 }
      ],
      render: text =>
        text === 1 ? (
          <Tag color='success'>上架</Tag>
        ) : (
          <Tag color='error'>下架</Tag>
        )
    },
    {
      title: '操作',
      dataIndex: '',
      render: text => (
        <span className={Styles.detail} onClick={() => toDetail(text)}>
          详情
        </span>
      )
    }
  ]

  async function getRegionData () {
    const result = await getRegionList()
    let originData = result?.list ?? []
    let formatData = []
    if (originData.length > 0) {
      formatData = originData.map(item => {
        if (item._child && item._child.length > 0) {
          item.children = item._child.map(subItem => ({
            text: subItem.name,
            value: subItem.id,
            id: subItem.id
          }))
        }
        return {
          text: item.name,
          value: item.id,
          id: item.id,
          children: item.children
        }
      })
    }
    setProvinceCity(formatData)
  }

  useEffect(() => {
    getRegionData()
  }, [])
  const onChange = ({ current, pageSize }, filters, sorter) => {
    defaultParams.page = current
    defaultParams.limit = pageSize
    let name = filters?.name ?? []
    if (name.length > 0) {
      defaultParams.object_name = name[0]
    }
    let picture_url = filters?.picture_url ?? ''
    if (picture_url.length > 0) {
      defaultParams.is_exist_picture = picture_url[0]
    }
    let status = filters?.status ?? ''
    if (status.length > 0) {
      defaultParams.status = status[0]
    }
    let sortField = sorter?.field ?? ''
    let sortOrder = sorter?.order ?? ''
    switch (sortField) {
      case 'avg_price':
        defaultParams.order_average_rent = sortOrder
        break
      case 'project_house_count':
        defaultParams.order_house = sortOrder
        break

      default:
        break
    }
    setParams(defaultParams)
  }

  return (
    <div className={Styles.office_list_wrap}>
      <Button className={Styles.add_btn} icon={<PlusOutlined />}>
        新建
      </Button>
      <Table
        style={{ width: '100%' }}
        dataSource={tableData}
        columns={columns}
        pagination={pagination}
        loading={loading}
        rowKey={record => record.id}
        onChange={onChange}
      />
    </div>
  )
}

export default OfficesList
