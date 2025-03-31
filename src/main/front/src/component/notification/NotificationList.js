import {useState} from "react";

const NotificationList = ({notifications}) => {
    return (
        <div>
            {notifications.length === 0 ? (
                <p>알림이 없습니다.</p>
            ) : (
                <ul>
                    {notifications.map((notification) => (
                        <li key={notification.id}>
                            {notification.message} ({notification.isRead ? "읽음" : "안 읽음"})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default NotificationList;