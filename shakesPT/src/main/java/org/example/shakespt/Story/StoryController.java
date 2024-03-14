package org.example.shakespt.Story;

import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.shakespt.Topic.TopicDto;
import org.example.shakespt.Topic.TopicService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Slf4j
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/story")
public class StoryController {
    private final StoryService sService;
    private final TopicService tService;
    @Value("${spring.servlet.multipart.location}")
    private String path;

    @PostMapping("/add")
    public DataResponseStoryDto addStory(@Nullable Long topicId, DataResponseStoryDto drDto) {
        // topicId가 null인 경우 새로운 토픽을 생성(최초 생성시 topicId가 null이기 때문에)
        if (topicId == null) {
            // 새 토픽 생성 로직, 반환된 토픽 ID를 가져옴
            TopicDto newTopic = tService.save(new TopicDto(null, "", "", null));
            topicId = newTopic.getId(); // 생성된 새 토픽의 ID를 사용
        }

        MultipartFile f = drDto.getF();
        String fname = f.getOriginalFilename();

        File directory = new File(path);    // 이미지 파일 저장 공간 생성
        File newFile = new File(path + fname);  // 이미지 파일로 생성

        if (!directory.exists()) {
            directory.mkdirs();   // 폴더 없다면 생성
        }
        try {
            f.transferTo(newFile);
            drDto.setFname(fname);
        } catch (IOException e) {
            throw new RuntimeException("파일 전송 중 오류 발생", e);
        }

        return sService.saveDataResponseStoryDto(topicId, drDto, path);
    }

    // GPT가 처리한 내용 받아와서 tag, summary 수정하는 Url
    @PutMapping("/get/convertStory")
    public ConvertResponseStoryDto saveConvertResponseStoryDto(@RequestBody ConvertResponseStoryDto crsDto) {
        return sService.saveConvertResponseStoryDto(crsDto);
    }

//    @GetMapping("/list/{id}")
//    public ArrayList<StoryDto> getByTitleNum(@PathVariable("id") Long id) {
//        return sService.findByTopicId(id);
//    }
}
