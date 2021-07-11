import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from 'store/actions';
import { Button, Form, Header, Input } from 'semantic-ui-react';
import { useStringField } from 'common/hooks/formhooks';
import { t } from "common/dictionary";
import { push } from "connected-react-router";
import { routeUrl } from "common/urls";

import './login.css';

export const LoginPage = () => {

    const [login, handleChangeLogin] = useStringField('');
    const [password, handlePassword] = useStringField('');

    const dispatch = useDispatch();

    const handleBtnSaveClick = () => {
        dispatch(authActions.signinAsync(login, password));
    }
    const handleCancelSaveClick = () => {
        dispatch(push(routeUrl.homePage));
    }

    const BtnSingInDisabled = login.length > 0 && password.length > 0 ? false : true;

    return (
        <div className='login'>
            <Form onSubmit={handleBtnSaveClick} className='form'>
                <Header as='h2' icon textAlign='center'>
                    <Header.Content>{t('auth')}</Header.Content>
                </Header>
                <Form.Field
                    error={login.length > 0 ? false : true}
                    label={t('login')}
                    control={Input}
                    onChange={handleChangeLogin}
                />
                <Form.Field
                    error={password.length > 0 ? false : true}
                    type='password'
                    label={t('password')}
                    control={Input}
                    onChange={handlePassword}
                />
                <Button disabled={BtnSingInDisabled} color="green" type="submit" >{t('signin')}</Button>
                <Button color="red" type="button" onClick={handleCancelSaveClick} >{t('cancel')}</Button>
            </Form>
        </div >
    )
}
