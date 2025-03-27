import React, { useState } from "react";

const ExpenseSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(""); // 하나의 검색어

  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    // 검색어가 변경될 때마다 자동으로 onSearch 호출
    onSearch({
      searchTerm: newSearchTerm,
    });
  };

  return (
    <div className="expense-search">
      <input
        type="text"
        placeholder="검색어"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default ExpenseSearch;
