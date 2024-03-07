package org.example.shakespt.Topic;

import jakarta.persistence.*;
import lombok.*;
import org.example.shakespt.Story.Story;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Topic {
    @Id
    @SequenceGenerator(sequenceName = "seq_topic",name = "seq_gen",allocationSize = 1)
    @GeneratedValue(generator = "seq_topic",strategy = GenerationType.SEQUENCE)
    private Long id;

    private String tag;     // 태그
    private String status;  // 완성/미완성 여부

    @OneToMany
    private List<Story> stories = new ArrayList<>();    // 스토리 목록
}
