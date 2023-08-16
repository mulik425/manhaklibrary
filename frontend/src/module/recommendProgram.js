import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import styled from 'styled-components';

const HotProgramField = styled.div`
  width: 800px;
  margin: 20px auto;
  
  .programDiv {
    width: 800px;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    justify-content: center;
    align-items: center;
  }

  .hotProgram {
    font-size: 16px;
    width: 240px;
    height: 10rem;
    background-color: white;
    border: 0px;
    border-radius: 10px;
    box-shadow: 0px 2px 8px 0px rgb(174, 174, 174);
    margin: 10px;
    padding: 0px;
  }

  .hotProgramTitle {
    text-align: left;
    font-size: 16px;
    background-color: rgb(255, 241, 172);
    color: black;
    padding: 5px 10px;
    margin-bottom: 10px;
    border: 0px;
    border-radius: 10px 10px 0px 0px;
  }
  
  .descDiv {
    padding: 0px 10px;
    margin-bottom: 10px;
  }

  .hotProgramEl {
    text-align: left;
    font-size: 13px;
    margin: 0px 5px 0px 0px;
    padding: 5px;
    border: 0px;
    border-radius: 5px;
    background-color: rgb(255, 241, 172);
    color: black;
  }

  .hotProgramDesc {
    text-align: left;
    font-size: 13px;
    padding: 0px;
    margin: 0px;
  }
`

const SuggestProgramField = styled.div`
  width: 800px;
  margin: 20px auto;
  
  .programDiv {
    width: 800px;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    justify-content: center;
    align-items: center;
  }

  .suggestProgram {
    width: 250px;
    height: 10rem;
    background-color: white;
    border: 0px;
    border-radius: 10px;
    box-shadow: 0px 2px 8px 0px rgb(174, 174, 174);
    margin: 10px;
    padding: 10px;
  }
`

function RecommendProgram() {
  const [hotPrograms, setHotPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHotPrograms = async () => {
      axios.get('http://localhost:5000/programs/popular')
          .then(response => {
              setHotPrograms(response.data);
              console.log(response)
              setIsLoading(false); // 로딩 완료
          })
          .catch(error => {
              console.error('Error fetching users:', error);
          });
      }

  useEffect(() => {
      fetchHotPrograms();
    }, []);

    const randomSuggestPrograms = useMemo(() => {
        if (isLoading) {
          return [{name: '', programDate: '', location: {specificlocation: ''}}];
        }
        
        const randomPrograms = [];
        for (let i = 0; i < 6; i++) {
            const randomValue = hotPrograms[Math.floor(Math.random() * hotPrograms.length)];
            randomPrograms.push(randomValue);
        }
        return randomPrograms;
    }, [isLoading, hotPrograms]);
  
    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
        <div>
          <HotProgramField>
                <h4>인기 프로그램</h4>
                <div className="programDiv">
                {hotPrograms.slice(0, 3).map((el, index) => (
                      <div className="hotProgram" key={el._id}>
                        <div className="hotProgramTitle">{el.name}</div>
                        <div className="descDiv">
                          <span className="hotProgramEl">일시</span>
                          <span className="hotProgramDesc">{el.programDate}</span>
                        </div>
                        <div className="descDiv">
                          <span className="hotProgramEl">장소</span>
                          <span className="hotProgramDesc">{el.location.specificlocation}</span>
                        </div>
                      </div>
                    ))}
                </div>
            </HotProgramField>
            <SuggestProgramField>
                <h4>추천 프로그램</h4>
                <div className="programDiv">
                    {randomSuggestPrograms.map((el, index) => (
                        <div className="suggestProgram" key={el._id}>
                            {el.name}<br/>
                            일시: {el.programDate}<br/>
                            장소: {el.location.specificlocation}
                        </div>
                    ))}
                </div>
            </SuggestProgramField>
        </div>
    )
}

export default RecommendProgram;
