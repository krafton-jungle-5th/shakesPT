package org.example.shakespt.Topic;

import lombok.*;
import org.example.shakespt.Story.Story;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class TopicDto {
    private Long id;
    private String tag;     // 태그
    private String status;  // 완성/미완성 여부
    private List<Story> stories = new ArrayList<>();    // 스토리 목록


    // TopicDto -> Topic
    public static Topic toTopic(TopicDto dto) {
        return Topic.builder()
                .id(dto.getId())
                .tag(dto.getTag())
                .status(dto.getStatus())
                .stories(dto.getStories())
                .build();
    }

    // Topic -> TopicDto
    public static TopicDto toTopicDto(Topic topic) {
        return TopicDto.builder()
                .id(topic.getId())
                .tag(topic.getTag())
                .status(topic.getStatus())
                .stories(topic.getStories())
                .build();
    }


}
