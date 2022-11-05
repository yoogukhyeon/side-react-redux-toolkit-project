import React, { useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import {Card, Row, Col, Input} from 'antd';

import { useGetCryptosQuery } from '../service/cryptoApi';

const Cryptocurrencies = () => {
  const { data : cryptoList, isFetching } = useGetCryptosQuery();

  const [ crypto, setCrypto ] = useState(cryptoList?.data?.coins);


  console.log("crypto ::", crypto)

  if(isFetching) return 'Loading.....';

  return (
    <>
     <Row gutters={[32, 32]} className='crypto-card-container'>
    
     </Row>
    </>
  )
}

export default Cryptocurrencies
