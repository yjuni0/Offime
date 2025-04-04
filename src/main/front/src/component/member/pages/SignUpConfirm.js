import { useEffect, useState } from 'react';
import axios from 'axios';
import useSignUpConfirm from '../api/useSignUpConfirm';

const SignUpConfirm = () => {
    const { pendingMembers, error, updateSignUpStatusToActive } =
        useSignUpConfirm();

    return (
        <section className="sec">
            <div className="inner">
                <div className="item">
                    <p className="fs_lg">가입 승인</p>
                    <br />
                    {error && <div>{error}</div>}
                    <table>
                        <tbody>
                            {pendingMembers.length === 0 ? (
                                <tr>
                                    <td colSpan="2" className="no-data">
                                        가입 신청자가 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                pendingMembers.map((member) => (
                                    <tr key={member.email}>
                                        <td
                                            className="member_bar"
                                            onClick={() =>
                                                updateSignUpStatusToActive(
                                                    member.email
                                                )
                                            }
                                        >
                                            <div className="member_info">
                                                <div className="profile_picture">
                                                    <img
                                                        src={
                                                            member.profileImageUrl
                                                                ? `${process.env.PUBLIC_URL}${member.profileImageUrl}`
                                                                : '/image/member/profile_no_image.jpg'
                                                        }
                                                        alt="프로필"
                                                    />
                                                </div>
                                                <div className="member_details">
                                                    <span className="member_name">
                                                        {member.name}
                                                    </span>
                                                    <span className="member_team">
                                                        {member.email}
                                                    </span>
                                                </div>
                                            </div>
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
