package org.example.shakespt.Story;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
// 파이썬에서 처리하는데 필요한 데이터를 스프링으로 전송 DTO
public class DataRequestStoryDto {

    private String fname;
    private String prompt;
    private MultipartFile f;

    public static DataRequestStoryDto toDto(Story story) {
        return DataRequestStoryDto.builder()
                .fname(story.getFname())
                .prompt(story.getPrompt())
                .f(null)
                .build();
    }

}
