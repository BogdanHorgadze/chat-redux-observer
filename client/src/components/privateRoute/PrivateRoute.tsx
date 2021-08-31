import React from 'react'
import { Redirect, Route } from 'react-router'

type props = {
    component : React.ElementType,
    location : string | any,
    path : string,
}

const PrivateRoute:React.FC<props> = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => 
            localStorage.getItem('token') ? (
                <Component {...props} />
            ) : (
                <Redirect 
                    to={{
                        pathname:"/",
                        state:{from: props.location}
                    }}
                />
            )
            }
        >

        </Route>
    )
}

export default PrivateRoute
