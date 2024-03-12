package org.example.shakespt.Story;

import lombok.Builder;
import lombok.Data;
import org.example.shakespt.Topic.Topic;

@Data
@Builder
// 필요한 데이터를 Fast Api 처리 후 반환 DTO
public class ConvertResponseStoryDto {
    private Long StoryId;
    private Long TopicId;
    private String summary;
    private String tag;

    public static Story toStoryEntity(ConvertResponseStoryDto crsDto) {
        return Story.builder()
                .summary(crsDto.getSummary())
                .build();
    }

    public static Topic toTopicEntity(ConvertResponseStoryDto crsDto) {
        return Topic.builder()
                .tag(crsDto.getTag())
                .build();
    }
}
