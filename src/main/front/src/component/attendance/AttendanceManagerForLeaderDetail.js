import { useLocation, useNavigate } from "react-router-dom";
import BackPage from "../BackPage";
import { useState, useEffect } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

function AttendanceManagerForLeaderDetail() {
    const navigate = useNavigate();
    const { state } = useLocation(); // 이전 페이지에서 전달된 상태를 받아옴
    const { status, attendanceData } = state || {}; // status와 attendanceData 받기
    const [dailyAttendance, setDailyAttendance] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // const role = localStorage.getItem("role");
        // if (role !== "ADMIN") {
        //     alert("리더만 접근할 수 있습니다!");
        //     navigate("/");
        //     return;
        // }
        
        const fetchAttendanceDetails = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("CL_access_token");
                const response = await axios.get(`http://localhost:8080/attendanceDetails`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { status, date: attendanceData.date } // 날짜와 status를 쿼리로 보내서 데이터 요청
                });
                if (response.data) {
                    setDailyAttendance(response.data); // 상세 데이터 세팅
                } else {
                    setDailyAttendance(null);
                }
            } catch (error) {
                console.error("데이터 로드 오류:", error);
                setDailyAttendance(null);
            } finally {
                setLoading(false);
            }
        };
        fetchAttendanceDetails();
    }, [status, attendanceData]);

    return (
        <>
            <BackPage />
            <section className="sec">
                <div className="inner">
                    <div className="item">
                        <p className="fs_lg">{status} 직원 목록</p>

                        {loading && <p>데이터를 불러오는 중입니다...</p>}

                        {/* 데이터가 있을 경우 */}
                        {dailyAttendance && !loading && (
                            <p></p>
                        )}

                        {/* 데이터가 없을 경우 */}
                        {!loading && !dailyAttendance && <p>해당하는 직원이 없습니다.</p>}
                    </div>
                </div>
            </section>
        </>
    );
}
export default AttendanceManagerForLeaderDetail;