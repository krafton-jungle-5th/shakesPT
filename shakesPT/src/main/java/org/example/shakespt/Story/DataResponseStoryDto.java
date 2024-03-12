package org.example.shakespt.Story;

import lombok.Builder;
import lombok.Data;
import org.example.shakespt.Topic.Topic;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
// 프론트에서 스프링으로 전송 DTO
public class DataResponseStoryDto {

    private String fname;
    private String prompt;
    private MultipartFile f;

    public static DataResponseStoryDto toDto(Story story) {
        return DataResponseStoryDto.builder()
                .fname(story.getFname())
                .prompt(story.getPrompt())
                .f(null)
                .build();
    }

    public static Story toEntity(Long topicId,DataResponseStoryDto drDto){
        return Story.builder()
                .topic(new Topic(topicId,"","",null))
                .fname(drDto.getFname())
                .prompt(drDto.getPrompt())
                .build();
    }

}
