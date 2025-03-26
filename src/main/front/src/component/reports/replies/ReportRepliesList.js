import {useEffect, useState} from "react";
import axios from "axios";

function ReportRepliesList({reportId}) {

    const [repliesData, setRepliesData] = useState([]);

    const getReplies = async () => {
        await axios.get(`http://localhost:8080/replies/read/${reportId}`).then((res) => setRepliesData(res.data))
    }

    const deleteReply = async (id) => {
        await axios.delete(`http://localhost:8080/replies/delete/${id}`);
        getReplies();
    }

    useEffect(() => {
        getReplies();
    }, []);

    return (
        <>
            {repliesData.map((reply) => (
                <div key={reply.createdAt}>
                    <p>{reply.writerId}</p>
                    <p>{reply.content}</p>
                    <p>{reply.createdAt}</p>
                    <p onClick={()=>deleteReply(reply.id)} style={{cursor: "pointer"}}>삭제</p>
                </div>
            ))}

        </>
    )
}

export default ReportRepliesList