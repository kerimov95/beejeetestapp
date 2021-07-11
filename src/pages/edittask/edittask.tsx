import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStringField } from 'common/hooks/formhooks';
import { taskActions } from 'store/actions';
import { taskSelectot } from 'store/selectors';
import { push } from "connected-react-router";
import { routeUrl } from 'common/urls';
import { TaksForm } from "components/taskform";
import { useParams } from "react-router-dom";
import './edittask.css';

export const EditTaskPage = () => {

    const { id } = useParams<any>();

    const taskConntext = useSelector(taskSelectot);

    const task = { ...taskConntext.tasks.find(task => task.id === +id) };

    const [text, handleChangeText] = useStringField(task.text);

    const dispatch = useDispatch();

    const handleBtnSaveClick = () => {
        if (text !== task.text) {
            const status = task.status === 10 || task.status === 11 ? 11 : 1;
            dispatch(taskActions.taskUpdateAsync(id, { text, status }));
        }
        dispatch(push(routeUrl.homePage));
    }

    const handleBtnCancelClick = () => {
        dispatch(push(routeUrl.homePage))
    }

    const textInputValid = text.length > 0 ? true : false;

    return (
        <div>
            <TaksForm
                handleChangeText={handleChangeText}
                handleBtnSaveClick={handleBtnSaveClick}
                handleBtnCancelClick={handleBtnCancelClick}
                emailInput={{ disabled: true, valid: true }}
                textInput={{ value: task.text, valid: textInputValid }}
            />
        </div>

    )
}
