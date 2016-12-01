package net.devpage.blog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class BlogRestController {
    
    @RequestMapping("/")
	public String index(Model model) {
    	return "index";
	}
	
}
