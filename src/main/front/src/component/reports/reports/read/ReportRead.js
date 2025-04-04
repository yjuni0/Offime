import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ReportAnswer from "./ReportAnswer";

function ReportRead() {
    const reportId = useParams().reportId;
    const [reportData, setReportData] = useState("");
    const [templateData, setTemplateData] = useState("");
    const [templateId, setTemplateId] = useState("");
    const [member, setMember] = useState("");
    const [questionData, setQuestionData] = useState([]);
    const [showModal, setShowModal] = useState(false); // ✅ 모달 상태
    const navigate = useNavigate();
    const currentMember = localStorage.getItem("id");

    const formatKoreanDateTime = (rawDate) => {
        if (!rawDate) return "";
        const date = new Date(rawDate);
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}(${days[date.getDay()]}) ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/reports/read/${reportId}`).then((res) => {
            setReportData(res.data);
            setTemplateId(res.data.templateId);
        });
    }, []);

    useEffect(() => {
        if (!templateId) return;
        axios.get(`http://localhost:8080/reports/template/${templateId}`).then((res) => setTemplateData(res.data));
        axios.get(`http://localhost:8080/reports/template/${templateId}/questions`).then((res) => setQuestionData(res.data));
        axios.get(`http://localhost:8080/member/${reportData.writerId}`).then((res) => setMember(res.data));
    }, [templateId]);

    const reportDelete = async () => {
        await axios.delete(`http://localhost:8080/reports/delete/${reportId}`);
        navigate("/reports/read");
    };

    return (
        <section className="reportReadSection">
            <div className="reportInner">
                <div className="reportHeader">
                    <img
                        className="reportBackIcon"
                        src="/image/report/backArrow.png"
                        onClick={() => navigate("/reports/read")}
                        alt="뒤로가기"
                    />
                    {currentMember == reportData.writerId && (
                        <img
                            src={"/image/report/detail.png"}
                            className="reportDetailIcon"
                            alt={"자세히 보기"}
                            onClick={() => setShowModal(true)} // ✅ 클릭 시 모달 열기
                        />
                    )}
                </div>

                <div className={`reportCard reportHeaderColor${templateData.color}`}>
                    <p className="reportTitle">{reportData.title}</p>
                    <div className="reportMeta">
                        <img src={member.profileImageUrl || "/image/member/profile_no_image.jpg"} alt="작성자" className="reportProfile" style={{ objectFit: "cover" }} />
                        <div>
                            <p className="reportWriter">{member.name}</p>
                            <p className="reportDate">{formatKoreanDateTime(reportData.modifiedAt)}</p>
                        </div>
                        <Link to={`/replies/${reportData.id}`}>
                            <img src="/image/report/reply.png" alt="댓글" className="reportReplyIcon" />
                        </Link>
                    </div>
                </div>

                {questionData.map((question) =>
                    question.type !== "SECTION" ? (
                        <div className="reportQuestionBox" key={question.order}>
                            <p className="questionLabel">{question.questionText}</p>
                            <ReportAnswer
                                questionId={question.id}
                                reportId={reportData.id}
                                type={question.type}
                            />
                        </div>
                    ) : (
                        <hr className="questionDivider" key={question.order} />
                    )
                )}

                {/* ✅ 모달 영역 */}
                {showModal && (
                    <div style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.3)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000
                    }} onClick={() => setShowModal(false)}>
                        <div
                            style={{
                                backgroundColor: "white",
                                padding: "1rem",
                                paddingBottom:"0.5rem",
                                borderRadius: "12px",
                                minWidth: "250px",
                                textAlign: "center"
                            }}
                            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
                        >
                            <button
                                onClick={() => navigate(`/reports/update/${reportData.id}`)}
                                style={{ borderRadius: "8px", cursor: "pointer" }}
                            >
                                수정
                            </button>
                            <hr style={{border:"none", borderTop:"1px solid #ccc", width:"100%"}}/>
                            <button
                                onClick={reportDelete}
                                style={{ padding: "0.5rem 1rem", borderRadius: "8px",color:"red", cursor: "pointer" }}
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ReportRead;
