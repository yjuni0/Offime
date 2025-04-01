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

import AttendanceManagerForLeader from '../attendance/pages/leader/AttendanceManagerForLeader';
import ClockInForLeader from '../attendance/pages/leader/ClockInForLeader';
import AbsentForLeader from '../attendance/pages/leader/AbsentForLeader';
import BeforeClockInForLeader from '../attendance/pages/leader/BeforeClockInForLeader';
import WorkStatusForLeader from '../attendance/pages/leader/WorkStatusForLeader';
import LateForLeader from '../attendance/pages/leader/LateForLeader';
import LeaveEarlyForLeader from '../attendance/pages/leader/LeaveEarlyForLeader';

import AttendanceManagerForEmployee from '../attendance/pages/employee/AttendanceManagerForEmployee';
import ClockInForEmployee from '../attendance/pages/employee/ClockInForEmployee';
import AbsentForEmployee from '../attendance/pages/employee/AbsentForEmployee';
import LateForEmployee from '../attendance/pages/employee/LateForEmployee';
import LeaveEarlyForEmployee from '../attendance/pages/employee/LeaveEarlyForEmployee';

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
            <Route path="/attendanceManagerForLeader" element={<AttendanceManagerForLeader />} />
            <Route path="/attendanceManagerForLeader/clockInForLeader" element={<ClockInForLeader />} />
            <Route path="/attendanceManagerForLeader/absentForLeader" element={<AbsentForLeader />} />
            <Route path="/attendanceManagerForLeader/beforeClockInForLeader" element={<BeforeClockInForLeader />} />
            <Route path="/attendanceManagerForLeader/workStatusForLeader" element={<WorkStatusForLeader />} />
            <Route path="/attendanceManagerForLeader/lateForLeader" element={<LateForLeader />} />
            <Route path="/attendanceManagerForLeader/leaveEarlyForLeader" element={<LeaveEarlyForLeader />} />

            <Route path="/attendanceManagerForEmployee" element={<AttendanceManagerForEmployee />} />
            <Route path="/attendanceManagerForEmployee/clockInForEmployee" element={<ClockInForEmployee />} />
            <Route path="/attendanceManagerForEmployee/absentForEmployee" element={<AbsentForEmployee />} />
            <Route path="/attendanceManagerForEmployee/lateForEmployee" element={<LateForEmployee />} />
            <Route path="/attendanceManagerForEmployee/leaveEarlyForEmployee" element={<LeaveEarlyForEmployee />} />

            

        </Routes>
    );
}

export default Router;