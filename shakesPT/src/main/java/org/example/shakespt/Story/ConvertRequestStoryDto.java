package org.example.shakespt.Story;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
// 필요한 데이터를 Fast Api용 전송 DTO
public class ConvertRequestStoryDto {
    private Long storyId;
    private Long topicId;
    private String prompt;
    private String image;   // 이미지(base64)
    private String summary;

    public static ConvertRequestStoryDto toDto(Story story, Long topicId) {
        return ConvertRequestStoryDto.builder()
                .storyId(story.getStoryId())
                .topicId(topicId)
                .prompt(story.getPrompt())
                .image(null)
                .summary(" ")
                .build();
    }
}
