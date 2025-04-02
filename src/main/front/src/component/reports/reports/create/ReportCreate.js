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


                    <section className={"sec"}>
                        <div className={"inner"}>
                            <div className={"item"}>
                                <img onClick={() => navigate(-1)} style={{cursor: "pointer", width: "1.5rem"}} src={"/image/reportIcon/backArrow.png"}/>
                                <div className={"btn bg_pm mt_md"}>
                                    <p className={"txt-a-c"}>{templateData.title}</p>
                                </div>
                                <form onSubmit={postReport}>
                                    <input className={"mlr-a input-txt mt_md input-max"} placeholder={"제목"} type={"text"} value={title}
                                           onChange={(e) => setTitle(e.target.value)}/>
                                    <ReportCreateQuestionBlock templateId={templateId} setResponseData={setResponseData}
                                                               responseData={responseData}/>
                                    <button className={"btn btn-lg btn-pm mt_md mlr-a"} type={"submit"}>보고서 작성</button>
                                </form>
                            </div>
                        </div>
                    </section>

    )
}

export default ReportCreate;