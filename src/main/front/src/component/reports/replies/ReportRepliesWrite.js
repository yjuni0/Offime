import { useState } from "react";
import axios from "axios";
function ReportRepliesWrite({ reportId }) {
    const [content, setContent] = useState("");
    const writerId = localStorage.getItem("id");

    const repliesWrite = async (e) => {
        if (!content.trim()) return;

        const data = { reportId, content, writerId };
        await axios.post(`http://localhost:8080/replies/create`, data);
    };

    return (
        <form className="replyForm" onSubmit={repliesWrite}>
            <input
                className="replyInput"
                placeholder="댓글을 입력하세요..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit" className="replySubmitButton">
                <img
                    src="/image/report/check.png"
                    alt="댓글 작성"
                    className="replySubmitIcon"
                />
            </button>
        </form>
    );
}

export default ReportRepliesWrite;
