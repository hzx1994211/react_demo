import { Card, Descriptions } from 'antd'
import Styles from './index.module.scss'

function Detail () {
  return (
    <div className={Styles.detail_content_wrap}>
      <Card className={Styles.detail_content_card} title='基础信息'>
        <Descriptions>
          <Descriptions.Item label='名称'>Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label='业态'>1810000000</Descriptions.Item>
          <Descriptions.Item label='城市'>Hangzhou </Descriptions.Item>
          <Descriptions.Item label='区域/商圈'>
            2021-01-20 25:00:00
          </Descriptions.Item>
          <Descriptions.Item label='详细地址'>
            2021-01-20 14:00:00
          </Descriptions.Item>
          <Descriptions.Item label='标签'>标签</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card className={Styles.detail_content_card} title='栋座信息'></Card>
      <Card className={Styles.detail_content_card} title='图片'></Card>
      <Card className={Styles.detail_content_card} title='扩展信息'></Card>
    </div>
  )
}

export default Detail
