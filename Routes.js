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

import rootReducer from "./src/redux/index";
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

/*********************FIELD TRIP****************************/
const FTFieldRequest = Loadable({
  // форма добавления для FT
  loader: () => import("./pages/FieldTrip/FieldRequest/requestForm/index"),
  loading: Loading
});

const FTFieldRequestApprove = Loadable({
  // форма добавления для FT
  loader: () => import("./pages/FieldTrip/FieldRequest/requestApprove/index"),
  loading: Loading
});

const FTRequests = Loadable({
  loader: () => import("./pages/FieldTrip/Requests/index"),
  loading: Loading
});

const FTAttendance = Loadable({
  loader: () => import("./pages/FieldTrip/Attendance/index"),
  loading: Loading
});

const FTRoutesView = Loadable({
  loader: () => import("./pages/FieldTrip/RoutesView/index"),
  loading: Loading
});

const FTRun = Loadable({
  loader: () => import("./pages/FieldTrip/Run/index"),
  loading: Loading
});
/*********************FIELD TRIP END****************************/

/*********************ROUTE TOOLS****************************/
const Attendance = Loadable({
  loader: () => import("./pages/Attendance/index"),
  loading: Loading
});
const Riders = Loadable({
  loader: () => import("./pages/Riders/index"),
  loading: Loading
});
const Dashboard = Loadable({
  loader: () => import("./pages/Dashboard/index"),
  loading: Loading
});
const Routes = Loadable({
  loader: () => import("./pages/Run/index"),
  loading: Loading
});
const RoutesView = Loadable({
  loader: () => import("./pages/RoutesView/index"),
  loading: Loading
});

const Sessions = Loadable({
  loader: () => import("./pages/Sessions/index"),
  loading: Loading
});
/*********************ROUTE TOOLS END****************************/

/*********************GPS****************************/
const Gps = Loadable({
  loader: () => import("./pages/Gps/index"),
  loading: Loading
});

const GpsDetail = Loadable({
  loader: () => import("./pages/Gps/component/GpsDetailPage/index"),
  loading: Loading
});
const GpsDetailHistory = Loadable({
  loader: () => import("./pages/Gps/component/GpsDetailPageHistory/index"),
  loading: Loading
});
/*********************GPS END****************************/


/*********************ZONES****************************/
const Zones = Loadable({
  loader: () => import("./pages/Zones/index"),
  loading: Loading
});
/*********************ZONES END****************************/


/*********************PROFILE LC****************************/
const Plans = Loadable({
  loader: () => import("./pages/Lc/billing"),
  loading: Loading
});
const Overview = Loadable({
  loader: () => import("./pages/Lc/overview"),
  loading: Loading
});
const Profile = Loadable({
  loader: () => import("./pages/Lc/profile"),
  loading: Loading
});
const Settings = Loadable({
  loader: () => import("./pages/Lc/settings"),
  loading: Loading
});

/*********************PROFILE LC END****************************/

/*********************resources start****************************/
const bus = Loadable({
  loader: () => import("./pages/Resources/bus"),
  loading: Loading
});
const drivers = Loadable({
  loader: () => import("./pages/Resources/drivers"),
  loading: Loading
});
const depots = Loadable({
  loader: () => import("./pages/Resources/depots"),
  loading: Loading
});
const console = Loadable({
  loader: () => import("./pages/Resources/console"),
  loading: Loading
});
const Schools = Loadable({
  loader: () => import("./pages/Resources/school"),
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

          <Route path="gps" component={FullLayout}>
            <IndexRoute component={Gps} />
            <Route>
              <Route path="d/:time" component={Gps} />
              <Route path=":id" component={GpsDetail} />
              <Route path=":id/:day" component={GpsDetailHistory} />
            </Route>
          </Route>

          <Route path="Resources" component={MainLayout}>
            <IndexRoute component={bus} />
            <Route>
              <Route path="buses" component={bus} />
              <Route path="drivers" component={drivers} />
              <Route path="ss" component={Schools} />
              <Route path="depots" component={depots} />
              <Route path="console" component={console} />
            </Route>
          </Route>

          <Route path="Zones" component={FullLayout}>
            <IndexRoute component={Zones} />
          </Route>

          <Route path="lc" component={MainLayout}>
            <IndexRoute component={Profile} />
            <Route>
              <Route path="profile" component={Profile} />
              <Route path="overview" component={Overview} />

              <Redirect from="billing" to="billing/plans" />
              <Route path="billing/plans" component={Plans} />
              <Route path="billing/history" component={Plans} />

              <Route path="settings" component={Settings} />
            </Route>
          </Route>

        </Route>
    </Router>
  </Provider>
  </ConfigProvider>
);
