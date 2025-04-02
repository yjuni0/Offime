import Management from './Management';
import LeaveBtn from '../button/LeaveBtn';
import { Link } from 'react-router-dom';
import Menu from './Menu';

function PageTest() {
    return (
        <section className="sec">
            <div className="inner">
                <div className="item">
                    <LeaveBtn />
                    <br />
                    <Link to={'/member/signUpStatus'}>가입 승인</Link>
                    <br />
                    <Link to={'/menu'}>메뉴</Link>
                </div>
            </div>
        </section>
    );
}
export default PageTest;
