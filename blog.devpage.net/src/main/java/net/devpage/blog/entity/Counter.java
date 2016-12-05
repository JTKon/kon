package net.devpage.blog.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "counters")
public class Counter {
    @Id 
    private String id;
    private int seq;
    
    public void setSeq(int seq){
        this.seq = seq;
    }
    public int getSeq(){
        return this.seq;
    }
}
