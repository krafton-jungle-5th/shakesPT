package org.example.shakespt.Topic;

import lombok.RequiredArgsConstructor;
import org.example.shakespt.Story.StoryDto;
import org.example.shakespt.Story.StoryService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/topic")
public class TopicController {
    private final TopicService tService;
    @GetMapping("")
    public Page<ViewResponseTopicDto> getPagingTopic(@RequestParam(value = "page", defaultValue = "1", required = false) int page,
                                                     @RequestParam(value = "status", required = false) String status,
                                                     @RequestParam(value = "keyword", required = false) String keyword) {

        Page<ViewResponseTopicDto> pagingTopic = null;
        if (status.isEmpty() && keyword.isEmpty()) {
            pagingTopic = tService.pagingTopic(page);
        } else if (!status.isEmpty()) {
            pagingTopic = tService.pagingTopicByStatus(page, status);
        } else {
            pagingTopic = tService.pagingTopicByKeyword(page, keyword);
        }
        return pagingTopic;
    }

//    @PostMapping("/add")
//    public TopicDto addTopic(TopicDto tDto) {
//        return tService.save(tDto);
//    }

}
