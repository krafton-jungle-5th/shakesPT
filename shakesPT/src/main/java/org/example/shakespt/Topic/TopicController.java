package org.example.shakespt.Topic;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/topic")
public class TopicController {
    private final TopicService tService;

    @GetMapping("")
    public Page<ViewResponseTopicDto> getPagingTopic(@RequestParam(value = "page", defaultValue = "1") int page,
                                 @RequestParam(value = "status", required = false) String status,
                                 @RequestParam(value = "tag", required = false) String tag) {

        Page<ViewResponseTopicDto> pagingTopic = null;
        if (status.isEmpty() && tag.isEmpty()) {
            pagingTopic = tService.pagingTopic(page);
        } else if (!status.isEmpty()) {
            pagingTopic = tService.pagingTopicByStatus(page, status);
        } else {
            pagingTopic = tService.pagingTopicByTag(page, tag);
        }
        return pagingTopic;
    }

    @PostMapping("/add")
    public TopicDto addTopic(TopicDto tDto) {
        return tService.save(tDto);
    }

}
