
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { ApolloProvider } from 'react-apollo'
import { client } from '@libs'
import App from './view/app'
const render = () => {
  return ReactDOM.render(
    <ApolloProvider client={client}>
      <AppContainer>
        <App />
      </AppContainer>
      </ApolloProvider>,
    document.getElementById("root")
  );
}
render()




