import { push } from "connected-react-router";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { t } from "common/dictionary";
import { routeUrl } from 'common/urls';

export const SignInButton: FC = () => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(push(routeUrl.loginPage));
    }

    return (
        <Button className='item' onClick={handleClick}>{t('signin')}</Button>
    )
}
