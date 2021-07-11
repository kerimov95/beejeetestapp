import React from "react";
import { useDispatch } from "react-redux";
import { useStringField } from 'common/hooks/formhooks';
import { taskActions } from 'store/actions';
import { push } from "connected-react-router";
import { routeUrl } from 'common/urls';
import { TaksForm } from "components/taskform";
import { validateEmail } from 'common/validateemail';
import './createtask.css';

export const CreateTaskPage = () => {

    const [еmail, handleChangeEmail] = useStringField('');
    const [text, handleChangeText] = useStringField('');

    const dispatch = useDispatch();

    const handleBtnSaveClick = () => {
        dispatch(taskActions.createTaskAsync(еmail, text))
    }

    const handleBtnCancelClick = () => {
        dispatch(push(routeUrl.homePage))
    }

    const emailInputValid = еmail.length > 0 && !validateEmail(еmail) ? true : false;
    const textInputlValid = text.length > 0 ? true : false;

    return (
        <TaksForm
            handleChangeEmail={handleChangeEmail}
            handleChangeText={handleChangeText}
            handleBtnSaveClick={handleBtnSaveClick}
            handleBtnCancelClick={handleBtnCancelClick}
            emailInput={{ valid: emailInputValid }}
            textInput={{ valid: textInputlValid }}
        />
    )
}
