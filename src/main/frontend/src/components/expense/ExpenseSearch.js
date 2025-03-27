import React, { useState } from "react";

const ExpenseSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 검색어를 부모 컴포넌트로 전달
    onSearch(searchTerm);
  };

  return (
    <div className="expense-search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="검색어"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">검색</button>
      </form>
    </div>
  );
};

export default ExpenseSearch;
