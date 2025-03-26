import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function ReportList() {

    const [reportList, setReportList] = useState([]);

    const getReportList = async () => {
        await axios.get('http://localhost:8080/reports/read').then((res) => setReportList(res.data));
    }

    const navigate = useNavigate();

    useEffect(() => {
        getReportList()
    }, []);


    return (
        <div>
            <h1>ReportList</h1>
            {reportList.map((report) => (
                <div key={report.id} onClick={() => navigate(`/reports/read/${report.id}`)} style={{cursor: "pointer"}}>
                    <p>제목 : {report.title}</p>
                    <p>수정 날짜 : {report.modifiedAt}</p>
                    <p>작성자 : {report.writerId}</p>
                </div>))}
        </div>
    )
}

export default ReportList