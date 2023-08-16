import { useEffect, useState } from "react";
import axios from "axios";
import {Link, useHistory, useParams} from "react-router-dom";
import RegionTab from "../module/regionTab"
import styles from "./Search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Search() {
    const {keyword} = useParams();

    const [input, setInput] = useState('');
    const onChange = (event) => {
        setInput(event.target.value);
    };

    const [programs, setPrograms] = useState([]);

    const fetchPrograms = async (k) => {
        if (k !== null && k !== '') {
            /*const response = await axios.get(
                `http://localhost:5000/programs/keyword/:${k}`
              );
              setPrograms(response.data);*/
              axios.get(`http://localhost:5000/programs/keyword/${k}`)
              .then(response => {
                setPrograms(response.data);
                console.log(response)
              })
              .catch(error => {
                console.error('Error fetching users:', error);
              });
        }
      }

    useEffect(() => {
        fetchPrograms(keyword);
      }, [keyword]);

    const onClick = () => {
        setInput('');
    }

    const [tab, setTab] = useState('curr');

    return (
        <div>
            <div className={styles.menuBar}>
              <Link to= {'/'}><h2 className={styles.title}>노-ways</h2></Link>
            </div>
            <div className={styles.searchField}>
                <h3 className={styles.searchTitle}>프로그램 검색</h3>
                <div className={styles.searchCover}>
                    <input onChange={onChange} className={styles.searchInput} placeholder={keyword} value={input}/>
                    <Link to= {`${input}`}><button className={styles.searchButton} onClick={onClick}><FontAwesomeIcon icon={faSearch} className={styles.searchIcon} /></button></Link>
                </div>
            </div>
            <RegionTab />
            <div className = {styles.listDiv}>
            <div className = {styles.optionDiv}>
                <button className= {tab === 'curr' ? styles.optionButtonActive : styles.optionButton } onClick={() => setTab('curr')}>거리순</button>
                <button className= {tab === 'prev' ? styles.optionButtonActive : styles.optionButton } onClick={() => setTab('prev')}>인기순</button>
            </div>
            <ul>
            {programs.map((p) => (
                <li className={styles.programBox} key={p._id}>
                  <div className={styles.programDescription}>
                    <h4 className={styles.programTitle}>{p.name}</h4>
                    <span>
                        일시: {p.programDate}<br />
                        장소: {p.location.city}{p.location.gugun}{p.location.specificlocaiton}
                    </span>
                  </div>
                  <Link to={`/apply/${p._id}`}><button className={styles.applyButton}>신청</button></Link>
                </li>
            ))}
        </ul>
            </div>
        </div>
    )
}

export default Search;
