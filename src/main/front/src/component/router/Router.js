import { Route, Routes } from 'react-router-dom';

import Home from '../Home';

import Login from '../member/pages/Login';
import SignUp from '../member/pages/SignUp';
import PageTest from '../member/pages/PageTest';
import SignUpConfirm from '../member/pages/SignUpConfirm';

import ForCheck from '../reports/ForCheck';
import TemplateCreate from '../reports/templates/TemplateCreate';
import ReportCreateTemplateSelect from '../reports/reports/create/ReportCreateTemplateSelect';
import ReportCreate from '../reports/reports/create/ReportCreate';
import ReportRead from '../reports/reports/read/ReportRead';
import ReportList from '../reports/reports/read/ReportList';
import ReportReplies from '../reports/replies/ReportReplies';
import TemplateList from '../reports/templates/TemplateList';
import ReportUpdate from '../reports/reports/update/ReportUpdate';

import Schedule from '../schedule/Schedule';

import ExpenseDetail from '../expense/ExpenseDetail';
import ExpenseList from '../expense/ExpenseList';
import ExpenseWrite from '../expense/ExpenseWrite';
import ExpenseUpdate from '../expense/ExpenseUpdate';
import Management from '../member/pages/Management';
import MemberDetail from '../member/pages/MemberDetail';

import AttendanceBanner from '../attendance/AttendanceBanner';
import AttendanceManager from '../attendance/AttendanceManager';
// import AttendanceRateForLeader from '../attendance/AttendanceRateForLeader';
// import ClockInForLeader from '../attendance/pages/employee/ClockInForLeader';
// import AbsentForLeader from '../attendance/pages/employee/AbsentForLeader';
// import BeforeClockInForLeader from '../attendance/pages/employee/BeforeClockInForLeader';
// import WorkStatusForLeader from '../attendance/pages/employee/WorkStatusForLeader';
// import LateForLeader from '../attendance/pages/employee/LateForLeader';
// import LeaveEarlyForLeader from '../attendance/pages/employee/LeaveEarlyForLeader';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/pageTest" element={<PageTest />} />
            <Route path="/member" element={<Management />} />
            <Route path="/member/:id" element={<MemberDetail />} />
            <Route path="/member/signUpStatus" element={<SignUpConfirm />} />

            <Route path="/home" element={<Home />} />
            <Route path="/templates/create" element={<TemplateCreate />} />
            <Route
                path="/reports/templateList"
                element={<ReportCreateTemplateSelect />}
            />
            <Route
                path="/reports/create/:templateId"
                element={<ReportCreate />}
            />
            <Route path="/reports/read/:reportId" element={<ReportRead />} />
            <Route path="/reports/read" element={<ReportList />} />
            <Route path="/replies/:reportId" element={<ReportReplies />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/templates/list" element={<TemplateList />} />
            <Route
                path="/reports/update/:reportId"
                element={<ReportUpdate />}
            />

            <Route path="/expenseDetail/:id" element={<ExpenseDetail />} />
            <Route path="/expenseList" element={<ExpenseList />} />
            <Route path="/expenseWrite" element={<ExpenseWrite />} />
            <Route path="/expenseUpdate/:id" element={<ExpenseUpdate />} />

            <Route path="/attendanceBanner" element={<AttendanceBanner />} />
            <Route path="/attendanceManager" element={<AttendanceManager />} />
            {/* <Route path="/attendanceManager/attendanceRateForLeader" element={<AttendanceRateForLeader />} />
            <Route path="/attendanceManager/clockInForLeader" element={<ClockInForLeader />} />
            <Route path="/attendanceManager/beforeClockInForLeader" element={<BeforeClockInForLeader />} />
            <Route path="/attendanceManager/absentForLeader" element={<AbsentForLeader />} />
            <Route path="/attendanceManager/workStatusForLeader" element={<WorkStatusForLeader />} />
            <Route path="/attendanceManager/lateForLeader" element={<LateForLeader />} />
            <Route path="/attendanceManager/leaveEarlyForLeader" element={<LeaveEarlyForLeader />} /> */}

        </Routes>
    );
}

export default Router;
