package org.example.shakespt.Topic;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    // 기본 페이지 정렬
    public Page<ViewResponseTopicDto> pagingTopic(int page) {
        Pageable pageable = PageRequest.of(page, 10, Sort.by(Sort.Direction.ASC, "topicId"));
        Page<Topic> topicPage = tDao.findAll(pageable);
        return topicPage.map(ViewResponseTopicDto::toDto);   //메서드 레퍼런스
    }

    // 완성 상태에 따른 토픽 정렬
    public Page<ViewResponseTopicDto> pagingTopicByStatus(int page, String status) {
        Pageable pageable = PageRequest.of(page, 10, Sort.by(Sort.Direction.ASC, "topicId"));
        Page<Topic> topicPage = tDao.findByStatus(pageable, status);
        return topicPage.map(ViewResponseTopicDto::toDto);
    }

    // 태그(키워드)로 검색
    public Page<ViewResponseTopicDto> pagingTopicByTag(int page, String tag) {
        Pageable pageable = PageRequest.of(page, 10, Sort.by(Sort.Direction.ASC, "topicId"));
        Page<Topic> topicPage = tDao.findByTagContains(pageable, tag);
        return topicPage.map(ViewResponseTopicDto::toDto);
    }

}
