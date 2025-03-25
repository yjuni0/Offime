import Home from "../reports/Home";
import {Route, Routes} from "react-router-dom";
import TemplateCreate from "../reports/templates/TemplateCreate";
import ReportCreateTemplateSelect from "../reports/reports/ReportCreateTemplateSelect";
import ReportCreate from "../reports/reports/ReportCreate";


function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/templates/create" element={<TemplateCreate />} />
            <Route path="/reports/templateList" element={<ReportCreateTemplateSelect/>}/>
            <Route path="/reports/create/:templateId" element={<ReportCreate/>}/>
        </Routes>
    )
}

export default Router;