import { useState } from 'react';
import styled from 'styled-components';

// Styled-Component 라이브러리를 활용해 TabMenu 와 Desc 컴포넌트의 CSS를 구현.

const TabMenu = styled.ul`
  background-color: #ffffff;
  color: rgb(232, 234, 237);
  width: 800px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin: auto;
  padding: 15px 0px 0px 0px;

  .submenu {
    display: flex;
    width: 3rem;
    margin: 0px -1px 0px -1px;
    padding: 5px;
    font-size: 12px;
    justify-content: center;
    transition: 0.3s;
    border: 1.5px solid black;
    border-radius: 10px 10px 0px 0px;
    background-color: white;
    color: black;
  }

  .focused {
    border: 1.5px solid black;
    border-bottom: 1.5px solid rgb(255, 241, 172);
    border-radius: 10px 10px 0px 0px;
    background-color: rgb(255, 241, 172);
    color: rgb(0,0,0);
  }

  & div.desc {
    text-align: center;
  }
`;

const Desc = styled.div`
  width: 49rem;
  height: 200px;
  overflow-y: auto;
  margin: auto;
  justify-content: center;
  border: 1.5px solid black;
  border-top: none;
  background-color: rgb(255, 241, 172);
  padding: 0px;

  ul {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .subregion {
    display: flex;
    width: 22rem;
    padding: 5px;
    margin: 5px;
    font-size: 12px;
    justify-content: center;
    transition: 0.3s;
    border: 1.5px solid black;
    border-radius: 5px;
    background-color: white;
    color: black;
  }
  
  .focused {
    background-color: rgb(255, 223, 65);
    color: rgb(0,0,0);
  }
`;

function RegionTab() {
  const [currentTab, clickTab] = useState(0);
  const [currentRegion, clickRegion] = useState(0);

  const regionArr = [
    { name: '서울', content: ["전체","강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"] },
    { name: '부산', content: ["전체","강서구","금정구","기장군", "남구","동구","부산진구","북구","사상구","사하구","서구","수영구","연제구","영도구","중구","해운대구"] },
    { name: '대구', content: ["전체","남구","달서구","달성군", "동구","북구","서구","수성구","중구"] },
    { name: '인천', content: ["전체","강화군", "계양구","남구", "남동구", "동구","부평구","서구","연수구", "웅진군", "중구"]},
    { name: '광주', content: ["전체","광산구", "남구", "동구", "북구", "서구"]},
    { name: '대전', content: ["전체","대덕구","동구","서구","유성구","중구"] },
    { name: '울산', content: ["전체","동구","북구","울주군"] },
    { name: '세종', content: ["전체"]},
    { name: '경기', content: ["전체","가평군", "고양시","과천시","광명시", "광주군", "광주시","구리시","군포시","김포시","남양주시","동두천시","부천시","성남시","수원시","시흥시","안산시","안성시","안양시", "양주군", "양주시", "양평군", "여주군", "연천군", "오산시","용인시","의왕시","의정부시","이천시","파주시","평택시","포천군", "포천시","하남시","화성군", "화성시"] },
    { name: '강원', content: ["전체","강릉시","고성군", "동해시","삼척시","속초시","양구군","양양군","영월군", "원주시","인제군","정선군","철원군", "춘천시","태백시","평창군","홍천군","화천군","횡성군"] },
    { name: '충북', content: ["전체","괴산군","단양군","보은군","영동군","옥천군","음성군", "제천시","증평군","진천군","청주시","충주시"] },
    { name: '충남', content: ["전체","계룡시","공주시","논산시","당진시", "보령시","서산시","아산시", "예산군", "천안시", "태안군", "홍성군"] },
    { name: '전북', content: ["전체","고창군", "군산시","김제시","남원시","무주군","부안군","순창군","완주군","익산시","임실군","장수군","전주시","정읍시","진안군"] },
    { name: '전남', content: ["전체","강진군","고흥군","곡성군","광양시","구례군","나주시","담양군","목포시","무안군","보성군","순천시","신안군","여수시","영광군","영암군","완도군","장성군","장흥군","진도군","함평군","해남군","화순군"] },
    { name: '경북', content: ["전체","경산시","경주시","고령군","구미시","권위군","김천시","문경시","봉화군","상주시","성주군","안동시","영덕군","영양군","영주시","영천시","예천군","울릉군","울진군","의성군","청도군","청송군","칠곡군","포항시"] },
    { name: '경남', content: ["전체","거제시","거창군","김해시","마산시","밀양시","사천시","산청군","양산시","의령군","진주시","진해시","창원시","통영시","하동군","함안군","함양군","합천군"] },
    { name: '제주', content: ["전체","서귀포시","제주시"] },
  ];

  const selectMenuHandler = (index) => {
    clickTab(index);
  };

  const selectRegionHandler = (index) => {
    clickRegion(index);
  };

  return (
    <>
      <div>
        <TabMenu>
          {/* <li className="submenu">{menuArr[0].name}</li>
          <li className="submenu">{menuArr[1].name}</li>
          <li className="submenu">{menuArr[2].name}</li> */}
          {regionArr.map((el, index) => (
              <li className = {index === currentTab ? "submenu focused" : "submenu" }
              onClick={() => selectMenuHandler(index)}>{el.name}</li>
            ))}
        </TabMenu>
        <Desc>
          <ul>
          {regionArr[currentTab].content.map((el, index) => (
              <li className = {index === currentRegion ? "subregion focused" : "subregion" }
              onClick={() => selectRegionHandler(index)}>{el}</li>
            ))}
          </ul>
        </Desc>
      </div>
    </>
  );
};

export default RegionTab;