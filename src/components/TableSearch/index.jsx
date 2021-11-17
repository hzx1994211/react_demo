// import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space } from 'antd'

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm()
}

const handleReset = clearFilters => {
  clearFilters()
}

const TableSearch = (dataIndex, title) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters
  }) => (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={`请输入${title}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type='primary'
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size='small'
          style={{ width: 90 }}
        >
          搜索
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size='small'
          style={{ width: 90 }}
        >
          重置
        </Button>
      </Space>
    </div>
  ),
  filterIcon: filtered => (
    <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
  render: text => text
  // this.state.searchedColumn === dataIndex ? (
  //   <Highlighter
  //     highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
  //     searchWords={[this.state.searchText]}
  //     autoEscape
  //     textToHighlight={text ? text.toString() : ''}
  //   />
  // ) : (
  //   text
  // )
})

export default TableSearch
