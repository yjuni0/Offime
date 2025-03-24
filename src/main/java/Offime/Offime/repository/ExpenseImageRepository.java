package Offime.Offime.repository;

import Offime.Offime.entity.ExpenseImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional; // 이 import 문구가 있는지 확인하세요.

import java.util.List;

public interface ExpenseImageRepository extends JpaRepository<ExpenseImage, Long> {
    // 기존의 다른 메서드들

    // 커스텀 메서드 추가: expenseId로 ExpenseImage 삭제
    @Transactional // 이 어노테이션을 추가합니다.
    void deleteByExpenseId(Long expenseId);

    // expenseId로 ExpenseImage 목록 조회
    List<ExpenseImage> findByExpenseId(Long expenseId);
}