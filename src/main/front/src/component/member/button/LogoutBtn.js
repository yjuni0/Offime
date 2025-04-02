import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { HttpHeadersContext } from '../../context/HttpHeadersProvider';

function LogoutBtn() {
    const { setAuth } = useContext(AuthContext);
    const { setHeaders } = useContext(HttpHeadersContext);
    const navigate = useNavigate();

    const logout = () => {
        const confirmLogout = window.confirm('정말 로그아웃 하시겠습니까?');

        if (confirmLogout) {
            localStorage.removeItem('CL_access_token');
            localStorage.removeItem('email');
            localStorage.removeItem('id');
            localStorage.removeItem('role');
            localStorage.removeItem('name');

            setAuth(null);
            setHeaders({ Authorization: '' });
            navigate('/');

            alert('로그아웃 되었습니다.');
        }
    };
    return (
        <button className="Logout-btn" onClick={logout}>
            로그아웃
        </button>
    );
}

export default LogoutBtn;
