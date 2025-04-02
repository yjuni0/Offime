import useLeaveBtn from '../api/useLeaveBtn';

function LeaveBtn() {
    const { handleLeave, message } = useLeaveBtn;

    return (
        <div>
            <button onClick={handleLeave}>회원 탈퇴</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default LeaveBtn;
