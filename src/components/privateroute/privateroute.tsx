import React from 'react';
import { useSelector } from 'react-redux';
import { authSelectot } from 'store/selectors';
import { routeUrl } from 'common/urls';
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ children, path }: { children: any, path: string }) => {

    const auth = useSelector(authSelectot);

    return (
        <Route
            path={path}
            render={({ location }) =>
                auth.isAuthenticated ?
                    (
                        children
                    ) : <Redirect
                        to={{
                            pathname: routeUrl.loginPage,
                            state: { from: location }
                        }}
                    />
            }
        />
    )
}
