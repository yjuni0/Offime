import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { HttpHeadersContext } from '../../context/HttpHeadersProvider';

function useAuthMemberInfo() {
    const [member, setMember] = useState('');
    const { headers } = useContext(HttpHeadersContext);

    const fetchMember = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8080/member/myInfo',
                { headers: headers }
            );
            console.log('서버 응답:', response.data);
            setMember(response.data);
        } catch (error) {
            console.error('직원 데이터를 불러오는 중 오류 발생:', error);
            setMember(null);
        }
    };

    useEffect(() => {
        fetchMember();
    }, [headers]);

    return { member, fetchMember };
}

export default useAuthMemberInfo;
