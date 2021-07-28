import React from "react";

import {
  browserHistory,
  Router,
  Route,
  IndexRoute,
  Redirect
} from "react-router";
import Loadable from "react-loadable";

import { createStore, applyMiddleware, combineReducers } from 'src/redux'
import thunk from "redux-thunk";

import rootReducer from "./redux";
import { Provider } from "react-redux";
import ConfigProvider from 'antd/es/config-provider';
import { log } from "./enhancers/log";
import Loading from "./components/RepeatFunctions/loading";
import en from "antd/es/locale/en_US"
import ru from "antd/es/locale/ru_RU"
import i18n from "./i18n"
import config from "react-global-configuration";
import { requestsReducer, createRequestMiddleware } from 'redux-requests';

const relativePath = 'client';

config.set({ relativePath });





const Auth = Loadable({
    loader: () => import("./pages/Authorization/index"),
    loading: Loading
});
const MainLayout = Loadable({
  loader: () => import("./components/MainLayout/index"),
  loading: Loading
});
const FullLayout = Loadable({
  loader: () => import("./components/FullLayout/index"),
  loading: Loading
});
const PageNotFound = Loadable({
  loader: () => import("./pages/404/index"),
  loading: Loading
});

/*********************resources END****************************/

const ClientRoot  = require("./ClientRoot").default

Loadable.preloadAll();


const createStoreWithMiddleware = applyMiddleware(thunk, log, createRequestMiddleware())(createStore);
const store = createStoreWithMiddleware(rootReducer);

export default (
  <ConfigProvider locale={i18n.language==="ru"?ru:en}>
  <Provider store={store}>
    <Router history={browserHistory} >
      <Redirect from={"/"+relativePath} to={"/"+relativePath+"/RouteTool"} />
      <Route path={relativePath} component={ClientRoot}>

          <Route path="********" component={FullLayout}>
            <IndexRoute component={Gps} />
            <Route>
              <Route path="d/:time" component={Gps} />
              <Route path=":id" component={GpsDetail} />
              <Route path=":id/:day" component={GpsDetailHistory} />
            </Route>
          </Route>

          <Route path="********" component={MainLayout}>
            <IndexRoute component={bus} />
            <Route>
              <Route path="buses" component={bus} />
              <Route path="drivers" component={drivers} />
              <Route path="ss" component={Schools} />
              <Route path="depots" component={depots} />
              <Route path="console" component={console} />
            </Route>
          </Route>


        </Route>
    </Router>
  </Provider>
  </ConfigProvider>
);
