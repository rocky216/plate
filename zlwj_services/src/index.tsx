import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import * as serviceWorker from './serviceWorker';
import {HashRouter} from "react-router-dom"

import App from "@/views/app"

//热更新
if( (module as any).hot) {
  (module as any).hot.accept()
}





ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
