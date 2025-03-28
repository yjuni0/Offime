import Logout from '../button/LogoutBtn';
import Management from './Management';
import LeaveBtn from '../button/LeaveBtn';
import { Link } from 'react-router-dom';

function MainPage() {
    return (
                                <h3>컴포넌트</h3>
                                <Logout />
                                <LeaveBtn />
                                <Link to={'/member'}>직원 관리</Link>
    );
}
export default MainPage;
