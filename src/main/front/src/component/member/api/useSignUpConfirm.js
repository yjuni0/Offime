import { useState, useEffect } from 'react';
import axios from 'axios';

function useSignUpConfirm() {
    const [pendingMembers, setPendingMembers] = useState([]);
    const [error, setError] = useState('');

    const fetchPendingMembers = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8080/member/signUpStatus'
            );
            setPendingMembers(response.data);
        } catch (error) {
            setError('가입 신청자를 불러오는 데 오류가 발생했습니다.');
        }
    };

    const updateSignUpStatusToActive = async (email) => {
        try {
            await axios.put(
                `http://localhost:8080/member/updateSignUpStatus?email=${email}`
            );
            fetchPendingMembers();
        } catch (error) {
            setError('상태 업데이트에 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        fetchPendingMembers();
    }, []);
    return { pendingMembers, error, updateSignUpStatusToActive };
}

export default useSignUpConfirm;
