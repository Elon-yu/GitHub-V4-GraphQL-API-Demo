
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { ApolloProvider } from 'react-apollo'
import { client } from './libs/client'
import App from './view/app'
// import 'antd/dist/antd.css';
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




