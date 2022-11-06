import React, { useState } from 'react';
import {Select, Typography, Row, Col, Avatar, Card} from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../service/cryptoNewsApi';
import { useGetCryptosQuery } from '../service/cryptoApi';

const {Text, Title} = Typography;
const {Option} = Select;

const News = ({simplified}) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  

  const count = simplified ? 6 : 12;
  const { data: cryptoNews, error, isFetching } = useGetCryptoNewsQuery({newsCategory, count});
  const { data } = useGetCryptosQuery(100)

  if(error) return 'Loading...';
  if(isFetching) return 'Loading....';

  const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';
  
  return (
      <Row gutter={[ 24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className='select-news'
              placeholder='Select a Crypto'
              optionFilterProp='children'
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase() > 0)}
            >
              <Option value='Cryptocurrency'> 
                Cryptocurrency
              </Option>
              {data?.data?.coins.map((coin, index) => 
                <Option key={index} value={coin.name}>{coin.name}</Option>
              )}
            </Select>
          </Col>
        )}
        {cryptoNews?.value.map((list, index) => (
          <Col xs={24} sm={12} lg={8} key={index} >
            <Card hoverable className='news-card'>
                <a href={list.url} target='_blank' rel='noreferrer'>
                  <div className='news-image-container'>
                    <Title className='news-title' level={4}>
                      {list.name}
                    </Title>
                    <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={list?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                  </div>
                  <p>
                    {list.description > 100
                        ? `${list.description.substring(0, 100)}...`
                        : list.description
                    }
                  </p>
                  <div className='provider-container'>
                      <div>
                        <Avatar src={list.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                        <Text className='provider-name'>{list.provider[0]?.name}</Text>
                      </div>
                        <Text>{moment(list.datePublished).startOf('ss').fromNow()}</Text>
                  </div>
                </a>
            </Card>
          </Col>
        ))}
      </Row>
  )
}

export default News