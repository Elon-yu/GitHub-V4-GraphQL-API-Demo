import React, { useState } from 'react'
import { Typography } from 'antd';
import ListView from './list'
import SearchView from './search'
import './index.css'
export default () => {
  const [subKeyword, setSubKeyword] = useState('')
  return (
    <div className="App">
      <Typography.Title className="title">Github Query</Typography.Title>
      <SearchView setSubKeyword={setSubKeyword} />
      <ListView keyword={subKeyword} />
    </div>
  );
}

