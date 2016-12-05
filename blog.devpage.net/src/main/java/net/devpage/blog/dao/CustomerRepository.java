package net.devpage.blog.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import net.devpage.blog.entity.Customer;

public interface CustomerRepository extends MongoRepository<Customer, String> {

    public Customer findByFirstName(String firstName);
    public List<Customer> findByLastName(String lastName);

}