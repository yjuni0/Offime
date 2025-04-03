package Offime.Offime.entity.member;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class MemberProfileFiles {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String originFileName;

    private String filePath;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID", nullable = false)
    private Member member;
}
