import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../css/member.css';

function Management() {
    const { id } = useParams();
    const [members, setMembers] = useState([]);
    const [search, setSearch] = useState(''); // 검색어 상태
    const [filteredMembers, setFilteredMembers] = useState([]); // 필터링된 직원 리스트 상태
    const navigate = useNavigate();

    // 직원 데이터를 불러오는 함수
    const fetchMembers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/member');
            const fetchedMembers = Array.isArray(response.data)
                ? response.data
                : response.data || [];
            setMembers(fetchedMembers);
            setFilteredMembers(fetchedMembers); // 초기 필터링
            console.log('data', response.data);
        } catch (error) {
            console.error('직원 데이터를 불러오는 중 오류 발생:', error);
            setMembers([]); // 오류 발생 시 빈 배열로 설정
        }
    };

    // 컴포넌트가 처음 렌더링될 때 직원 데이터 불러오기
    useEffect(() => {
        fetchMembers();
    }, []);

    // 검색 필터링
    useEffect(() => {
        const filtered = members.filter((member) => {
            const nameMatch = member.name
                ? member.name.toLowerCase().includes(search.toLowerCase())
                : false;
            return nameMatch;
        });
        setFilteredMembers(filtered); // 실시간으로 필터링된 목록 업데이트
    }, [search, members]); // `search` 또는 `members`가 변경될 때마다 실행

    // 직원 클릭 시 상세 페이지로 이동
    const handleMemberClick = (id) => {
        navigate(`/member/${id}`);
    };

    // 팀 상태를 반환하는 함수
    const getTeamStatus = (teamCode) => {
        switch (teamCode) {
            case 'A':
                return '미배정';
            case 'B':
                return '경영팀';
            case 'C':
                return '인사팀';
            case 'D':
                return '업무팀';
            default:
                return '미배정';
        }
    };

    return (
        <section className="sec">
            <div className="inner">
                <div className="item">
                    <p className="fs_lg">구성원</p>

                    {/* 검색 필드 */}
                    <div className="input-spacing">
                        <input
                            type="text"
                            className="input-form"
                            placeholder="직원 검색 (이름)"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} // 검색어 변경 시 상태 업데이트
                        />
                        <div className="divider-line"></div>
                    </div>

                    {/* 직원 리스트 */}
                    <div className="member_list">
                        <table>
                            <tbody>
                                {filteredMembers.map((member) => (
                                    <tr key={member.id}>
                                        <td
                                            className="member_bar"
                                            onClick={() =>
                                                handleMemberClick(member.id)
                                            }
                                        >
                                            <div className="member_info">
                                                <div className="profile_picture">
                                                    {/* 프로필 이미지, 없으면 기본 이미지 */}
                                                    <img
                                                        src={
                                                            member.profileImageUrl
                                                                ? `${process.env.PUBLIC_URL}${member.profileImageUrl}` // public 폴더 기준으로 접근
                                                                : '/image/member/profile_no_image.jpg' // 기본 이미지 경로
                                                        }
                                                        alt="프로필"
                                                    />
                                                </div>
                                                <div className="member_details">
                                                    <span className="member_name">
                                                        {member.name}
                                                    </span>
                                                    <span className="member_team">
                                                        {getTeamStatus(
                                                            member.team
                                                        )}{' '}
                                                        &nbsp;
                                                        {member.workStatus}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Management;
