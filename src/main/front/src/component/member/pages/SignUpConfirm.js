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
