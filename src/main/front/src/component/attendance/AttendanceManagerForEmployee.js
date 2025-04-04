import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../css/attendance.css';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AttendanceManagerForEmployee() {
    const navigate = useNavigate();
    const [viewType, setViewType] = useState("weekly");
    const [selectedDate, setSelectedDate] = useState(null);
    const [attendanceData, setAttendanceData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedDate) {
            fetchAttendanceData(selectedDate);
        }
    }, [viewType, selectedDate]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleViewTypeChange = (type) => {
        setViewType(type);
        setSelectedDate(null);
    };

    const fetchAttendanceData = async (date) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("CL_access_token");
            const formattedDate = date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
            console.log("요청한 날짜:", formattedDate);

            let response;
            if (viewType === "daily") {
                response = await axios.get("http://localhost:8080/daily", {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { date: formattedDate }
                });
            } else if (viewType === "weekly") {
                response = await axios.get("http://localhost:8080/weekly", {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { date: formattedDate },
                });
            } else if (viewType === "monthly") {
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                response = await axios.get("http://localhost:8080/monthly", {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { year: year, month: month },
                });
            }
            console.log("불러온 데이터:", response.data);
            setAttendanceData(response.data);

        } catch (error) {
            console.error("데이터 로드 오류:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="sec">
                <div className="inner">
                    <div className="item">
                        <p className="fs_lg">내 출퇴근 이력</p>

                        {/* 일간/주간/월간 보기 선택 버튼 */}
                        <div className="view-type-selector mt_md">
                            <button
                                className={`btn ${viewType === "daily" ? "active" : ""}`}
                                onClick={() => handleViewTypeChange("daily")}
                            >일간 출결 기록
                            </button>
                            <button
                                className={`btn ${viewType === "weekly" ? "active" : ""}`}
                                onClick={() => handleViewTypeChange("weekly")}
                            >주간 통계
                            </button>
                            <button
                                className={`btn ${viewType === "monthly" ? "active" : ""}`}
                                onClick={() => handleViewTypeChange("monthly")}
                            >월간 통계
                            </button>
                        </div>

                        {/* 조건부로 달력 렌더링 */}
                        {viewType === "daily" && (
                            <>
                                <p className="fs_md mt_md">날짜 선택</p>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="yyyy-MM-dd"
                                    className="input input-txt fs_md mt_md"
                                    placeholderText="클릭해서 날짜를 선택해주세요"
                                    maxDate={new Date()}
                                />
                            </>
                        )}
                        {viewType === "weekly" && (
                            <>
                                <p className="fs_md mt_md">주중 날짜 선택</p>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="yyyy-MM-dd"
                                    className="input input-txt fs_md mt_md"
                                    placeholderText="클릭해서 날짜를 선택해주세요"
                                    maxDate={new Date()}

                                />
                            </>
                        )}
                        {viewType === "monthly" && (
                            <>
                                <p className="fs_md mt_md">월 선택</p>
                                <DatePicker
                                    className="input input-txt fs_md mt_md"
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="yyyy-MM"
                                    showMonthYearPicker
                                    placeholderText="클릭해서 날짜를 선택해주세요"
                                    maxDate={new Date()}

                                />
                            </>
                        )}

                        {/* 로딩 중일 때 메시지 표시 */}
                        {loading && <p>데이터를 불러오는 중입니다...</p>}

                        <p className="fs_md mt_md">출근 현황</p>

                        {/* 출근 현황 조건부로 렌더링 */}
                        {selectedDate && !loading && (
                            <>
                                {attendanceData ? (
                                    <>
                                        {viewType === "daily" && (
                                            <>
                                                <div className="attendance-timeline mt_md">
    <div className="timeline-item">
        <div className="dot" />
        <div className="content">
            <span className="label">출근</span>
            <span className="value">{attendanceData.clockIn || "-"}</span>
        </div>
    </div>

    <div className="timeline-item">
        <div className="dot" />
        <div className="content">
            <span className="label">자리 비움</span>
            <span className="value">{attendanceData.outOfOffice || "-"}</span>
            {attendanceData.outOfOfficeType && (
                <div className="balloon">{attendanceData.outOfOfficeType}</div>
            )}
        </div>
    </div>

    <div className="timeline-item">
        <div className="dot" />
        <div className="content">
            <span className="label">복귀</span>
            <span className="value">{attendanceData.returnToOffice || "-"}</span>
        </div>
    </div>

    <div className="timeline-item">
        <div className="dot" />
        <div className="content">
            <span className="label">퇴근</span>
            <span className="value">{attendanceData.clockOut || "-"}</span>
        </div>
    </div>
</div>


                                            </>
                                        )}
                                        {viewType === "weekly" && (
                                            <>
                                                <div className="item bg_pm mt_sm">
                                                    <div className="fs_md tc-w">출근율</div>
                                                    <div className="fs_md tc-w">{attendanceData.clockInCount} / 5</div>
                                                </div>

                                                <div className="attendance-row mt_md">
                                                    <div className="attendance-box bg_wt">
                                                        <div className="tc-pm">출근</div>
                                                        <div className="right-square tc-pm">{attendanceData.clockInCount}</div>
                                                    </div>
                                                    <div className="attendance-box bg_wt">
                                                        <div className="tc-e">미출근</div>
                                                        <div className="right-square tc-e">{attendanceData.absentCount}</div>
                                                    </div>
                                                </div>

                                                <div className="attendance-row mt_md">
                                                    <div className="attendance-box bg_p04">
                                                        <div className="tc-w">지각</div>
                                                        <div className="right-square">총 {attendanceData.totalLateMinutes} 분</div>
                                                    </div>
                                                    <div className="attendance-box bg_p03">
                                                        <div className="tc-w">조퇴</div>
                                                        <div className="right-square tc-w">총 {attendanceData.totalLeaveEarlyMinutes} 분</div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {viewType === "monthly" && (
                                            <>
                                                <div className="item bg_pm mt_sm">
                                                    <div className="fs_md tc-w">출근율</div>
                                                    <div className="fs_md tc-w">{attendanceData.clockInCount} / {attendanceData.totalWeekdays}</div>
                                                </div>

                                                <div className="attendance-row mt_md">
                                                    <div className="attendance-box bg_wt">
                                                        <div className="tc-pm">출근</div>
                                                        <div className="right-square tc-pm">{attendanceData.clockInCount}</div>
                                                    </div>
                                                    <div className="attendance-box bg_wt">
                                                        <div className="tc-e">미출근</div>
                                                        <div className="right-square tc-e">{attendanceData.absentCount}</div>
                                                    </div>
                                                </div>

                                                <div className="attendance-row mt_md">
                                                    <div className="attendance-box bg_p04">
                                                        <div className="tc-w">지각</div>
                                                        <div className="right-square">총 {attendanceData.totalLateMinutes} 분</div>
                                                    </div>
                                                    <div className="attendance-box bg_p03">
                                                        <div className="tc-w">조퇴</div>
                                                        <div className="right-square tc-w">총 {attendanceData.totalLeaveEarlyMinutes} 분</div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <p>달력을 통해 날짜를 선택해 주세요.</p>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
export default AttendanceManagerForEmployee;