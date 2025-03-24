import Home from "../reports/Home";
import {Route, Routes} from "react-router-dom";
import TemplateCreate from "../reports/templates/TemplateCreate";


function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/templates/create" element={<TemplateCreate />} />
        </Routes>
    )
}

export default Router;