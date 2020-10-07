import { gql } from "apollo-boost";

export const GET_REPOSITORIES_OF_KEYWORD = gql`
  query ($keyword: String!) {
    search(query: $keyword,type: REPOSITORY,first: 10) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            id
            description
            url
            owner {
              id
              login
            }
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  }`;