package com.dan9903.eletronicstock.repository;

import com.dan9903.eletronicstock.model.Product;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {

}