package org.example.shakespt.Story;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.shakespt.Topic.TopicDto;
import org.example.shakespt.Topic.TopicService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

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

    // 프론트에서 TopicId와 이미지, 프롬프트 데이터 받아오는 url
    @PostMapping("/add")
    public DataResponseStoryDto addStory(Long topicId, DataResponseStoryDto drDto) {
        // 문제가 발생하는 부분
        // 예상 문제(토픽이 생성되기 전까지는 topicId가 없기 떄문에, 제일 처음 토픽을 추가할 때 문제가 생길 것으로 예상)
        tService.save(new TopicDto(topicId, "", "", null));

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
    public ConvertResponseStoryDto saveConvertResponseStoryDto(ConvertResponseStoryDto crsDto) {
        return sService.saveConvertResponseStoryDto(crsDto);
    }

//    @GetMapping("/list/{id}")
//    public ArrayList<StoryDto> getByTitleNum(@PathVariable("id") Long id) {
//        return sService.findByTopicId(id);
//    }
}
