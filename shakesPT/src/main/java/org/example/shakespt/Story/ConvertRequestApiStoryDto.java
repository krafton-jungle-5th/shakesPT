package org.example.shakespt.Story;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
// 필요한 데이터를 Fast Api용 전송 DTO
public class ConvertRequestApiStoryDto {

    private String prompt;
    private byte[] image;   // 이미지(base64)

    public static ConvertRequestApiStoryDto toDto(Story story) {
        return ConvertRequestApiStoryDto.builder()
                .prompt(story.getPrompt())
                .image(null)
                .build();
    }
}
