package org.example.shakespt.Topic;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TopicService {
    private final TopicDao tDao;

    @Transactional
    public TopicDto save(TopicDto tDto) {
        Topic topic = tDao.save(TopicDto.toTopic(tDto));
        return TopicDto.toTopicDto(topic);
    }

    public ArrayList<TopicDto> findAll() {
        List<Topic> topicList = tDao.findAll();
        ArrayList<TopicDto> topics = new ArrayList<>();
        for (Topic t : topicList) {
            topics.add(TopicDto.toTopicDto(t));
        }
        return topics;
    }

    public TopicDto findById(Long id) {
        Topic topic = tDao.findById(id).orElse(null);
        return TopicDto.toTopicDto(topic);
    }


}
