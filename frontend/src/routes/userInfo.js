import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import './design_userInfo.css';

function UserInfo() {
    const history = useHistory();
    const { id } = useParams();
    const host = "link";
    axios.create({
        baseURL: host,
    });

    const [userName, setUserName] = useState('');
    const [userPhoneNum, setUserPhoneNum] = useState('');
    const [userBirth, setUserBirth] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState('');

    /*const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };
    const handleAnswerChange = (event) => {
        setSelectedAnswer(event.target.value);
    };*/

    const handleSubmit = async () => {
        const isValid = true; // Implement your validation logic

        if (isValid) {
            try {
                const response = await fetch(`api/programs/apply/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userName,
                        userPhoneNum,
                        userBirth,
                        userAddress,
                        userEmail,
                        selectedGender,
                        selectedAnswer,
                    }),
                });

                if (response.ok) {
                    const result = await response.json();
                    /*
                    if (result.message === '신청이 완료되었습니다.') {
                        const incrementResponse = await fetch(`http://localhost:4000/programs/apply/${id}`, {
                            method: 'POST',
                        });

                        if (incrementResponse.ok) {
                            alert('신청이 완료되었습니다.');
                            history.push(`apply/${id}`);
                        } else {
                            alert('신청에 실패했습니다.');
                        }
                    } else {
                        alert('신청에 실패했습니다.');
                    } */
                    alert(result.message);
                } else {
                    alert('신청에 실패했습니다.');
                }
            } catch (error) {
                console.error('Error applying:', error);
                alert('신청에 실패했습니다.');
            }
        } else {
            alert('이름, 전화번호 및 수강 대상 여부를 모두 작성해주세요.');
        }
    };

    return (
        <div>
            <div className="menuBar">
                <Link to={'/'}><h2 className="title">만학도서관</h2></Link>
                <button className="communityButton" onClick={() => history.push('/community')}>커뮤니티</button>
            </div>
            <section id="main">
                <div className="inner">
                    <h1 className="applyTitle">프로그램 수강 신청</h1>
                </div>
            </section>

            <div className="submit-wrapper">
                <form id="submit-form">
                    <h3>이름</h3>
                    <input
                        className='inputField'
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="홍길동"
                        required
                    />

                    <h3>전화번호</h3>
                    <input
                        className='inputField'
                        type="tel"
                        value={userPhoneNum}
                        onChange={(e) => setUserPhoneNum(e.target.value)}
                        placeholder="010-1234-5678"
                        required
                    />

                    <h3>생년월일</h3>
                    <input
                        className='inputField'
                        type="date"
                        value={userBirth}
                        onChange={(e) => setUserBirth(e.target.value)}
                        required
                    />

                    <h3>주소</h3>
                    <input
                        className='inputField'
                        type="text"
                        value={userAddress}
                        onChange={(e) => setUserAddress(e.target.value)}
                        placeholder="서울특별시 종로구 성균관로 25-2"
                        required
                    />

                    <h3>이메일</h3>
                    <input
                        className='inputField'
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="likelion@gmail.com"
                        required
                    />


                    <h3>성별</h3>
                    <div className="checkbox-sex">
                        <label>
                            <input
                                className='input1'
                                type="radio"
                                name="sex"
                                value="male"
                                checked={selectedGender === 'male'}
                                onChange={() => setSelectedGender('male')}
                            />
                            남
                        </label>
                        <label>
                            <input
                                className='input2'
                                type="radio"
                                name="sex"
                                value="female"
                                checked={selectedGender === 'female'}
                                onChange={() => setSelectedGender('female')}
                                required
                            />
                            여
                        </label>
                    </div>
                    <h3>신청 대상에 해당하십니까?</h3>
                    <div className="checkbox-answer">
                        <label htmlFor="answer-yes">
                            <input
                                className='input1'
                                type="radio"
                                id="answer-yes"
                                name="answer"
                                value="yes"
                                checked={selectedAnswer === 'yes'}
                                onChange={() => setSelectedAnswer('yes')}
                                required
                            />
                            예
                        </label>
                        <label htmlFor="answer-no">
                            <input
                                className='input2'
                                type="radio"
                                id="answer-no"
                                name="answer"
                                value="mp"
                                checked={selectedAnswer === 'no'}
                                onChange={() => setSelectedAnswer('no')}
                                required
                            />
                            아니오
                        </label>
                    </div>

                    <button type="button" id="submit-button" onClick={handleSubmit}>
                        수강신청
                    </button>
                </form>
            </div>

            {/* Footer */}
            <footer id="footer">
                <div className="inner">
                    <div className="actions">
                        <p>(02) 123-000, likelion@gmail.com</p>
                        <p>멋쟁이 사자처럼 11기 노웨이즈</p>
                    </div>
                </div>
            </footer>
            <div className="copyright">
                Powered by: <a href="https://www.lifelongedu.go.kr">국가평생학습포털 늘배움</a>
                <p>Copyright © 2023 No-ways, LIKELION. All rights reserved.</p>
            </div>
        </div>
    );
}

export default UserInfo;