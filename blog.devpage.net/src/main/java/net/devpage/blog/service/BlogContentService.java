package net.devpage.blog.service;

import java.util.Date;
import java.util.List;

import net.devpage.blog.dao.BlogContentRepository;
import net.devpage.blog.entity.BlogContent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Service
public class BlogContentService {
    
    @Autowired
    private MongoOperations mongo;
    
    @Autowired
    private BlogContentRepository repository;
    
    @Autowired
    private CounterService counterService;
    
    @Autowired
    private BlogContentService blogContentService;
    
    public List<BlogContent> findLastWDate(){
        Query query = new Query();
        query.limit(1);
        query.with(new Sort(Sort.Direction.DESC, "wDate"));
        return mongo.find(query, BlogContent.class);
    }
    
    public BlogContent insertContent(BlogContent blogContent){
        blogContent.setSeq(counterService.getNextSequence("blogContents"));
        blogContent.setWDate(new Date());
        BlogContent rtnContent = repository.save(blogContent);
	    return rtnContent;       
    }
    
    public List<BlogContent> archive(String archiveName){
        Query query = new Query();
        query.addCriteria(Criteria.where("archive").is(archiveName));
        query.with(new Sort(Sort.Direction.DESC, "wDate"));
        return mongo.find(query, BlogContent.class);
        //return repository.findByArchive(archiveName);
    }
}
