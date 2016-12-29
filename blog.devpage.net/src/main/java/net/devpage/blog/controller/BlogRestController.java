package net.devpage.blog.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import net.devpage.blog.entity.BlogContent;
import net.devpage.blog.service.BlogContentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class BlogRestController {
    
    @Autowired
    private BlogContentService blogContentService;
    
    @RequestMapping("/")
	public @ResponseBody String index(HttpServletResponse response) {
	
	   InputStreamReader reader = null;
	   BufferedReader buff = null;
	   String pageContents = "";
	   StringBuilder contents = new StringBuilder();
	   
	   try{
    	   String urlPath = "http://localhost:7050/blog.devpage.net/html/index.html";            
           URL url = new URL(urlPath);
           URLConnection con = (URLConnection)url.openConnection();
           reader = new InputStreamReader (con.getInputStream(), "utf-8");
           buff = new BufferedReader(reader);
            
           while((pageContents = buff.readLine())!=null){
                contents.append(pageContents);
                contents.append("\r\n");
           }
           
	   }catch(Exception e){
	       e.printStackTrace();
	   }finally{
	       if(buff!=null){try{buff.close();}catch(Exception e){e.printStackTrace();}}
	       if(reader!=null){try{reader.close();}catch(Exception e){e.printStackTrace();}}
	   }
	   
	   response.setContentType("text/plain");
       response.setCharacterEncoding("UTF-8");
	   return contents.toString();
	    
	   //return "index";
	}
	
	@RequestMapping(value="/content/findLastWDate", method=RequestMethod.GET)
	public @ResponseBody List<BlogContent> findLastWDate() {
        return blogContentService.findLastWDate();
	}
	
	@RequestMapping(value="/content/", method=RequestMethod.POST)
	public @ResponseBody BlogContent insertContent(@RequestBody(required=false) BlogContent blogContent) {
	    return blogContentService.insertContent(blogContent);
	}
	
	@RequestMapping(value="/archive/{archiveName}", method=RequestMethod.GET)
	public @ResponseBody List<BlogContent> archive(@PathVariable("archiveName") String archiveName) {
	    return blogContentService.archive(archiveName);
	}
	
	/*
	
	@RequestMapping("/content/test/deleteAll")
	public void deleteAll() {
	    repository.deleteAll();
	}
	
	@RequestMapping("/content/test/findAll")
	public @ResponseBody List<BlogContent> findAll() {
        return repository.findAll();
	}
	
	@RequestMapping("/content/test/findById")
	public @ResponseBody BlogContent findById() {
        return repository.findById("584521cda19cee12a0ddbaa8");
	}
	
	
	@RequestMapping("/content/test/findByWDate")
	public @ResponseBody BlogContent findByWDate() {
	    //https://www.mkyong.com/mongodb/spring-data-mongodb-get-last-modified-records-date-sorting/ <- 걍 이거쓰자
	    //return repository.findByWDate(new Sort(Sort.Direction.DESC, "wDate"));
	}
	
	
	@RequestMapping("/content/test/findByArchive")
	public @ResponseBody List<BlogContent> findByArchive() {
        return repository.findByArchive("잡담");
	}
	
	@RequestMapping("/content/test/save")
	public void save(Model model) {
	    
	    //int seq, Date wDate, String wId, String title, String content, String archive
        BlogContent content1 = new BlogContent(
            counterService.getNextSequence("blogContents"),
            new Date(),
            "kon1",
            "this is test title1",
            "this is test contents1<br>ha ha ha!1",
            "잡담"
        );
        
        repository.save(content1);
        
        
        BlogContent content2 = new BlogContent(
            counterService.getNextSequence("blogContents"),
            new Date(),
            "kon2",
            "this is test title2",
            "this is test contents2<br>ha ha ha!2",
            "잡담"
        );
        
        repository.save(content2);
        
	}
	*/

}
