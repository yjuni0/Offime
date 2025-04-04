import React from 'react';
import useLeaveBtn from '../api/useLeaveBtn';

function LeaveBtn() {
    const { handleLeave, message } = useLeaveBtn();
    const userRole = localStorage.getItem('role');

    return (
        <div>
            <button className="Logout-btn" onClick={handleLeave}>
                {userRole === 'ADMIN' ? '회원 삭제' : '회원 탈퇴'}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default LeaveBtn;
