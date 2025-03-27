import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ReportCreateQuestionBlock from "./ReportCreateQuestionBlock";

function ReportCreate() {

    const templateId = useParams().templateId;

    const [templateData, setTemplateData] = useState("");
    const navigate = useNavigate();

    const getTemplate = async () => {
        await axios.get(`http://localhost:8080/reports/template/${templateId}`).then((res) => setTemplateData(res.data))
    }

    useEffect(() => {
        getTemplate();
    }, []);

    // 보고서 작성

    const [title, setTitle] = useState('');
    const [responseData, setResponseData] = useState([]);

    const postReport = async (e) => {
        e.preventDefault();
        const data = {
            title, templateId, writerId: 1, responseData
        }
        await axios.post('http://localhost:8080/reports/create', data)
        navigate("/reports/read")
    }

    useEffect(() => {
        console.log(responseData);
    }, [responseData]);

    return (
        <div>
            <h1>보고서 작성 페이지</h1>
            템플릿 제목 : {templateData.title}
            <form onSubmit={postReport}>
                <input placeholder={"제목"} type={"text"} value={title} onChange={(e) => setTitle(e.target.value)} />
                <ReportCreateQuestionBlock templateId={templateId} setResponseData={setResponseData} responseData={responseData}/>
                <button type={"submit"}>보고서 작성</button>
            </form>
        </div>
    )
}

export default ReportCreate;