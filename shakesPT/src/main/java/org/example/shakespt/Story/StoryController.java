package org.example.shakespt.Story;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.shakespt.Topic.Topic;
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
    @Value("${spring.servlet.multipart.location}")
    private String path;

    // 스토리 저장
    @PostMapping("/add")
    public StoryDto addStory(Long topicId, StoryDto sDto) {
        sDto.setTopic(new Topic(topicId, "", "", null));

//        sService.statusCheck(topicId);

        MultipartFile f = sDto.getF();
        String fname = f.getOriginalFilename();

        File directory = new File(path);    // 이미지 파일 저장 공간 생성
        File newFile = new File(path + fname);  // 이미지 파일로 생성

        if (!directory.exists()) {
            directory.mkdirs();    // 폴더 없다면 생성
        }
        try {
            f.transferTo(newFile);
            sDto.setFname(fname);
        } catch (IOException e) {
            throw new RuntimeException("파일 전송 중 오류 발생", e);
        }
        return sService.save(sDto);
    }

    @GetMapping("/list/{id}")
    public ArrayList<StoryDto> getByTitleNum(@PathVariable("id") Long id) {
        return sService.findByTopicId(id);
    }
}
