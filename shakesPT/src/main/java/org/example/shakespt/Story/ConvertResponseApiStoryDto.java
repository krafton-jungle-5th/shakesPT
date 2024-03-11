package org.example.shakespt.Story;

import lombok.Builder;
import lombok.Data;
import org.example.shakespt.Topic.Topic;

@Data
@Builder
// 필요한 데이터를 Fast Api 처리 후 반환 DTO
public class ConvertResponseApiStoryDto {
    private String summary;
    private String tag;

    public static ConvertResponseApiStoryDto toDto(Story story, Topic topic) {
        return ConvertResponseApiStoryDto.builder()
                .summary(story.getSummary())
                .tag(topic.getTag())
                .build();
    }
}
