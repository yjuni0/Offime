import BackPage from "../../../BackPage";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; // useEffect 추가
import '../../../../css/attendance.css';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AttendanceManagerForEmployee() {
    const navigate = useNavigate();
    const [viewType, setViewType] = useState("weekly");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [attendanceData, setAttendanceData] = useState(null);

    const handleButtonClick = (path) => {
        navigate(path);
    };

    // useEffect를 사용하여 컴포넌트 마운트 시 데이터 가져오기
    useEffect(() => {
        fetchAttendanceData(selectedDate);
    }, [viewType, selectedDate]); // viewType 또는 selectedDate가 변경될 때마다 실행

    const fetchAttendanceData = async (date) => {
        try {
            const token = localStorage.getItem("CL_access_token");
            if (!token) {
                console.error("Token not found in localStorage");
                return; // 토큰이 없으면 중단
            }
            const formattedDate = date.toISOString().split('T')[0]; // yyyy-MM-dd 형식으로 변환

            let response;
            if (viewType === "weekly") {
                response = await axios.get("http://localhost:8080/weekly", {
                    params: { date: formattedDate },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else if (viewType === "monthly") {
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                response = await axios.get("http://localhost:8080/monthly", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: { year: year, month: month }, // params로 변경
                });
            } else {
                console.error("Invalid view type");
                return;
            }

            console.log("Fetched Data:", response.data);
            setAttendanceData(response.data);

        } catch (error) {
            console.error("Error fetching attendance data:", error);
            // 오류 처리: 사용자에게 알림 등
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // fetchAttendanceData(date); // useEffect에서 처리하도록 변경
    };

    const handleViewTypeChange = (type) => {
        setViewType(type);
        // fetchAttendanceData(selectedDate); // useEffect에서 처리하도록 변경
    };

    return (
        <>
            <BackPage />
            <section className="sec">
                <div className="inner">
                    <div className="item">
                        <p className="fs_lg">구트</p>

                        {/* 주간/월간 보기 선택 버튼 */}
                        <div className="view-type-selector">
                            <button
                                className={`btn ${viewType === "weekly" ? "active" : ""}`}
                                onClick={() => handleViewTypeChange("weekly")}
                            >
                                주간 보기
                            </button>
                            <button
                                className={`btn ${viewType === "monthly" ? "active" : ""}`}
                                onClick={() => handleViewTypeChange("monthly")}
                            >
                                월간 보기
                            </button>
                        </div>

                        {/* 조건부로 달력 렌더링 */}
                        {viewType === "weekly" && (
                            <>
                                <p className="fs_lg">주중 날짜 선택</p>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="yyyy-MM-dd" // 연도-월-일 형식
                                    className="input input-txt fs_md mb_md"
                                />
                            </>
                        )}
                        {viewType === "monthly" && (
                            <>
                                <p className="fs_lg">월 선택</p>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="yyyy-MM" // 연도-월 형식
                                    showMonthYearPicker // 월과 연도를 선택할 수 있는 옵션
                                    className="input input-txt fs_md mb_md"
                                />
                            </>
                        )}

                        {/* 출근 현황 */}
                        <p className="fs_lg">출근 현황</p>

                        {attendanceData ? (
                            <div>
                                {viewType === "weekly" && (
                                    <>
                                        <div className="item bg_pm mt_sm">
                                            <div className="fs_md tc-w">출근율</div>
                                            <div className="fs_md tc-w">{attendanceData.clockInCount} / 5</div>
                                        </div>

                                        <div className="attendance-row mt_md">
                                            <button
                                                className="attendance-box bg_wt"
                                                onClick={() => handleButtonClick('/clockInForEmployee')}
                                            >
                                                <div className="tc-pm">출근</div>
                                                <div className="right-square tc-pm">{attendanceData.clockInCount}</div>
                                            </button>
                                            <button
                                                className="attendance-box bg_wt"
                                                onClick={() => handleButtonClick('/absentForEmployee')}
                                            >
                                                <div className="tc-e">미출근</div>
                                                <div className="right-square tc-e">{attendanceData.absentCount}</div>
                                            </button>
                                        </div>

                                        <button className="attendance-row mt_md">
                                            <div
                                                className="attendance-box bg_p04"
                                                onClick={() => handleButtonClick('/lateForEmployee')}
                                            >
                                                <div className="tc-w">지각</div>
                                                <div className="right-square">총 {attendanceData.totalLateMinutes} 분</div>
                                            </div>
                                            <div
                                                className="attendance-box bg_p03"
                                                onClick={() => handleButtonClick('/leaveEarlyForEmployee')}
                                            >
                                                <div className="tc-w">조퇴</div>
                                                <div className="right-square tc-w">총 {attendanceData.totalLeaveEarlyMinutes} 분</div>
                                            </div>
                                        </button>
                                    </>
                                )}

                                {viewType === "monthly" && (
                                    <>
                                        <div className="item bg_pm mt_sm">
                                            <div className="fs_md tc-w">출근율</div>
                                            <div className="fs_md tc-w">{attendanceData.clockInCount} / 5</div>
                                        </div>

                                        <div className="attendance-row mt_md">
                                            <button
                                                className="attendance-box bg_wt"
                                                onClick={() => handleButtonClick('/clockInForEmployee')}
                                            >
                                                <div className="tc-pm">출근</div>
                                                <div className="right-square tc-pm">{attendanceData.clockInCount}</div>
                                            </button>
                                            <button
                                                className="attendance-box bg_wt"
                                                onClick={() => handleButtonClick('/absentForEmployee')}
                                            >
                                                <div className="tc-e">미출근</div>
                                                <div className="right-square tc-e">{attendanceData.absentCount}</div>
                                            </button>
                                        </div>

                                        <button className="attendance-row mt_md">
                                            <div
                                                className="attendance-box bg_p04"
                                                onClick={() => handleButtonClick('/lateForEmployee')}
                                            >
                                                <div className="tc-w">지각</div>
                                                <div className="right-square">총 {attendanceData.totalLateMinutes} 분</div>
                                            </div>
                                            <div
                                                className="attendance-box bg_p03"
                                                onClick={() => handleButtonClick('/leaveEarlyForEmployee')}
                                            >
                                                <div className="tc-w">조퇴</div>
                                                <div className="right-square tc-w">총 {attendanceData.totalLeaveEarlyMinutes} 분</div>
                                            </div>
                                        </button>
                                    </>
                                )}
                            </div>
                        ) : (
                            <p>달력을 통해 날짜를 선택해 주세요.</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default AttendanceManagerForEmployee;
