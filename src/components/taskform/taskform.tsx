import React from "react";
import { t } from "common/dictionary";
import { InputChangeEvent, TextAreaChangeEvent } from "common/hooks/formhooks";
import { Button, Form, Input, TextArea } from "semantic-ui-react";

import './taskform.css';


export const TaksForm = (
    props: {
        handleBtnSaveClick?: () => void,
        handleChangeEmail?: (event: InputChangeEvent | TextAreaChangeEvent) => void,
        handleChangeText?: (event: InputChangeEvent | TextAreaChangeEvent) => void,
        handleBtnCancelClick?: () => void
        emailInput?: { value?: string, disabled?: boolean, valid?: boolean }
        textInput?: { value?: string, disabled?: boolean, valid?: boolean }
    }) => {

    const BtnSaveDisabled = props.emailInput?.valid && props.textInput?.valid ? false : true;

    return (
        <div className='task'>
            <Form onSubmit={props.handleBtnSaveClick} className='task_form'>
                {
                    !props.emailInput?.disabled ?
                        <Form.Field
                            error={!props.emailInput?.valid ? {
                                content: t('emailValid'),
                                pointing: 'below',
                            } : null}
                            label={t('email')}
                            control={Input}
                            defaultValue={props.emailInput?.value}
                            onChange={props.handleChangeEmail}
                        /> : null
                }
                {
                    !props.textInput?.disabled ?
                        <Form.Field
                            error={!props.textInput?.valid}
                            label={t('text')}
                            control={TextArea}
                            defaultValue={props.textInput?.value}
                            onChange={props.handleChangeText}
                        />
                        : null
                }
                <Button disabled={BtnSaveDisabled} color="green" type="submit" >{t('save')}</Button>
                <Button color="red" type="button" onClick={props.handleBtnCancelClick} >{t('cancel')}</Button>
            </Form>
        </div>
    )
}
