
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
const render = () => {
  return ReactDOM.render(
    <AppContainer>
      <div>app</div>
    </AppContainer>,
    document.getElementById("root")
  );
}
if (module.hot) {
  module.hot.accept();
}
render()




