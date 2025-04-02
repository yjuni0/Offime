import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function ReportUpdate() {
    // 제목, 각 질문당 답변 수정 해야함.

    const [title, setTitle] = useState("")
    const [templateId, setTemplateId] = useState("")
    const [responseData, setResponseData] = useState([])
    const [questionData, setQuestionData] = useState([])

    const reportId = useParams().reportId

    const navigate = useNavigate();


    const getReport = async () => {
        await axios.get(`http://localhost:8080/reports/read/${reportId}`).then((res) => {
            setTitle(res.data.title);
            setTemplateId(res.data.templateId);
        });
    }

    const getQuestionList = async () => {
        await axios.get(`http://localhost:8080/reports/template/${templateId}/questions`).then((res) => setQuestionData(res.data))
    }

    useEffect(() => {
        getReport();
    }, []);

    useEffect(() => {
        if(templateId === "") return

        getQuestionList()
    }, [templateId]);

    useEffect(() => {
        console.log(questionData);
    }, [questionData]);

    const updateReport = async () => {
        const data = {
            title, responseData
        }
        
        await axios.put(`http://localhost:8080/reports/update/${reportId}` ,data);
    }

    return(
        <div>
            <form onSubmit={updateReport}>
                <p>제목</p>
                <input value={title} onChange={(e) => setTitle(e.target.value)}/>
                {questionData.map((q) => (
                    <div key={q.id}>
                        <p>{q.questionText}</p>
                    </div>
                ))}
                <button type={"submit"} onClick={() => navigate(`/reports/read/${reportId}`)}>수정</button>
            </form>
        </div>

    )
}

export default ReportUpdate