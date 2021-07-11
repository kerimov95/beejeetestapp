import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Pagination } from "semantic-ui-react";
import { taskSelectot, authSelectot } from 'store/selectors';
import { taskActions } from 'store/actions';
import { Table } from 'semantic-ui-react';
import { t } from "common/dictionary";
import { push } from "connected-react-router";
import { Sort_field, TaskStatus } from 'types'
import { getStatus } from "common/statuses";
import { HeaderCell } from "components/headercell";
import { routeUrl } from "common/urls";

import './home.css';

export function HomePage() {

    const contextAuth = useSelector(authSelectot);
    const contextTask = useSelector(taskSelectot);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(taskActions.getTasksAsync());
    }, []);

    const hundleClick = () => {
        dispatch(push('/create'));
    }

    const sort = (sort_field: Sort_field) => {
        dispatch(taskActions.sortPageAsync(sort_field));
    }

    const hundleBtnCompletedClick = (id: number, taskStatus: TaskStatus) => {
        const status = taskStatus === 1 ? 11 : 10;
        dispatch(taskActions.taskUpdateAsync(id, { status }));
    }

    const hundleBtnEditClick = (id: number) => {
        dispatch(push(routeUrl.editTaskPage(id.toString())));
    }

    const BtnCompletedDisabled = (status: TaskStatus) => status === 0 || status === 1 ? false : true;

    const BtnCompletedClass = (status: TaskStatus) => status === 0 || status === 1 ? 'ui button basic grey' : 'ui button green';

    const totalPage = Math.ceil(contextTask.total_task_count / 3)

    return (
        <Container>
            <Button color="green" onClick={hundleClick}>{t('add')}</Button>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <HeaderCell name={t('id')} onClick={() => {
                            sort('id');
                        }} />
                        <HeaderCell name={t('username')} onClick={() => {
                            sort('username');
                        }} />
                        <HeaderCell name={t('email')} onClick={() => {
                            sort('email');
                        }} />
                        <HeaderCell name={t('status')} onClick={() => {
                            sort('status');
                        }} />
                        <Table.HeaderCell >{t('text')}</Table.HeaderCell>
                        {contextAuth.isAuthenticated ? <Table.HeaderCell ></Table.HeaderCell> : null}
                    </Table.Row>
                </Table.Header >
                <Table.Body>
                    {contextTask.tasks.map((task) => (
                        <Table.Row key={task.id} positive>
                            <Table.Cell>{task.id}</Table.Cell>
                            <Table.Cell>{task.username}</Table.Cell>
                            <Table.Cell>{task.email}</Table.Cell>
                            <Table.Cell>{getStatus(task.status)}</Table.Cell>
                            <Table.Cell>{task.text}</Table.Cell>
                            {contextAuth.isAuthenticated ? <Table.Cell>
                                {
                                    <Button.Group>
                                        <Button disabled={BtnCompletedDisabled(task.status)} onClick={() => {
                                            hundleBtnCompletedClick(task.id, task.status);
                                        }} className={BtnCompletedClass(task.status)} >
                                            Выполнено
                                        </Button>
                                        <Button onClick={() => {
                                            hundleBtnEditClick(task.id)
                                        }} color='yellow'>
                                            Изменить
                                        </Button>
                                    </Button.Group>
                                }
                            </Table.Cell> : null}
                        </Table.Row>))
                    }
                </Table.Body>
            </Table >
            {
                totalPage > 0 ? <Pagination onPageChange={(event, Pagination) => {
                    dispatch(taskActions.changePageAsync(Pagination.activePage as number));
                }} defaultActivePage={contextTask.page} totalPages={totalPage} /> : null
            }
        </Container >
    )
}
