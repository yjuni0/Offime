import React from "react";
import styled from "styled-components";
import Pagination from "react-paginate";

function CustomPagination({ page, setPage, totalPages }) {
  return (
    <Container>
      <PaginationBox>
        <Pagination
          className="pagination"
          pageCount={totalPages} // ✅ 전체 페이지 수
          pageRangeDisplayed={5} // ✅ 한 번에 보여줄 페이지 수
          marginPagesDisplayed={1} // ✅ 첫 페이지와 마지막 페이지 표시 개수
          onPageChange={(event) => setPage(event.selected + 1)} // ✅ 페이지 변경 시 호출
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          containerClassName="pagination"
          activeClassName="active"
        />
      </PaginationBox>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PaginationBox = styled.div`
  padding: 10px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  height: 50px;
  background-color: #ffffff;
  flex-direction: row;

  .pagination {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }

  .pagination li {
    display: inline-block;
    margin: 0 5px;
    cursor: pointer;
  }

  .active {
    font-weight: bold;
    color: #007bff;
  }
`;

export default CustomPagination;
