import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import {FadeLoader} from "react-spinners";

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
width: 850px;
margin: 20px auto;

.programDiv {
  width: 850px;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  justify-content: center;
  align-items: center;
}

.suggestProgram {
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

.suggestProgramTitle {
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

.suggestProgramEl {
  text-align: left;
  font-size: 13px;
  margin: 0px 5px 0px 0px;
  padding: 5px;
  border: 0px;
  border-radius: 5px;
  background-color: rgb(255, 241, 172);
  color: black;
}

.suggestProgramDesc {
  text-align: left;
  font-size: 13px;
  padding: 0px;
  margin: 0px;
}

.SuggestTitle {
  margin-left: 20px;
}

`

const Loading = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
padding: 50px;
`

function RecommendProgram() {
  const [hotPrograms, setHotPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchHotPrograms = async () => {
    axios.get('http://15.164.225.225/programs/popular')
      .then(response => {
        setHotPrograms(response.data);
        console.log(response)
        setIsLoading(false); // 로딩 완료
      })
      .catch(error => {
        console.error('Error fetching Programs:', error);
      });
  }

  useEffect(() => {
    fetchHotPrograms();
  }, []);

  const randomSuggestPrograms = useMemo(() => {
    if (isLoading) {
      return [{ name: '', programDate: '', location: { specificlocation: '' } }];
    }

    const randomPrograms = [];
    for (let i = 0; i < 6; i++) {
      const randomValue = hotPrograms[Math.floor(Math.random() * hotPrograms.length)];
      randomPrograms.push(randomValue);
    }
    return randomPrograms;
  }, [isLoading, hotPrograms]);

  if (isLoading) {
    return <Loading><FadeLoader /></Loading>;
  }

  return (
    <div>
      <HotProgramField>
        <h4>인기 프로그램</h4>
        <div className="programDiv">
          {hotPrograms.slice(0, 3).map((el, index) => (
            <div>
               <Link to={`/apply/${el._id}`}>
                <div className="hotProgram" key={el._id}>
              <div className="hotProgramTitle">{el.name.length > 30 ? `${el.name.slice(0, 30)}...` : el.name}</div>
              <div className="descDiv">
                <span className="hotProgramEl">일시</span>
                <span className="hotProgramDesc">{el.programDate}</span>
              </div>
              <div className="descDiv">
                <span className="hotProgramEl">장소</span>
                <span className="hotProgramDesc">{el.location.specificlocation.length > 35 ? `${el.location.specificlocation.slice(0, 35)}...` : el.location.specificlocation}</span>
              </div>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </HotProgramField>
      <SuggestProgramField>
      <div className="SuggestTitle">
      <h4>추천 프로그램</h4>
      </div>
        <div className="programDiv">
        <button
          onClick={() => setCurrentIndex(currentIndex === 0 ? 3 : currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          <FontAwesomeIcon icon={faChevronLeft} size="lg" style={currentIndex === 0 ? {color: "#ffffff",} : {color: "#000000",}} />
        </button>
          {randomSuggestPrograms.slice(currentIndex, currentIndex + 3).map((el, index) => (
            <div>
            <Link to={`/apply/${el._id}`}>
              <div className="suggestProgram" key={el._id}>
            <div className="suggestProgramTitle">{el.name.length > 30 ? `${el.name.slice(0, 30)}...` : el.name}</div>
            <div className="descDiv">
              <span className="suggestProgramEl">일시</span>
              <span className="suggestProgramDesc">{el.programDate}</span>
            </div>
            <div className="descDiv">
              <span className="suggestProgramEl">장소</span>
              <span className="suggestProgramDesc">{el.location.specificlocation.length > 35 ? `${el.location.specificlocation.slice(0, 35)}...` : el.location.specificlocation}</span>
            </div>
            </div>
            </Link>
          </div>
          ))}
          <button
          onClick={() => setCurrentIndex(currentIndex === 3 ? 0 : currentIndex + 1)}
          disabled={currentIndex === 3}
        >
          <FontAwesomeIcon icon={faChevronRight} size="lg" style={currentIndex === 3 ? {color: "#ffffff",} : {color: "#000000",}} />
        </button>
        </div>
      </SuggestProgramField>
      <div>
        
        
      </div>
    </div>
  )
}

export default RecommendProgram;
