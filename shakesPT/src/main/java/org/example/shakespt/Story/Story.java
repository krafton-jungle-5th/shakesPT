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
    // topic의 PK값과 같은 으로 선언되어 연관관계 매핑 시 오류가 발생해 수정했습니다.
    private Long storyId;

    private String summary; // 전체 줄거리
    private String prompt;  // gpt에게 긔띔하기
    @Column(columnDefinition = "BYTEA")
    private byte[] image;   // 이미지(base64)

    @ManyToOne
    // 명시적으로 연관관계를 선언해주지 않아 연관관계 매핑 테이블이 생성되어 수정했습니다.
    @JoinColumn(name = "topic_id")
    @JsonIgnore
    private Topic topic;
}
