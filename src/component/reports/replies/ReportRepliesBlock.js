import {useState} from "react";
import axios from "axios";

function ReportRepliesBlock({reply, deleteReply, updateReply}) {

    const [isUpdate, setIsUpdate] = useState(false);
    const [content, setContent] = useState(reply.content);



    return (
        <div className={"item btn btn-pm mt_sm"} style={{borderRadius: "10px"}} key={reply.createdAt}>
            <p>{reply.writerId}</p>
            <p>{reply.createdAt}</p>
            {!isUpdate ? (
                <div>
                    <p>{reply.content}</p>
                    <p onClick={() => setIsUpdate(true)} style={{cursor: "pointer"}}>수정</p>
                </div>
            ) : (
                <div>
                    <input type="text" value={content} onChange={(e) => setContent(e.target.value)}></input>
                    <p onClick={() => {updateReply(reply.id, content); setIsUpdate(false)}} style={{cursor: "pointer"}}>수정완료</p>
                </div>
            )}

            <p onClick={() => deleteReply(reply.id)} style={{cursor: "pointer"}}>삭제</p>
        </div>
    )

}

export default ReportRepliesBlock