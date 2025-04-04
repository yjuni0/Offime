import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReportRepliesBlock from "./ReportRepliesBlock";

function ReportRepliesList({ reportId }) {
    const [repliesData, setRepliesData] = useState([]);
    const navigate = useNavigate();

    const getReplies = async () => {
        await axios.get(`http://localhost:8080/replies/read/${reportId}`)
            .then((res) => setRepliesData(res.data));
    };

    const deleteReply = async (id) => {
        await axios.delete(`http://localhost:8080/replies/delete/${id}`);
        getReplies();
    };

    const updateReply = async (id, content) => {
        await axios.put(`http://localhost:8080/replies/update/${id}`, { content });
        getReplies();
    };

    useEffect(() => {
        getReplies();
    }, []);

    return (
        <>
            <div className="replyHeader">
                <img
                    className="replyBackArrow"
                    src="/image/report/backArrow.png"
                    onClick={() => navigate(`/reports/read/${reportId}`)}
                    alt="뒤로가기"
                />
                <p className="replyTitle">댓글</p>
            </div>

            <div className="replyListContainer">
                {repliesData.map((reply) => (
                    <ReportRepliesBlock
                        key={reply.id}
                        deleteReply={deleteReply}
                        updateReply={updateReply}
                        reply={reply}
                    />
                ))}
            </div>
        </>
    );
}

export default ReportRepliesList;
