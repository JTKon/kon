package net.devpage.blog.presentation.controller;

import java.util.List;

import net.devpage.blog.domain.model.entity.Hello;
import net.devpage.blog.infrastructure.dao.HelloDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloRestController {
    
    // this is test 
    
    @Autowired
    private HelloDao helloDao;
    
    @RequestMapping("/add")
    public Hello add(Hello hello){
        Hello helloData = helloDao.save(hello);
        return helloData;
    }
    
    @RequestMapping("/list")
    public List<Hello> list(Model model){
        List<Hello> helloList = helloDao.findAll();
        return helloList;
    }
    
	@RequestMapping("/")
	public String index() {
		return "helloworld!";
	}
}
