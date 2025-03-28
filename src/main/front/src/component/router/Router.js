import Home from "../Home";
import ForCheck from "../reports/ForCheck";
import { Route, Routes } from "react-router-dom";
import TemplateCreate from "../reports/templates/TemplateCreate";
import ReportCreateTemplateSelect from "../reports/reports/create/ReportCreateTemplateSelect";
import ReportCreate from "../reports/reports/create/ReportCreate";
import ReportRead from "../reports/reports/read/ReportRead";
import ReportList from "../reports/reports/read/ReportList";
import ReportReplies from "../reports/replies/ReportReplies";
import TemplateList from "../reports/templates/TemplateList";
import ReportUpdate from "../reports/reports/update/ReportUpdate";
import Schedule from "../schedule/Schedule";
import Login from "../login/Login";
import Signup from "../login/Signup";
import ExpenseDetail from "../expense/ExpenseDetail";
import ExpenseList from "../expense/ExpenseList";
import ExpenseWrite from "../expense/ExpenseWrite";
import ExpenseUpdate from "../expense/ExpenseUpdate";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/templates/create" element={<TemplateCreate />} />
      <Route
        path="/reports/templateList"
        element={<ReportCreateTemplateSelect />}
      />
      <Route path="/reports/create/:templateId" element={<ReportCreate />} />
      <Route path="/reports/read/:reportId" element={<ReportRead />} />
      <Route path="/reports/read" element={<ReportList />} />
      <Route path="/replies/:reportId" element={<ReportReplies />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/templates/list" element={<TemplateList />} />
      <Route path="/reports/update/:reportId" element={<ReportUpdate />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/expenseDetail/:id" element={<ExpenseDetail />} />
      <Route path="/expenseList" element={<ExpenseList />} />
      <Route path="/expenseWrite" element={<ExpenseWrite />} />
      <Route path="/expenseUpdate/:id" element={<ExpenseUpdate />} />
    </Routes>
  );
}

export default Router;
