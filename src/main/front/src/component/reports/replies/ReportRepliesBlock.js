import { useEffect, useState } from "react";
import axios from "axios";

function ReportRepliesBlock({ reply, deleteReply, updateReply }) {
    const [isUpdate, setIsUpdate] = useState(false);
    const [content, setContent] = useState(reply.content);
    const [member, setMember] = useState("");

    const getmember = async () => {
        await axios.get(`http://localhost:8080/member/${reply.writerId}`).then((res) => setMember(res.data));
    };

    const currentMember = localStorage.getItem("id");

    const formatDate = (rawDate) => {
        const date = new Date(rawDate);
        const dayMap = ['일', '월', '화', '수', '목', '금', '토'];
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dayOfWeek = dayMap[date.getDay()];
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        return `${year}.${month}.${day}(${dayOfWeek}) ${hour}:${minute}`;
    };

    useEffect(() => {
        getmember();
    }, []);

    return (
        <>
            <div className="reply-header">
                <img src={member.profileImageUrl || "/image/member/profile_no_image.jpg"} style={{objectFit: "cover"}}
                     alt="작성자" className="reply-profile-img"/>
                <p className="reply-writer-name">{member.name}</p>
            </div>

            <div className="reply-container">
            {!isUpdate ? (
                    <div className="reply-content-row">
                        <p className="reply-content">{reply.content}</p>
                        {currentMember == reply.writerId && (
                            <div className="reply-button-group">
                                <img
                                    className="reply-action-icon"
                                    src="/image/report/update.png"
                                    alt="수정"
                                    onClick={() => setIsUpdate(true)}
                                />
                                <img
                                    className="reply-action-icon"
                                    src="/image/report/recyclebin.png"
                                    alt="삭제"
                                    onClick={() => deleteReply(reply.id)}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="reply-edit-row">
                        <input
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="reply-edit-input"
                        />
                        <button
                            className="reply-save-button"
                            onClick={() => {
                                updateReply(reply.id, content);
                                setIsUpdate(false);
                            }}
                        >
                            저장
                        </button>
                    </div>
                )}
                <p className="reply-date">{formatDate(reply.createdAt)}</p>
            </div>
        </>
    );
}

export default ReportRepliesBlock;
