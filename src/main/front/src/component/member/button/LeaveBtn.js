import React from 'react';
import useLeaveBtn from '../api/useLeaveBtn';

function LeaveBtn() {
    const { handleLeave, message } = useLeaveBtn();
    const userRole = localStorage.getItem('role'); // 로그인한 사용자의 권한 정보 가져오기

    return (
        <div>
            {/* ADMIN일 경우 '회원 삭제' 버튼, USER일 경우 '회원 탈퇴' 버튼 */}
            <button className="Logout-btn" onClick={handleLeave}>
                {userRole === 'ADMIN' ? '회원 삭제' : '회원 탈퇴'}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default LeaveBtn;
