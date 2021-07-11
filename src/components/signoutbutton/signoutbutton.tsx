import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";

import { authActions } from 'store/actions/actions';
import { t } from "common/dictionary";

export const SignOutButton: FC = () => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(authActions.signout());
    }

    return (
        <Button className="item" onClick={handleClick}>{t('signout')}</Button>
    )
}
