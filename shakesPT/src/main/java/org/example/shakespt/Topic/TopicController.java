package org.example.shakespt.Topic;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/topic")
public class TopicController {
    private final TopicService tService;

    @GetMapping("")
    public Map getAll() {
        ArrayList<TopicDto> topics = tService.findAll();
        Map map = new HashMap<>();
        map.put("topics", topics);
        return map;
    }

    @PostMapping("/add")
    public Map addTopic(TopicDto tDto) {
        TopicDto topic = tService.save(tDto);
        System.out.println("topic = " + topic);
        Map map = new HashMap<>();
        map.put("topic", topic);
        return map;
    }

    // 키워드로 검색
//    @GetMapping("/search/{keyword}")
//    public Map searchTopics(@PathVariable("keyword") String keyword){
//
//    }


}
