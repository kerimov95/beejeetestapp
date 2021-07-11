import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Link, } from "react-router-dom";
import { HomePage } from 'pages/home';
import { LoginPage } from 'pages/login';
import { authSelectot } from 'store/selectors';
import { PrivateRoute } from 'components/privateroute';
import { SignInButton } from 'components/signinbutton';
import { SignOutButton } from 'components/signoutbutton';
import { NotificationBox } from 'components/notificationbox';
import { t } from 'common/dictionary';
import { routeUrl } from 'common/urls';
import { CreateTaskPage } from 'pages/createtask';
import { EditTaskPage } from 'pages/edittask';

import 'semantic-ui-css/semantic.min.css';
import './app.css';

export const App = () => {

    const auth = useSelector(authSelectot).isAuthenticated;

    const InOutButton = () => auth ? <SignOutButton /> : <SignInButton />;

    return (
        <div>
            <div className="ui pointing secondary menu">

                <Link className="item active" to={routeUrl.homePage}>{t('tasks')}</Link>
                <div className="right menu">
                    <InOutButton />
                </div>
            </div>
            <Switch>
                <Route exact path={routeUrl.homePage}>
                    <HomePage />
                </Route>
                <Route path={routeUrl.loginPage}>
                    <LoginPage />
                </Route>
                <Route path={routeUrl.createTaskPage}>
                    <CreateTaskPage />
                </Route>
                <PrivateRoute path={routeUrl.editTaskPage(':id')}>
                    <EditTaskPage />
                </PrivateRoute>
            </Switch>
            <NotificationBox />
        </div>
    )
}
