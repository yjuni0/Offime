import axios from "axios";
import {useEffect, useState} from "react";


function ReportAnswer({questionId, reportId}) {

    const [responseData, setResponseData] = useState([]);

    const getResponse = async () => {
        await axios.get(`http://localhost:8080/reports/read/response/${questionId}`).then((res) => setResponseData(res.data))
    }

    useEffect(() => {
        getResponse();
    }, []);

    const answer = responseData.find((r) => r.reportId === reportId)?.answerText || "";

    return (
        <div>
            답변 : {answer}
        </div>
    )

    }

export default ReportAnswer