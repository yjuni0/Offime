import { useLocation, useNavigate } from "react-router-dom";
import BackPage from "../BackPage";

function AttendanceManagerForEmployeeDetail() {
    const { state } = useLocation(); // 전달된 상태 받아오기
    const { status, attendanceData } = state || {}; // status와 attendanceData 추출
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅 사용

    // 버튼 클릭 시 날짜에 대한 세부 기록 페이지로 이동
    const handleDateClick = (date) => {
        navigate("/attendanceManagerForEmployeeDetailPage", { state: { date, attendanceData } });
    };

    // 날짜 버튼 렌더링
    const renderDateButtons = (dates) => {
        if (!Array.isArray(dates) || dates.length === 0) {
            return <p>출근 기록이 없습니다.</p>;
        }

        return (
            <div className="date-buttons">
                {dates.map((date, index) => (
                    <button 
                        key={index} 
                        onClick={() => handleDateClick(date)} 
                        className="date-button"
                    >
                        {date}
                    </button>
                ))}
            </div>
        );
    };

    let content = null;
    if (status === '출근') {
        content = (
            <div>
                <p className="fs_lg">출근 기록</p>
                {renderDateButtons(attendanceData.clockInDates)} {/* 출근 날짜 버튼 */}
            </div>
        );
    } else if (status === '미출근') {
        content = (
            <div>
                <p className="fs_lg">미출근 기록</p>
                {renderDateButtons(attendanceData.absentDates)} {/* 미출근 날짜 버튼 */}
            </div>
        );
    } else if (status === '지각') {
        content = (
            <div>
                <p className="fs_lg">지각 기록</p>
                {renderDateButtons(attendanceData.lateDates)} {/* 지각 날짜 버튼 */}
            </div>
        );
    } else if (status === '조퇴') {
        content = (
            <div>
                <p className="fs_lg">조퇴 기록</p>
                {renderDateButtons(attendanceData.leaveEarlyDates)} {/* 조퇴 날짜 버튼 */}
            </div>
        );
    }

    return (
        <>
            <BackPage />
            <section className="sec">
                <div className="inner">
                    <div className="item">
                        {content}
                    </div>
                </div>
            </section>
        </>
    );
}

export default AttendanceManagerForEmployeeDetail;