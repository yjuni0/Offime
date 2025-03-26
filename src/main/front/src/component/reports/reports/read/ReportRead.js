import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import ReportAnswer from "./ReportAnswer";
import ReportReplies from "../../replies/ReportReplies";

function ReportRead() {

    const reportId = useParams().reportId

    const [reportData, setReportData] = useState("")
    const [templateData, setTemplateData] = useState("")
    const [templateId, setTemplateId] = useState("")

    const [responseData, setResponseData] = useState([]);
    const [questionData, setQuestionData] = useState([])

    const navigate = useNavigate();

    const getReport = async () => {
        await axios.get(`http://localhost:8080/reports/read/${reportId}`).then((res) => {
            setReportData(res.data)
            setTemplateId(res.data.templateId)
        });
    }

    const getTemplate = async () => {
        await axios.get(`http://localhost:8080/reports/template/${templateId}`).then((res) => setTemplateData(res.data))
    }

    const getQuestionList = async () => {
        await axios.get(`http://localhost:8080/reports/template/${templateId}/questions`).then((res) => setQuestionData(res.data))
    }



    useEffect(() => {
        getReport();
    }, []);

    useEffect(() => {
        // 첫 렌더링 때 작동 안하게 하기
        if (templateId === "") return;

        getTemplate();
        getQuestionList()
    }, [templateId]);

    const reportDelete = async () => {
        await axios.delete(`http://localhost:8080/reports/delete/${reportId}`);
        navigate("/reports/read")
    }

    return (
        <div>
            <h1>ReportRead</h1>
            <button onClick={reportDelete}>삭제</button>
            <div key={templateData.id}>
                <p>{templateData.title}</p>
                <div>
                    <p>{reportData.title}</p>
                    <p>{reportData.modifiedAt}</p>
                    {questionData.map((question) => (
                        <div key={question.order}>
                            <p>질문 : {question.questionText}</p>
                        <ReportAnswer questionId={question.id} reportId={reportData.id}/>
                        </div>
                    ))}
                    <Link to={`/replies/${reportData.id}`}>댓글보기</Link>
                </div>
            </div>
        </div>
    )
}

export default ReportRead