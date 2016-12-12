package net.devpage.blog.dao;

import java.util.List;

import net.devpage.blog.entity.BlogContent;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BlogContentRepository extends MongoRepository<BlogContent, String> {

    public BlogContent findById(String id);
    public List<BlogContent> findByArchive(String archive);
    public BlogContent findByWDate(Sort sort);
}