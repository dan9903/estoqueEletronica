package com.dan9903.eletronicstock.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.dan9903.eletronicstock.model.dto.ProductDTO;

import lombok.Data;

@Data
@Entity
@Table(name = "products")
public class Product {

  public static Product from(ProductDTO dto) {
    Product entity = new Product();
    entity.setId(dto.getId());
    entity.setName(dto.getName());
    entity.setAmount(dto.getAmount());
    entity.setPrice(dto.getPrice());
    return entity;
  }

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String name;
  private int amount;
  private float price;
}