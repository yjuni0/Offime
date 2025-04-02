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

    const [isUpdate, setIsUpdate] = useState(false);

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
        <section className={"sec"}>
            <div className={"inner"}>
                <div className={"item"}>
                    <div style={{display:"flex", justifyContent:"space-between" }}>
                    <img style={{cursor: "pointer", width: "1.5rem", display: "inline"}}
                         src={"/image/reportIcon/backArrow.png"}
                         onClick={() => navigate(`/reports/read`)}/>
                    <img style={{cursor: "pointer", width: "1.5rem", display: "inline"}} src={"/image/reportIcon/recyclebin.png"} onClick={reportDelete}/>
                    </div>
                    <div key={templateData.id}>

                        <div>
                            <div className={"btn btn-max btn-pm mt_md mb_md"}>
                                    <p>{reportData.title}</p>
                                    <p>{reportData.modifiedAt}</p>
                            </div>
                                    {questionData.map((question) => (
                                        question.type !== "SECTION" ? <div className={"item btn btn-max btn-pm mb_md"} key={question.order}>
                                            <p>질문 : {question.questionText}</p>
                                            <ReportAnswer questionId={question.id} reportId={reportData.id} type={question.type}/>
                                        </div> : <hr className={"mt_lg mb_lg"}/>
                                    ))}

                            <div style={{display:"flex", justifyContent:"space-around"}}>
                                    <Link to={`/replies/${reportData.id}`}><button className={"btn btn-md btn-pm"}>댓글보기</button></Link>
                            <Link to={`/reports/update/${reportData.id}`}><button className={"btn btn-md btn-pm"}>수정</button>

                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default ReportRead