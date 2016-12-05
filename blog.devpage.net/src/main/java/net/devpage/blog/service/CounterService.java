package net.devpage.blog.service;

import net.devpage.blog.entity.Counter;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;

import static org.springframework.data.mongodb.core.query.Query.*;
import static org.springframework.data.mongodb.core.query.Criteria.*;
import static org.springframework.data.mongodb.core.FindAndModifyOptions.*;

@Service
public class CounterService {
    @Autowired
    private MongoOperations mongo;
    
    public int getNextSequence(String collectionName) {
        /* mongodb에 미리 생성해 둘 것!
           db.counters.insert({_id: "blogContents",seq: 0});
        */
        Counter counter = mongo.findAndModify(
            query(where("_id").is(collectionName)), 
            new Update().inc("seq", 1),
            options().returnNew(true),
            Counter.class
        );
        
        return counter.getSeq();
    }
}
