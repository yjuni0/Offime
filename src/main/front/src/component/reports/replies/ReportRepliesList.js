import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ReportRepliesBlock from "./ReportRepliesBlock";

function ReportRepliesList({reportId}) {

    const [repliesData, setRepliesData] = useState([]);
    const navigate = useNavigate();
    const [isUpdate, setIsUpdate] = useState(false);

    const getReplies = async () => {
        await axios.get(`http://localhost:8080/replies/read/${reportId}`).then((res) => setRepliesData(res.data))
    }

    const deleteReply = async (id) => {
        await axios.delete(`http://localhost:8080/replies/delete/${id}`);
        getReplies();
    }
    const updateReply = async (id, content) => {
        await axios.put(`http://localhost:8080/replies/update/${id}`, {content});
        getReplies();
    }

    useEffect(() => {
        getReplies();
    }, []);

    return (
        <>
            <div className={"mt_sm"}>
                <img style={{cursor: "pointer", width: "1.5rem", display: "inline"}} src={"/image/backArrow.png"} onClick={() => navigate(`/reports/read/${reportId}`)} />
                <p style={{display:"inline"}} className={"ml_sm"}>댓글</p>
            </div>
            {repliesData.map((reply) => (
                <ReportRepliesBlock deleteReply={deleteReply} updateReply={updateReply} reply={reply}/>
            ))}

        </>
    )
}

export default ReportRepliesList