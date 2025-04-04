import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ReportCreateQuestionBlock from "./ReportCreateQuestionBlock";
import "../../../../css/report.css"

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

    const writerId = localStorage.getItem("id");

    const postReport = async (e) => {
        e.preventDefault();
        const data = {
            title, templateId, writerId, responseData
        }
        await axios.post('http://localhost:8080/reports/create', data)
        navigate("/reports/read")
    }

    useEffect(() => {
        console.log(responseData);
    }, [responseData]);

    return (


        <section className="reportCreateContainer">
            <div className="reportCreateInner">
                <img
                    onClick={() => navigate(-1)}
                    src="/image/report/backArrow.png"
                    className="reportCreateBackIcon"
                />

                <div className={`reportCreateHeader reportHeaderColor${templateData.color}`}>
                    <p>{templateData.title}</p>
                </div>

                <form onSubmit={postReport}>
                    <input
                        className="reportCreateInput"
                        placeholder="제목"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <ReportCreateQuestionBlock
                        templateId={templateId}
                        setResponseData={setResponseData}
                        responseData={responseData}
                    />

                    <button type="submit" className="reportCreateSubmit">
                        제출
                    </button>
                </form>
            </div>
        </section>

    )
}

export default ReportCreate;