import { Route, Routes } from 'react-router-dom';

// Member
import Login from '../member/pages/Login';
import SignUp from '../member/pages/SignUp';
import PageTest from '../member/pages/PageTest';
import SignUpConfirm from '../member/pages/SignUpConfirm';
import Menu from '../member/pages/Menu';
import Management from '../member/pages/Management';
import MemberDetail from '../member/pages/MemberDetail';

// Report
import Home from '../Home';
import ForCheck from '../reports/ForCheck';
import TemplateCreate from '../reports/templates/TemplateCreate';
import ReportCreateTemplateSelect from '../reports/reports/create/ReportCreateTemplateSelect';
import ReportCreate from '../reports/reports/create/ReportCreate';
import ReportRead from '../reports/reports/read/ReportRead';
import ReportList from '../reports/reports/read/ReportList';
import ReportReplies from '../reports/replies/ReportReplies';
import TemplateList from '../reports/templates/TemplateList';
import ReportUpdate from '../reports/reports/update/ReportUpdate';

// Schedule
import Schedule from '../schedule/Schedule';

// Expense
import ApprovedExpensesPage from '../expense/ApprovedExpensesPage';
import ExpenseDetail from '../expense/ExpenseDetail';
import ExpenseList from '../expense/ExpenseList';
import ExpenseWrite from '../expense/ExpenseWrite';
import ExpenseUpdate from '../expense/ExpenseUpdate';
import Chatbot from '../expense/Chatbot';

// Attendance
import AttendanceBanner from '../attendance/AttendanceBanner';
import AttendanceManagerForEmployee from '../attendance/AttendanceManagerForEmployee';
import AttendanceManagerForLeader from '../attendance/AttendanceManagerForLeader';

// Vacation + Notification
import Notification from '../notification/Notification';
import VacationApply from '../vacation/pages/VacationApply';
import ResVacation from '../vacation/component/ResVacation';
import VacationDetail from '../vacation/pages/VacationDetail';
import SelectStatus from '../vacation/component/SelectStatus';
import VacationAdminPage from '../vacation/pages/VacationAdminPage';

function Router() {
    return (
        <Routes>
            {/* Member - 최수민 20250404 19:00 */}
            <Route path="/" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/pageTest" element={<PageTest />} />
            <Route path="/member" element={<Management />} />
            <Route path="/member/:id" element={<MemberDetail />} />
            <Route path="/member/signUpStatus" element={<SignUpConfirm />} />
            <Route path="/menu" element={<Menu />} />

            {/* Report - 손수용 20250404 19:00 */}
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

            <Route path="/templates/list" element={<TemplateList />} />
            <Route
                path="/reports/update/:reportId"
                element={<ReportUpdate />}
            />
            <Route path="/reports" element={<ForCheck />} />

            {/* Schedule - 김성우 20250404 19:00 */}
            <Route path="/schedule" element={<Schedule />} />

            {/* Expense - 박시진 20250404 19:00 */}
            <Route path="/expenseDetail/:id" element={<ExpenseDetail />} />
            <Route path="/expenseList" element={<ExpenseList />} />
            <Route path="/expenseWrite" element={<ExpenseWrite />} />
            <Route path="/expenseUpdate/:id" element={<ExpenseUpdate />} />
            <Route
                path="/approved-expenses"
                element={<ApprovedExpensesPage />}
            />
            <Route path="/chatbot" element={<Chatbot />} />

            {/* Attendance - 이영현 20250404 19:00 */}
            <Route path="/attendanceBanner" element={<AttendanceBanner />} />
            <Route
                path="/attendanceManagerForEmployee"
                element={<AttendanceManagerForEmployee />}
            />
            <Route
                path="/attendanceManagerForLeader"
                element={<AttendanceManagerForLeader />}
            />

            {/* Vacation + notifcication - 오예준 20250404 19:00 */}
            <Route path="/notification" element={<Notification />} />
            <Route path="/vacation/:vacationId" element={<VacationDetail />} />
            <Route path="/vacationApply" element={<VacationApply />} />
            <Route path="/vacation" element={<ResVacation />} />
            <Route path="/vacationList/:status?" element={<SelectStatus />} />
            <Route path="/vacationAdmin" element={<VacationAdminPage />} />
        </Routes>
    );
}

export default Router;
