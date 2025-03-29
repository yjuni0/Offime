import { useEffect, useState } from 'react';
import axios from 'axios';

const SignUpConfirm = () => {
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
            console.error(error);
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
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPendingMembers();
    }, []);

    return (
        <section className="sec">
            <div className="inner">
                <div className="item">
                    {error && <div>{error}</div>}
                    <table>
                        <tbody>
                            {pendingMembers.length === 0 ? (
                                <tr>
                                    <td colSpan="2">가입 신청자가 없습니다.</td>
                                </tr>
                            ) : (
                                pendingMembers.map((member) => (
                                    <tr key={member.email}>
                                        <td
                                            className="btn btn-pm-f btn-max"
                                            onClick={() =>
                                                updateSignUpStatusToActive(
                                                    member.email
                                                )
                                            }
                                        >
                                            {member.name}
                                            <br />
                                            {member.email}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default SignUpConfirm;
