import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import styles from "../routes/Search.module.css";

function SearchProgram(keyword) {

  const [programs, setPrograms] = useState([]);
  console.log(keyword)

  useEffect(() => {
    const fetchPrograms = async () => {
      if (keyword === null || keyword === '') {
        const response = await axios.get(
          `http://localhost:5000/programs/`
        );
        setPrograms(response.data);
      } else {
        const response = await axios.get(
          `http://localhost:5000/programs/keyword/:${keyword}`
        );
        setPrograms(response.data);
      }
    }
    fetchPrograms();
    console.log(programs);
  }, []);

  /*const [programs, setPrograms] = useState([]);

  const callApi = async () => {
    const res = await fetch(`http://localhost:5000/programs/keyword/:${keyword}`);
    const body = await res.json();
    setPrograms(body);
    console.log(body);
  };

  useEffect(() => {
    callApi();
  });*/

  return (
    <div>
        <ul>
            {programs.map((p) => {
                <li className={styles.programBox} key={p._id}>
                  <div className={styles.programDescription}>
                    <h4 className={styles.programTitle}>{p.name}</h4>
                    <span>
                        일시: {p.programDate}<br />
                        장소: {p.location.specificlocation}
                    </span>
                  </div>
                  <Link to={`/apply/${p.programId}`}><button className={styles.applyButton}>신청</button></Link>
                </li>
            })}
        </ul>    
    </div>
  )
};

export default SearchProgram;