import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import{gettoken}  from '../Session/Session'

export const PrivateRoutes = ({component:Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props =>{
                return gettoken() ? <Component{...props}/>
                    :<Redirect to={{pathname:"/login", state: {from:props.location}}}/>
            }}
        />
    )
}

export default PrivateRoutes;
