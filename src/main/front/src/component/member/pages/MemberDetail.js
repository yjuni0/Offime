import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MemberDetail() {
    const { id } = useParams();
    const [member, setMember] = useState('');

    const fetchMemberData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/member/${id}`
            );
            setMember(response.data);

            console.log('직원 데이터', JSON.stringify(response.data));
        } catch (error) {
            console.error('Error fetching member data:', error);
        }
    };

    // 컴포넌트 마운트 시 데이터 불러오기
    useEffect(() => {
        fetchMemberData();
    }, []);

    return (
        <section className="sec">
            <div className="inner">
                <div className="item">
                    {/* 렌더링 확인용 */}
                    <p>이름{member.name}</p>
                    <p>이메일{member.email}</p>
                    <p>전화{member.phone}</p>
                    <p>직책{member.role}</p>
                    <p>팀{member.team}</p>
                </div>
            </div>
        </section>
    );
}
export default MemberDetail;
