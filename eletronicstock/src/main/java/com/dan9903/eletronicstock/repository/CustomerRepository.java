package com.dan9903.eletronicstock.repository;

import com.dan9903.eletronicstock.model.Customer;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Long> {

}