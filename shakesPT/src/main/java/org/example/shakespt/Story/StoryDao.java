package org.example.shakespt.Story;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoryDao extends JpaRepository<Story, Long> {
    // 명시적으로 쿼리를 작성했습니다
    @Query("select s from Story s"
        + " join fetch s.topic t"
        + " where t.topicId = :id")
    List<Story> findByTopicId(@Param("id") Long id);
}
