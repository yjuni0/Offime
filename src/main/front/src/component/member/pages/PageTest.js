<<<<<<< HEAD
// import Logout from "../button/LogoutBtn";
// import Management from "./Management";
// import LeaveBtn from "../button/LeaveBtn";
// import { Link } from "react-router-dom";
// import Sse from "../../notification/Sse";
// import HeaderNav from "../../header/HeaderNav";
// function PageTest() {
//   return (
//     <section className="sec">
//       <div className="inner">
//         <div className="item">
//           <HeaderNav />
//           <h3>컴포넌트</h3>
//           <Logout />
//           <LeaveBtn />
//           <Link to={"/member"}>직원 관리</Link>
//           <br />
//           <Link to={"/notification"}>알림</Link>
//           <br />
//           <Link to={"/member/signUpStatus"}>가입 승인</Link>
//           <Sse />
//         </div>
//       </div>
//     </section>
//   );
// }
// export default PageTest;
=======
import { Link } from 'react-router-dom';
import Menu from './Menu';

function PageTest() {
    return (
        <section className="sec">
            <div className="inner">
                <div className="item">
                    <Link to={'/menu'}>메뉴</Link>
                </div>
            </div>
        </section>
    );
}
export default PageTest;
>>>>>>> 3b1e12d85a949549e516839c8699a7ce43a6a5d6
