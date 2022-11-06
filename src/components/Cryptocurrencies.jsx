import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import {Card, Row, Col, Input} from 'antd';

import { useGetCryptosQuery } from '../service/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
  
  const count = simplified ? 10 : 100;
  const { data : cryptoList, isFetching } = useGetCryptosQuery(count);

  const [ crypto, setCrypto ] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
  
    setCrypto(cryptoList?.data?.coins);

    const filteredData = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

    setCrypto(filteredData);

  }, [cryptoList, searchTerm])

  console.log("crypto :::", crypto)

  if(isFetching) return 'Loading.....';

  return (
    <>
     {!simplified && (
        <div className='search-crypto'>
            <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
     )}
     <Row gutter={[32, 32]} className='crypto-card-container'>
        {crypto?.map((list, idx) => (
          <Col key={idx} xs={24} sm={12} lg={6} className='crypto-card'>
              <Link to={`/crypto/${list.uuid}`}>
                  <Card 
                    title={`${list.rank}. ${list.name}`}
                    extra={<img className='crypto-image' src={list.iconUrl} />}
                    hoverable
                    >
                      <p>Price : {millify(list.price)}</p>
                      <p>Market Cap : {millify(list.marketCap)}</p>
                      <p>Daily Change : {millify(list.change)}</p>
                  </Card>
              </Link>
          </Col>
        ))}
     </Row>
    </>
  )
}

export default Cryptocurrencies
