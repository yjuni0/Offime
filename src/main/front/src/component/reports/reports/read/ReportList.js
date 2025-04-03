import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function ReportList() {

    const [reportList, setReportList] = useState([]);

    const [memberNames, setMemberNames] = useState({});

    const getReportList = async () => {
        await axios.get('http://localhost:8080/reports/read').then((res) => setReportList(res.data));
    }


    const navigate = useNavigate();

    useEffect(() => {
        getReportList()
    }, []);


    return (
                    <section className={"sec"}>
                        <div className={"inner"}>
                            <div className={"item"}>
                                <div>
                                    <img onClick={() => navigate("/reports")}
                                         style={{cursor: "pointer", width: "1.5rem", display: "inline"}} src={"/image/reportIcon/backArrow.png"}/>
                                    <p className={"txt-a-l ml_sm"} style={{display:"inline"}}>보고서</p>
                                </div>
                                {reportList.map((report) => (
                                    <div className={"item btn btn-pm mt_md"} key={report.id} onClick={() => navigate(`/reports/read/${report.id}`)}
                                         style={{cursor: "pointer", borderRadius:"10px"}}>
                                        <p>제목 : {report.title}</p>
                                        <p>수정 날짜 : {report.modifiedAt}</p>
                                        <p>작성자 :  </p>
                                    </div>))}
                            </div>
                        </div>
                    </section>

    )
}

export default ReportList