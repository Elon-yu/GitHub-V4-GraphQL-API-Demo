import React from 'react'
import { Query } from "react-apollo";
import { List, Spin, Alert } from 'antd';
import { GET_REPOSITORIES_OF_KEYWORD } from '../../../services/api-gql'

export default ({ keyword }) => {
  return <Query
    query={GET_REPOSITORIES_OF_KEYWORD}
    variables={{
      keyword,
    }}
  >
    {
      ({ loading, error, data }) => {
        if (loading) return <div className="spin-wrap"> <Spin size="large" /></div>
        if (error) return <Alert message={error} type="error" showIcon />
        const { edges } = data.search;
        return <List
          loading={loading}
          size="large"
          bordered
          dataSource={edges}
          renderItem={({ node }) => {
            return <List.Item className="list-item">
              <a className="list-title" href={node.url}>{node.owner.login}/{node.name}</a>
              <p>{node.description}</p>
            </List.Item>
          }}
        />
      }
    }
  </Query>
}