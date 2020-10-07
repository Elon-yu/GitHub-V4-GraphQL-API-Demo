import React, { useState, useEffect } from 'react'
import { Input, List } from 'antd';
import { useDebounce } from '../../../utils'

export default ({ setSubKeyword }) => {
  const [showKeyword, setShowKeyword] = useState('')
  const [isShowHistory, setIsShowHistory] = useState(false)
  const [historyList, sethistoryList] = useState([])
  const handSetShowKeyword = (value) => {
    setShowKeyword(value)
    handSetSubKeyword(value)
  }
  const handSetSubKeyword = useDebounce((value) => {
    setSubKeyword(value)
    addHistory(value)
  }, 1500)

  const addHistory = (keyword) => {
    if (!keyword) return
    let calcHistoryList = [{ keyword }, ...historyList]
    sethistoryList(calcHistoryList)
    localStorage.setItem('keywordList', JSON.stringify(calcHistoryList))
  }
  const handFocus = () => {
    if (showKeyword === '') {
      setIsShowHistory(true)
    }
  }
  const handHistoryClick = ({ keyword }) => {
    setShowKeyword(keyword)
    setSubKeyword(keyword)
  }
  useEffect(() => {
    const historyList = JSON.parse(localStorage.getItem('keywordList')) || []
    sethistoryList(historyList)
  }, [])
  return <>
    <Input
      value={showKeyword}
      placeholder="请输入关键字搜索"
      size="large"
      onChange={(e) => {
        const { value } = e.target
        handSetShowKeyword(value)
      }}
      onFocus={() => {
        handFocus()
      }}
      onBlur={() => {
        setIsShowHistory(false)
      }}
      className="input-item"
    />
    {
      isShowHistory && historyList.length > 0 && !showKeyword && <div className="historoy-wrap">
        <List
          size="small"
          bordered
          dataSource={historyList}
          renderItem={item => <List.Item > <p className="history-item" onMouseDown={(event) => {
            event.preventDefault()
            handHistoryClick(item)
          }}>{item.keyword}</p></List.Item>}
        />
      </div>
    }
  </>
}