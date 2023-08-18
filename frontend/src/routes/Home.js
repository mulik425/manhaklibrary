import { useEffect, useState } from "react";
import RecommendProgram from "../module/recommendProgram";
import { Link, useHistory } from 'react-router-dom';
import styles from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faRotate } from "@fortawesome/free-solid-svg-icons";

function Home() {

    const suggestKeywordArr = ['디지털', '컴퓨터', '자격증', '창업', '도서관', '스마트폰', '실습', '기능사', '문화', '코딩', '제과제빵', '미용', '무용', '기초']
    const history = useHistory();

    const [keyword, setKeyword] = useState('');
    const [randomSuggestKeywords, setRandomSuggestKeywords] = useState([]);
 
    useEffect(() => {
        generateRandomKeywords();
    }, []);

    const generateRandomKeywords = () => {
        const randomKeywords = [];
        for (let i = 0; i < 5; i++) {
            const randomWord = suggestKeywordArr[Math.floor(Math.random() * suggestKeywordArr.length)];
            randomKeywords.push(randomWord);
        }
        setRandomSuggestKeywords(randomKeywords);
    };

    const onChange = (event) => {
        setKeyword(event.target.value);
    };

    const handleRefreshClick = () => {
        generateRandomKeywords();
    };

    return (
        <div>
            <div className={styles.menuBar}>
                <Link to={'/'}><h2 className={styles.title}>만학도서관</h2></Link>
                <button className={styles.communityButton} onClick={() => history.push('/community')}>커뮤니티</button>
            </div>
            <div className={styles.searchField}>
                <h3 className={styles.searchTitle}>프로그램 검색</h3>
                <div className={styles.searchCover}>
                    <input onChange={onChange} className={styles.searchInput} placeholder="원하시는 프로그램 종류를 입력해주세요" />
                    <Link to={`search/${keyword}`}><button className={styles.searchButton}><FontAwesomeIcon icon={faSearch} className={styles.searchIcon} /></button></Link>
                </div>
                <div className={styles.searchKeyword}>
                    <h5 className={styles.keywordTitle}>추천 검색어</h5>
                    {randomSuggestKeywords.map((el, index) => (
                        <Link to={`search/${el}`}><span className={styles.keyword}>#{el}</span></Link>
                    ))}
                    <button className={styles.refreshButton} onClick={handleRefreshClick}><FontAwesomeIcon icon={faRotate} /></button>
                </div>
            </div>
            <RecommendProgram />
            <footer className={styles["footer"]}>
                <div className={styles["inner"]}>
                    <ul className={styles["actions"]}>
                        <p>(02) 123-000, likelion@gmail.com</p>
                        <p>멋쟁이 사자처럼 11기 노웨이즈</p>
                    </ul>
                </div>
                <div className={styles["copyright"]}>
                    Powered by:{" "}
                    <a href="https://www.lifelongedu.go.kr">국가평생학습포털 늘배움</a>
                    <p>Copyright © 2023 No-ways, LIKELION. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default Home;