package org.example.shakespt.Story;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.example.shakespt.Topic.Topic;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Story {
    @Id
    @SequenceGenerator(sequenceName = "seq_story", name = "seq_gen", allocationSize = 1)
    @GeneratedValue(generator = "seq_story", strategy = GenerationType.SEQUENCE)
    private Long id;

    private String summary; // 전체 줄거리
    private String prompt;  // gpt에게 긔띔하기
    @Column(columnDefinition = "BYTEA")
    private byte[] image;   // 이미지(base64)

    @ManyToOne
    @JsonIgnore
    private Topic topic;
}
