import { useState } from "react";

const YearBox = () => {
  const currentYear = new Date().getFullYear(); // 현재 연도 가져오기
  const [year, setYear] = useState(currentYear); // 상태 관리

  return (
    <div
      className="mt_md mb_md"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "30px",
        justifyContent: "center",
      }}
    >
      {/* 이전 연도 버튼 */}
      <button
        style={{ fontSize: "20px" }}
        onClick={() => setYear((prev) => prev - 1)}
      >
        {"<"}
      </button>

      {/* 현재 연도 표시 */}
      <h4>{year}</h4>

      {/* 다음 연도 버튼 */}
      <button
        style={{ fontSize: "20px" }}
        onClick={() => setYear((prev) => prev + 1)}
      >
        {">"}
      </button>
    </div>
  );
};

export default YearBox;
