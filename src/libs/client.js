import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
const GITHUB_BASE_URL = 'https://api.github.com/graphql';
console.log("🥭🥭🥭: process.env", process.env);
const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    // 配置github authorization
    authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const link = ApolloLink.from([errorLink, httpLink]);
const cache = new InMemoryCache();
export const client = new ApolloClient({
  link,
  cache,
});