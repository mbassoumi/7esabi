import React from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';
import {useSelector} from 'react-redux';


const PrivateRoute = ({component: Component, ...rest}: RouteProps) => {

    //@ts-ignore
    const user = useSelector(state => state.auth.user);
    // const user = true;

    console.log('PrivateRoute user', user);


    return (
        <Route {...rest}
               render={(props) => (
                   (user) ? (
                       <div>
                           {
                               //@ts-ignore
                               <Component {...props}/>
                           }
                       </div>
                   ) : (
                       <Redirect to={{pathname: '/login', state: {referer: props.location}}}/>
                   )
               )}/>
    );


};

export default PrivateRoute;