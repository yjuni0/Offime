import ReportRepliesList from "./ReportRepliesList";
import ReportRepliesWrite from "./ReportRepliesWrite";
import {useParams} from "react-router-dom";


function ReportReplies() {

    const reportId = useParams().reportId

    return (
        <>
            <ReportRepliesList reportId={reportId}/>
            <ReportRepliesWrite reportId={reportId}/>
        </>
    )
}

export default ReportReplies