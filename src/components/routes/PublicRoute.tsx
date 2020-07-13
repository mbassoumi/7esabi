import React from 'react';
import {Route, RouteProps} from 'react-router-dom';


const PublicRoute = ({component: Component, ...rest}: RouteProps) => {
    return (
        <Route {...rest}
               render={(props) => (
                   //@ts-ignore
                   <Component {...props}/>
               )}/>
    );
};

export default PublicRoute;