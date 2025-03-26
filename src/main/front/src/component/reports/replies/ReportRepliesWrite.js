import {useState} from "react";
import axios from "axios";

function ReportRepliesWrite({reportId}) {

    const [content, setContent] = useState("");

    const repliesWrite = async () => {
        const data = {
            reportId, content, writerId : 1,
        }

        await axios.post(`http://localhost:8080/replies/create`, data);
    }

    return (
        <form onSubmit={repliesWrite}>
            <input placeholder={"댓글 입력"} value={content} onChange={(e) => setContent(e.target.value)}/>
            <button type={"submit"}>댓글 입력</button>
        </form>
    )
}

export default ReportRepliesWrite