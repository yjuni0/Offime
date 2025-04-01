package Offime.Offime.entity.reports;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class ResponseFiles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @ManyToOne
    @JoinColumn(name = "RESPONSE_ID", nullable = false)
    private Responses response;

    @Column(columnDefinition = "TEXT", name = "FILE_URL", nullable = false)
    private String fileUrl;
}
