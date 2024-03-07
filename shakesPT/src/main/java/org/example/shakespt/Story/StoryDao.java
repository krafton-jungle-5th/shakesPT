package org.example.shakespt.Story;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoryDao extends JpaRepository<Story, Long> {
    List<Story> findByTopicId(Long id);
}
