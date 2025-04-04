import { useEffect, useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

function ReportList() {
    const [reportList, setReportList] = useState([]);
    const [memberNames, setMemberNames] = useState({});
    const [templateDataMap, setTemplateDataMap] = useState({});
    const navigate = useNavigate();

    const getReportList = async () => {
        const res = await axios.get("http://localhost:8080/reports/read");
        setReportList(res.data);
    };

    const getMember = async (writerId) => {
        if (memberNames[writerId]) return;
        try {
            const res = await axios.get(`http://localhost:8080/member/${writerId}`);
            setMemberNames((prev) => ({
                ...prev,
                [writerId]: res.data.name,
            }));
        } catch (err) {
            console.error("작성자 정보 오류:", err);
        }
    };

    const getTemplateData = async (templateId) => {
        if (templateDataMap[templateId]) return;
        try {
            const res = await axios.get(`http://localhost:8080/reports/template/${templateId}`);
            setTemplateDataMap((prev) => ({
                ...prev,
                [templateId]: res.data,
            }));
        } catch (err) {
            console.error("템플릿 정보 오류:", err);
        }
    };

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

    const getColorClass = (colorId) => {
        return `templateColor${colorId}`;
    };


    useEffect(() => {
        getReportList();
    }, []);

    useEffect(() => {
        const writerIds = [...new Set(reportList.map((r) => r.writerId))];
        writerIds.forEach((id) => getMember(id));

        const templateIds = [...new Set(reportList.map((r) => r.templateId))];
        templateIds.forEach((tid) => getTemplateData(tid));
    }, [reportList]);

    return (
        <section className="reportReadSection">
            <div className="reportInner">
                <div className="reportHeader">
                    <img
                        onClick={() => navigate("/reports")}
                        className="reportBackIcon"
                        src="/image/reportIcon/backArrow.png"
                        alt="뒤로가기"
                    />
                    <p className="replyTitle">보고서</p>
                </div>

                {reportList.map((report) => {
                    const template = templateDataMap[report.templateId];
                    const colorClass = template ? `templateColor${template.color}` : "";

                    return (
                        <div
                            key={report.id}
                            className={`templateItem ${colorClass}`}
                            onClick={() => navigate(`/reports/read/${report.id}`)}
                            style={{display: "block", marginBottom: "1rem"}}
                        >
                            <div className="templateLeft" style={{display: "block"}}>
                                <img
                                    src={`/image/reportIcon/icon${template?.icon}.png`}
                                    alt="템플릿 아이콘"
                                    className="templateIcon"
                                    style={{marginLeft: "0.8rem", marginBottom: "0.5rem"}}
                                />
                                <p className="templateTitle">{report.title || "제목 없음"}</p>

                                <hr style={{border:"none", borderTop:"1px solid #ccc", marginTop: "0.5rem"}}/>
                            </div>


                            <div className="reportMeta" style={{marginTop: "0.5rem", marginLeft: "0.8rem", justifyContent:""}}>
                                <img
                                    src="/image/reportIcon/펭귄.jpg"
                                    alt="작성자 프로필"
                                    className="reportProfile"
                                />
                                <span className="reportWriter">
                                {memberNames[report.writerId] || "불러오는 중..."}
                            </span>
                                <span className="reportDate">
                                {formatKoreanDateTime(report.modifiedAt)}
                            </span>
                                <Link to={`/replies/${report.id}`}>
                                    <img
                                        src="/image/reportIcon/reply.png"
                                        alt="댓글"
                                        className="reportReplyIcon"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </Link>
                            </div>


                        </div>
                    );
                })}
            </div>
        </section>
    );

}

export default ReportList;
