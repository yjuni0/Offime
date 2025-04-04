import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ReportAnswer from "./ReportAnswer";
function ReportRead() {
    const reportId = useParams().reportId;
    const [reportData, setReportData] = useState("");
    const [templateData, setTemplateData] = useState("");
    const [templateId, setTemplateId] = useState("");
    const [memberName, setMemberName] = useState("");
    const [questionData, setQuestionData] = useState([]);
    const navigate = useNavigate();
    const currentMember = localStorage.getItem("id");

    const formatKoreanDateTime = (rawDate) => {
        if (!rawDate) return "";
        const date = new Date(rawDate);

        const days = ['일', '월', '화', '수', '목', '금', '토'];

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const weekday = days[date.getDay()];
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');

        return `${year}.${month}.${day}(${weekday}) ${hour}:${minute}`;
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
        axios.get(`http://localhost:8080/member/${reportData.writerId}`).then((res) => setMemberName(res.data.name));
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
                        src="/image/reportIcon/backArrow.png"
                        onClick={() => navigate("/reports/read")}
                        alt="뒤로가기"
                    />
                    {currentMember == reportData.writerId && (
                        <img
                            className="reportDeleteIcon"
                            src="/image/reportIcon/recyclebin.png"
                            onClick={reportDelete}
                            alt="삭제"
                        />
                    )}
                </div>

                <div className={`reportCard reportHeaderColor${templateData.color}`}>
                    <p className="reportTitle">{reportData.title}</p>
                    <div className="reportMeta">
                        <img src="/image/reportIcon/펭귄.jpg" alt="작성자" className="reportProfile" />
                        <div>
                            <p className="reportWriter">{memberName}</p>
                            <p className="reportDate">{formatKoreanDateTime(reportData.modifiedAt)}</p>
                        </div>
                        <Link to={`/replies/${reportData.id}`}>
                            <img src="/image/reportIcon/reply.png" alt="댓글" className="reportReplyIcon" />
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

                {currentMember == reportData.writerId && (
                    <div className="reportBottomButtons">
                        <Link to={`/reports/update/${reportData.id}`}>
                            <button className="btn btn-md btn-pm">수정</button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ReportRead;
