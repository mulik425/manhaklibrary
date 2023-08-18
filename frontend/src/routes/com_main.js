import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostTable from './PostTable'; // PostTable 컴포넌트 경로에 맞게 수정
import styles from "./com_main.module.css";
import { Link } from 'react-router-dom';

function Community() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [boardData, setBoardData] = useState([]); // 데이터를 useState로 저장

  // 백엔드 API 엔드포인트
  const apiEndpoint = process.env.NODE_ENV === 'production'
  ? '/api/posts/boards'
  : 'http://15.164.225.225/api/posts/boards';

useEffect(() => {
  // 백엔드 API 호출
  axios.get(apiEndpoint)
    .then(response => {
      const boards = response.data;

      // 가져온 데이터를 역순으로 정렬하여 state에 저장
      const sortedBoards = boards.reverse();
      setBoardData(sortedBoards);

      // 데이터가 state에 저장되었습니다.
      console.log('Data has been saved to boardData state:', sortedBoards);
    })
    .catch(error => {
      console.error('Error fetching data from API:', error);
    });
}, [apiEndpoint]); // 의존성 배열에 apiEndpoint 추가


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = boardData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <>
    <div className={styles.menuBar}>
      <Link to='/'>
        <h2 className={styles.title}>만학도서관</h2>
      </Link>
      <Link to='/community'>
        <button className={styles.communityButton}>커뮤니티</button>
        </Link>
    </div>
    <h2 className={styles["com-name"]}>프로그램 신청 게시판</h2>
    <p className={styles["moreInfo"]}>*보고자 하는 포스트 제목을 클릭하면 상세 내용 확인 가능</p>
    <div className={styles["main-page"]}>
      <PostTable boardData={currentPosts} />
      <div className={styles.pagination}>
        {boardData.length <= postsPerPage ? (
          <button>1</button>
        ) : (
          Array.from({ length: Math.ceil(boardData.length / postsPerPage) }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))
        )}
        <a className={styles["post-button"]} href="/post">신청하기</a>
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

export default Community;

