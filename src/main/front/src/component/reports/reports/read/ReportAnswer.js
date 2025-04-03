import axios from "axios";
import {useEffect, useState} from "react";

function ReportAnswer({questionId, reportId, type}) {

    const [responseData, setResponseData] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);

    const getResponse = async () => {
        await axios.get(`http://localhost:8080/reports/read/response/${questionId}`)
            .then((res) => setResponseData(res.data));
    }

    useEffect(() => {
        getResponse();
    }, []);

    const matchedResponse = responseData.find((r) => r.reportId === reportId);

    let answer = "";
    let downloadUrl = "";

    if (type === "TEXT" || type === "CHOICE") {
        answer = matchedResponse?.answerText || "";
    } else if (type === "TIME") {
        answer = matchedResponse?.startTime || "";
    } else if (type === "DATETIME") {
        answer = matchedResponse?.startDate || "";
    } else if (type === "TIME_RANGE") {
        answer = `${matchedResponse?.startTime || ""} ~ ${matchedResponse?.endTime || ""}`;
    } else if (type === "DATE_RANGE") {
        answer = `${matchedResponse?.startDate || ""} ~ ${matchedResponse?.endDate || ""}`;
    } else if (type === "FILE" || type === "IMAGE") {
        const fullUrl = matchedResponse?.fileUrl;
        if (typeof fullUrl === "string") {
            const fileName = fullUrl.split("/").pop(); // 파일명만 추출
            downloadUrl = `http://localhost:8080/file/download/${encodeURIComponent(fileName)}`;
        }
    }

    return (
        <div style={{backgroundColor:"#f0f0f0", borderRadius:"10px", padding: "10px", marginLeft:"0.5rem", marginRight:"0.5rem"}}>
            {
                type === "IMAGE" && downloadUrl ? (
                    <img
                        src={downloadUrl}
                        alt="업로드된 이미지"
                        style={{ maxWidth: "100px", borderRadius: "8px", marginTop: "10px" }}
                    />
                ) : type === "FILE" && downloadUrl ? (
                    <a href={downloadUrl} download target="_blank" rel="noopener noreferrer">
                        📎 다운로드
                    </a>
                ) : (
                    <p>{answer}</p>
                )
            }
        </div>
    );
}

export default ReportAnswer;
