import Home from "../reports/Home";
import {Route, Routes} from "react-router-dom";
import TemplateCreate from "../reports/templates/TemplateCreate";
import ReportCreateTemplateSelect from "../reports/reports/create/ReportCreateTemplateSelect";
import ReportCreate from "../reports/reports/create/ReportCreate";
import ReportRead from "../reports/reports/read/ReportRead";
import ReportList from "../reports/reports/read/ReportList";
import ReportReplies from "../reports/replies/ReportReplies";


function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/templates/create" element={<TemplateCreate />} />
            <Route path="/reports/templateList" element={<ReportCreateTemplateSelect/>}/>
            <Route path="/reports/create/:templateId" element={<ReportCreate/>}/>
            <Route path="/reports/read/:reportId" element={<ReportRead/>}/>
            <Route path="/reports/read" element={<ReportList/>}/>
            <Route path="/replies/:reportId" element={<ReportReplies/>}/>
        </Routes>
    )
}

export default Router;