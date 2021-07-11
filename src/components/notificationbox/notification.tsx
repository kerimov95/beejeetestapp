import React from "react";
import { useSelector } from "react-redux";
import { List, Message } from "semantic-ui-react";
import { notificationSelectot } from "store/selectors";

import './notification.css';

export const NotificationBox = () => {

    const notifications = useSelector(notificationSelectot);

    return (
        <div className="notification_box">
            <List>
                {
                    notifications.map(notification => (
                        <List.Item key={notification.id}>
                            <Message className={notification.type}>
                                <p>
                                    {notification.message}
                                </p>
                            </Message>
                        </List.Item>
                    ))
                }
            </List>
        </div>
    )
}
