import {useEffect, useState} from "react";
import RecommendProgram from "../module/recommendProgram";
import { Link } from 'react-router-dom';
import styles from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faRotate } from "@fortawesome/free-solid-svg-icons";

function Home() {

    var suggestKeywordArr = ['바리스타', '자격증', '창업', '취업', '미용사']

    const [keyword, setKeyword] = useState('');
    const onChange = (event) => {
        setKeyword(event.target.value);
    };
    
    return (
        <div>
            <div className={styles.menuBar}>
                <Link to= {'/'}><h2 className={styles.title}>노-ways</h2></Link>
                <button className={styles.communityButton}>커뮤니티</button>
            </div>
            <div className={styles.searchField}>
                <h3 className={styles.searchTitle}>프로그램 검색</h3>
                <div className={styles.searchCover}>
                <input onChange={onChange} className={styles.searchInput} placeholder="원하시는 프로그램 종류를 입력해주세요" />
                <Link to= {`search/${keyword}`}><button className={styles.searchButton}><FontAwesomeIcon icon={faSearch} className={styles.searchIcon} /></button></Link>
                </div>
                <div className={styles.searchKeyword}>
                    <h5 className={styles.keywordTitle}>추천 검색어</h5>
                    {suggestKeywordArr.map((el, index) => (
                      <span className = {styles.keyword}>#{el}</span>
                    ))}
                    <button className={styles.refreshButton}><FontAwesomeIcon icon={faRotate} /></button>
                </div>
            </div>
            <RecommendProgram />
        </div>
    )
}

export default Home;