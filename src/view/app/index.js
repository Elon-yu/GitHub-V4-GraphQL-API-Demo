import React, { useState } from 'react'
import { Typography } from 'antd';
import { hot } from 'react-hot-loader';
import ListView from './list'
import SearchView from './search'
import './index.css'
const App = () => {
  const [subKeyword, setSubKeyword] = useState('')
  return (
    <div className="App">
      <Typography.Title className="title">Github Query</Typography.Title>
      <SearchView setSubKeyword={setSubKeyword} />
      <ListView keyword={subKeyword} />
    </div>
  );
}
export default hot(module)(App);

