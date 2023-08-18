import { useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./postInfo.module.css";
import { Link } from 'react-router-dom';


function PostInfo() {
  const history = useHistory();
  const location = useLocation();
  const data = location.state.state.data; 
  console.log(data);

  const [post, setPost] = useState(null);

  useEffect(() => {
    const Post = {
      title: data.title,
      content: data.content
    };
    setPost(Post);
  }, [data]); 

  const goBack = () => {
    history.push("/community");
  };

  return (
    <>
      <div className={styles.menuBar}>
                <Link to= {'/'}><h2 className={styles.title}>만학도서관</h2></Link>
                <Link to='/community'> <button className={styles.communityButton}>커뮤니티</button></Link>
            </div>
            <h2 className={styles["com-name"]}>프로그램 신청 게시판</h2>
      <div className={styles["post-page"]}>
        <div className={styles.box}>
          <div className={styles["user-container"]}>
            <FontAwesomeIcon icon={faUser} />
            <h2 className={styles.user}>익명</h2>
            <button className={styles["review-btn"]}>심사 중</button>
          </div>
        
          <div className={styles["post-container"]}>
            <h2 className={styles["post-title"]}>{post?.title}</h2>
            <p className={styles["post-content"]}>{post?.content}</p>
            <button
              onClick={goBack}
              className={styles["goBack_btn"]}>
              뒤로 가기
            </button>
          </div>
        </div>
      </div>
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
    </>
  );
}

export default PostInfo;

