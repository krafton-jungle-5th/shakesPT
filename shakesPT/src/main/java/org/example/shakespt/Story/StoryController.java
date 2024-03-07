package org.example.shakespt.Story;

import lombok.RequiredArgsConstructor;
import org.example.shakespt.Topic.Topic;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/story")
public class StoryController {
    private final StoryService sService;
    @Value("${spring.servlet.multipart.location}")
    private String path;

    // 스토리 저장
    @PostMapping("/add/{id}")
    public Map addStory(@PathVariable("id") Long id, StoryDto sDto, MultipartFile imageFile) {
        sDto.setTopic(new Topic(id, "", "", null));
        MultipartFile f = imageFile;
        String fname = f.getOriginalFilename();
        try {
            sDto.setImage(sService.imageToBase64(path, fname, f));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        StoryDto story = sService.save(sDto);
        Map map = new HashMap<>();
        map.put("story", story);
        return map;
    }

    @GetMapping("/list/{id}")
    public Map getByTitleNum(@PathVariable("id") Long id) {
        ArrayList<StoryDto> stories = sService.findByTopicId(id);
        Map map = new HashMap<>();
        map.put("stories", stories);
        return map;
    }
}
