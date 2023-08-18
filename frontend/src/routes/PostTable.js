// PostTable.js
import React from 'react';
import { useHistory } from 'react-router-dom';

function PostTable({boardData}) {
  const history = useHistory();
  const handleTitleClick = (data) => {
    // 클릭한 제목의 데이터와 함께 postInfo 페이지로 이동
    history.push('/postInfo', { state: { data } });
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 border-b-2 border-gray-400" style={{ width: '15%' }}>
                번호
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 border-b-2 border-gray-400" style={{ width: '15%' }}>
                지역
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 border-b-2 border-gray-400" style={{ width: '55%' }}>
                제목
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 border-b-2 border-gray-400" style={{ width: '15%' }}>
                신청현황
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {boardData.map((data, index) => (
              <tr key={data.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index+1}</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{data.location}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 cursor-pointer" onClick={() => handleTitleClick(data)}> {data.title}</td>
                <td className="whitespace-nowrap px-4 py-2 text-green-600 font-semibold">심사중</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PostTable;

