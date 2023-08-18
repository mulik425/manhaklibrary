import {useState} from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import styles from "./post.module.css";
import { Link } from 'react-router-dom';

function Post() {
  const history = useHistory();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // 팝업 표시 여부 상태 추가

    const goToSpecificPage = () => {
      history.push('/');
    };
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [location, setLocation] = useState("");

    const goBack = () => {
      // 이전 화면으로 돌아가는 동작을 구현
      history.push("/community");
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const apiEndpoint = process.env.NODE_ENV === 'production'
        ? '/api/posts/board/register'
        : 'http://localhost:4000/api/posts/board/register';
    
      try {
        const postData = {
          "title": title,
          "content": content,
          "location": location
        };
    
        // API 호출하여 데이터 저장
        const response = await axios.post(apiEndpoint, postData);
    
        if (response.data.success) {
          setShowSuccessPopup(true);
        } else {
          console.log("데이터 저장 실패");
        }
      } catch (error) {
        console.error("API 호출 실패:", error);
      }
    
      // 입력 필드 초기화
      setTitle("");
      setContent("");
      setLocation("");
    };
  


  
    return (
      <>
      <div className={styles.menuBar}>
                <Link to= {'/'}><h2 className={styles.title}>만학도서관</h2></Link>
                <Link to='/community'><button className={styles.communityButton}>커뮤니티</button></Link>
            </div>
      <h2 className={styles["com-name"]}>
        프로그램 신청 게시판
      </h2>
      <div className={styles["post-form"]}>
        <h2 className={styles["form-title"]}>새 게시물 작성</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="제목을 입력하세요."
              className={styles.inputField}
            ></input>
          </div>
          <div className={styles["form-group"]}>
            <select
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className={styles.inputField}
              >
                <option value="전체">사는 지역을 선택하세요.</option>
                <option value="서울">서울</option>
                <option value="부산">부산</option>
                <option value="대구">대구</option>
                <option value="인천">인천</option>
                <option value="세종">세종</option>
                <option value="경기">경기</option>
                <option value="강원">강원</option>
                <option value="충북">충북</option>
                <option value="충남">충남</option>
                <option value="광주">광주</option>
                <option value="대전">대전</option>
                <option value="울산">울산</option>
                <option value="전북">전북</option>
                <option value="전남">전남</option>
                <option value="경북">경북</option>
                <option value="경남">경남</option>
                <option value="제주">제주</option>

              </select>
          </div>
          <div className={styles["form-group"]}>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="내용을 입력하세요."
              className={styles.textField}
            ></textarea>
          </div>
          <button className={styles.submit} type="submit">게시하기</button>
          <button className={styles.goBack} onClick={goBack} type="button">뒤로가기</button>
        </form>
      </div>
      {showSuccessPopup && (
         <div
         className={styles["success_container"]}
         style={{
           position: 'fixed',
           top: '50%',
           left: '50%',
           transform: 'translate(-50%, -50%)',
           width: '50%',
         }}
       >
          <h2 className={styles["success_content"]}>등록되었습니다.</h2>
          <div className={styles["button_container"]}>
            <button
              type="button"
              className={styles["success_btn"]}
              onClick={goBack}
            >완료</button>
          </div>
        </div>
      )}
      <footer className={styles["footer"]}>
      <div className={styles["inner"]}>
        <h2>Get In Touch</h2>
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
    </>
    );
  }
  


export default Post;