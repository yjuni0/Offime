import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
import { HttpHeadersContext } from '../../context/HttpHeadersProvider';
import { useNavigate } from 'react-router-dom';

function useLeaveBtn() {
    const [message, setMessage] = useState('');
    const { headers, setHeaders } = useContext(HttpHeadersContext);
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLeave = async () => {
        try {
            const response = await axios.get('http://localhost:8080/unable', {
                headers,
            });
            const confirmLeave = window.confirm('정말 탈퇴하시겠습니까?');

            if (confirmLeave) {
                localStorage.removeItem('CL_access_token');
                localStorage.removeItem('email');
                localStorage.removeItem('id');
                localStorage.removeItem('role');
                localStorage.removeItem('name');

                setAuth(null);
                setHeaders({ Authorization: '' });
                alert('비활성화 처리되었습니다.');
                navigate('/');
            }
        } catch (error) {
            setMessage('탈퇴 요청 중 오류가 발생했습니다.');
        }
    };

    return { handleLeave, message };
}
export default useLeaveBtn;
