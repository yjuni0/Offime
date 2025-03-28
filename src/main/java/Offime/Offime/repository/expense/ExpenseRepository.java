package Offime.Offime.repository.expense;

import Offime.Offime.entity.expense.Expense;
import Offime.Offime.entity.expense.ExpenseStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUsername(String username);
    List<Expense> findByStatus(ExpenseStatus status);

    // 검색 기능을 위한 쿼리 메서드 (특정 상태의 경비만 검색)
    @Query("SELECT e FROM Expense e WHERE " +
            "(:searchTerm IS NULL OR " +
            "e.title LIKE %:searchTerm% OR " +
            "e.username LIKE %:searchTerm% OR " +
            "e.category LIKE %:searchTerm% OR " +
            "e.content LIKE %:searchTerm% OR " +
            "CAST(e.amount AS string) LIKE %:searchTerm%) AND " +
            "e.status = :status") // status가 null인 경우 검색하지 않음
    List<Expense> searchExpenses(@Param("searchTerm") String searchTerm, @Param("status") ExpenseStatus status);
}