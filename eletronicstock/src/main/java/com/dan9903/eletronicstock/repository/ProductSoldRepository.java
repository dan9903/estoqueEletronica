package com.dan9903.eletronicstock.repository;

import com.dan9903.eletronicstock.model.ProductSold;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductSoldRepository extends CrudRepository<ProductSold, Long> {

}