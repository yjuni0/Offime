package Offime.Offime.entity.expense;

import lombok.Getter;

@Getter
public enum ExpenseStatus {
    PENDING("대기"),
    APPROVED("승인"),
    REJECTED("거절");

    private final String label;

    ExpenseStatus(String label) {
        this.label = label;
    }

}