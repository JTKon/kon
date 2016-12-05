package net.devpage.blog.controller;

import java.util.List;

import net.devpage.blog.dao.CustomerRepository;
import net.devpage.blog.entity.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CustomerController {
    
    @Autowired
	private CustomerRepository repository;
    
    @RequestMapping("/customer/deleteAll")
	public void deleteAll() {
        repository.deleteAll();
	}
    
    @RequestMapping("/customer/save")
	public void save() {
        // save a couple of customers
		repository.save(new Customer("Alice", "Smith"));
		repository.save(new Customer("Bob", "Smith"));
	}
	
	@RequestMapping("/customer/findAll")
	public @ResponseBody List<Customer> findAll() {
        return repository.findAll();
	}
    
	@RequestMapping("/customer/findByFirstName")
	public @ResponseBody Customer findByFirstName() {
        return repository.findByFirstName("Alice");
	}
	
	@RequestMapping("/customer/findByLastName")
	public @ResponseBody List<Customer> findByLastName() {
        return repository.findByLastName("Smith");
	}
}
