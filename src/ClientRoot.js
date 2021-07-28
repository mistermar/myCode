import React, { useEffect } from "react";
import config from "react-global-configuration";
import {browserHistory} from "react-router";

export default function(props) {
  useEffect(()=> {

    const rootRoute = config.get('relativePath')
    const token = localStorage.getItem('token')
    const { pathname , search } = browserHistory.getCurrentLocation()
    if (!token) {
      const currentLocation = pathname
      if (currentLocation
        && currentLocation !== '/'
        && currentLocation !== `/${rootRoute}/signin`
        && !currentLocation.includes("forgot")
      ) {
        localStorage.setItem("redirectUrl", currentLocation);
      }


      if(props.params.hash && props.params.id){
        browserHistory.push(`/${rootRoute}/signin/${props.params.id}/${props.params.hash}`)
      }else{
        let way = pathname.includes("forgot") ? "forgot" : "signin"
        if(search) way = way + search

        browserHistory.push(`/${rootRoute}/${way}`);
      }
    }
  },[])

  return <div>{props.children}</div>
}