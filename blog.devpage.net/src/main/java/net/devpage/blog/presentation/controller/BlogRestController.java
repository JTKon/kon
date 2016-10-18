package net.devpage.blog.presentation.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BlogRestController {
    
    @RequestMapping("/")
	public String index(Model model) {
		return "index";
	}
}
