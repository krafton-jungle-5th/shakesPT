package org.example.shakespt.Story;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
// 필요한 데이터를 Fast Api용 전송 DTO
public class ConvertRequestStoryDto {
    private Long storyId;
    private String prompt;
    private byte[] image;   // 이미지(base64)

    public static ConvertRequestStoryDto toDto(Story story) {
        return ConvertRequestStoryDto.builder()
                .storyId(story.getStoryId())
                .prompt(story.getPrompt())
                .image(null)
                .build();
    }
}
