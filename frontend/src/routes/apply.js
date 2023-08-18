import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import "./design_apply.css";

import programData from '../data/programData.json';

function ProgramDetailRoute() {
    const history = useHistory();
    const { id } = useParams();
    const selectedProgramId = id;
    const selectedProgramData = programData.find(programData => programData._id === selectedProgramId);
    const applicationStartDate = new Date(selectedProgramData.applicationDate.applicationStart);
    const applicationEndDate = new Date(selectedProgramData.applicationDate.applicationEnd);

    return (
        <div>
            <div className="menuBar">
                <Link to={'/'}><h2 className="title">만학도서관</h2></Link>
                <button className="communityButton" onClick={() => history.push('/community')}>커뮤니티</button>
            </div>

            <section id="banner">
                <div className="content">
                    <p className="name">프로그램명</p>
                    <h1 className="nameTitle">{selectedProgramData.name}</h1>
                    <ul className="actions">
                        <Link to = {`/apply/${id}/form`} className="button">
                            신청하기
                        </Link>
                    </ul>
                </div>
            </section>

            <section id="one" className="wrapper">
                <div className="row">
                    <div className="InfoFirst">
                        <div>
                            <h3>장소</h3>
                            <p>
                                {selectedProgramData.location.specificlocation},
                                {selectedProgramData.location.gugun}, 
                                {selectedProgramData.location.city}
                            </p>
                        </div>
                        <div>
                            <div>
                                <h3>상세 위치</h3>
                                <p>위도: {selectedProgramData.location.latitude},
                                    경도: {selectedProgramData.location.longitude}</p><br />
                            </div>
                            <div>
                                <h3>수강료</h3>
                                <p>{selectedProgramData.price}</p>
                            </div>
                        </div>
                    </div>
                    <div className="InfoSec">
                        <div>
                            <h3>접수 시작 및 마감 기간</h3>
                            <p>{applicationStartDate.toLocaleDateString()} ~
                                {applicationEndDate.toLocaleDateString()}
                            </p><br />
                        </div>
                        <div>
                            <h3>교육 기간</h3>
                            <p>{selectedProgramData.programDate}</p><br />
                        </div>
                        <div>
                            <h3>교육기관 홈페이지</h3>
                            <p>{selectedProgramData.homepage}</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer id="footer">
                <div className="inner">
                    <h2>Get In Touch</h2>
                    <ul className="actions">
                        <p>(02) 123-000, likelion@gmail.com</p>
                        <p>멋쟁이 사자처럼 11기 노웨이즈</p>
                    </ul>
                </div>
            </footer>
            <div className="copyright">
                Powered by:{" "}
                <a href="https://www.lifelongedu.go.kr">국가평생학습포털 늘배움</a>
                <p>Copyright © 2023 No-ways, LIKELION. All rights reserved.</p>
            </div>
        </div>
    );
}


export default ProgramDetailRoute;

