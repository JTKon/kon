package net.devpage.blog.entity;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "blogContents")
public class BlogContent {
    @Id
    public String id;
    public Date wDate;
    public String wId;
    public String content;
    public String archive;
    public int seq;
    public String title;
    
    public BlogContent(){}
    
    public BlogContent(int seq, Date wDate, String wId, String title, String content, String archive){
        this.seq = seq;
        this.wDate = wDate;
        this.wId = wId;
        this.content = content;
        this.archive = archive;
        this.title = title;
    }
    
    @Override
    public String toString() {
        return String.format(
                "BlogContent[id=%s, seq='%s' title='%s', wDate='%s', wId='%s', archive='%s', content='%s']",
                id, seq, title, wDate, wId, archive, content);
    }
    
}
