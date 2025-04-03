import BackPage from "../BackPage";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../css/attendance.css';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsPeopleFill } from "react-icons/bs";

function AttendanceManagerForLeader() {
    const navigate = useNavigate();
    const [viewType, setViewType] = useState("forAll");
    const [selectedDate, setSelectedDate] = useState(null);
    const [attendanceData, setAttendanceData] = useState(null);
    const [team, setTeam] = useState(["A", "B", "C"]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigateToDetailPage = (status) => {
        navigate("/AttendanceManagerForLeaderDetail", { state: { status, attendanceData } });
    };

    const handleViewTypeChange = (type) => {
        setViewType(type);
        setSelectedTeam(null);
        setSelectedDate(null);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTeamSelect = (team) => {
        setSelectedTeam(team);
    };

    const fetchAttendanceData = async (date) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("CL_access_token");
const formattedDate = date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
        console.log("보내는 날짜:", formattedDate);

            let response;
            if (viewType === "forAll") {
                response = await axios.get("http://localhost:8080/forAll", {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { date: formattedDate }
                });
            } else if (viewType === "forTeam" && selectedTeam) {
                response = await axios.get("http://localhost:8080/forTeam", {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { date: formattedDate, team: selectedTeam }
                });
            }

            if (response && response.data) {
                console.log("불러온 데이터:", response.data);
                setAttendanceData(response.data);
            } else {
                setAttendanceData(null);
            }
        } catch (error) {
            console.error("데이터 로드 오류:", error);
            setAttendanceData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // const role = localStorage.getItem("role");
        // if (role !== "ADMIN") {
        //     alert("리더만 접근할 수 있습니다!");
        //     navigate("/");
        //     return;
        // }

        if (selectedDate) {
            fetchAttendanceData(selectedDate);
        }
    }, [viewType, selectedDate, selectedTeam]);


    return (
        <>
            <BackPage />
            <section className="sec">
                <div className="inner">
                    <div className="item">

                        <p className="fs_lg">출퇴근 현황</p>

                        {/* 전체/팀별 보기 선택 버튼 */}
                        <div className="view-type-selector mt_md">
                            <button
                                className={`btn ${viewType === "forAll" ? "active" : ""}`}
                                onClick={() => handleViewTypeChange("forAll")}
                            >
                                전체 보기
                            </button>
                            <button
                                className={`btn ${viewType === "forTeam" ? "active" : ""}`}
                                onClick={() => handleViewTypeChange("forTeam")}
                            >
                                팀별 보기
                            </button>
                        </div>

                        {/* 팀 선택 버튼 */}
                        {viewType === "forTeam" && (
                            <div className="view-type-selector mt_md">
                                {team.map((team) => (
                                    <button
                                        key={team}
                                        className={`btn ${selectedTeam === team ? "active" : ""}`}
                                        onClick={() => handleTeamSelect(team)}
                                    >
                                        {team} 팀
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* 날짜 선택 */}
                        {(viewType === "forAll" || viewType === "forTeam") && (
                            <>
                                <p className="fs_md mt_md">날짜 선택</p>
                                <DatePicker
                                    className="input input-txt fs_md mt_md"
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="클릭해서 날짜를 선택해주세요"
                                    maxDate={new Date()}
                                />
                            </>
                        )}

                        {/* 로딩 상태 메시지 */}
                        {loading && <p>데이터를 불러오는 중입니다...</p>}

                        {/* 출근 현황 - 날짜가 선택된 경우에만 렌더링 */}
                        {selectedDate && !loading && attendanceData && (
                            <>
                                <p className="fs_md mt_md">출근 현황</p>
                                {/* 출근율 */}
                                <div className="item attendance-box bg_pm mt_sm">
                                    <div className="tc-w">출근율</div>
                                    <div className="right-square tc-w">
                                        <BsPeopleFill /> {attendanceData.clockInCount} / {attendanceData.totalCount}
                                    </div>
                                </div>

                                {/* 출근과 미출근 */}
                                <div className="attendance-row mt_md">
                                    <button className="attendance-box bg_wt" onClick={() => navigateToDetailPage('출근')}>
                                        <div className="tc-pm">출근</div>
                                        <div className="right-square tc-pm">{attendanceData.clockInCount}</div>
                                    </button>
                                    <button className="attendance-box bg_wt" onClick={() => navigateToDetailPage('미출근')}>
                                        <div className="tc-e">미출근</div>
                                        <div className="right-square tc-e">{attendanceData.absentCount}</div>
                                    </button>
                                </div>

                                {/* 출근 전은 오늘 날짜일 경우에만 렌더링  */}
                                {selectedDate.getFullYear() === new Date().getFullYear() &&
                                    selectedDate.getMonth() === new Date().getMonth() &&
                                    selectedDate.getDate() === new Date().getDate() && (
                                    <>
                                        <div className="attendance-row mt_md">
                                            <button className="attendance-box bg_wt" onClick={() => navigateToDetailPage('출근 전')}>
                                                <div className="tc-b">출근 전</div>
                                                <div className="right-square tc-b">{attendanceData.beforeClockInCount}</div>
                                            </button>
                                        </div>
                                </>
                                )}
                                
                                <div className="attendance-row mt_md">
                                    <button className="attendance-box bg_p04" onClick={() => navigateToDetailPage('지각')}>
                                        <div className="tc-w">지각</div>
                                        <div className="right-square">{attendanceData.lateCount}</div>
                                    </button>
                                    <button className="attendance-box bg_p03" onClick={() => navigateToDetailPage('조퇴')}>
                                        <div className="tc-w">조퇴</div>
                                        <div className="right-square tc-w">{attendanceData.leaveEarlyCount}</div>
                                    </button>
                                </div>

                                {/* 출근인원 근무상태는 오늘 날짜일 경우에만 렌더링  */}
                                {selectedDate.getFullYear() === new Date().getFullYear() &&
                                    selectedDate.getMonth() === new Date().getMonth() &&
                                    selectedDate.getDate() === new Date().getDate() && (
                                    <>
                                        <p className="fs_md mt_md">출근인원 근무상태</p>
                                        <div className="attendance-box work-status mt_md bg_wt">
                                            {/* 근무 중 */}
                                            <button className="status-row" onClick={() => navigateToDetailPage('근무 중')}>
                                                <div className="status-label">근무 중</div>
                                                <div className="status-count">{attendanceData.atWorkCount}명</div>
                                            </button>

                                            {/* 자리비움 중 */}
                                            <button className="status-row" onClick={() => navigateToDetailPage('자리비움 중')}>
                                                <div className="status-label">자리비움 중</div>
                                                <div className="status-count">{attendanceData.onBreakCount}명</div>
                                            </button>

                                            {/* 퇴근 */}
                                            <button className="status-row"  onClick={() => navigateToDetailPage('퇴근')}>
                                                <div className="status-label">퇴근</div>
                                                <div className="status-count">{attendanceData.offWorkCount}명</div>
                                            </button>
                                        </div>
                                    </>
                                    )
                                }
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
export default AttendanceManagerForLeader;