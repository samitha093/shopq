import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import{gettoken, getusername}  from '../Session/Session'


export const PublicRoutes = ({component:Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props =>{
                return !gettoken() ? <Component{...props}/>
                    :<Redirect to={{pathname:"/user/"}}/>
            }}
        />
    )
}

export default PublicRoutes;
