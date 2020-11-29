package com.dan9903.eletronicstock.model.dto;

import com.dan9903.eletronicstock.model.Product;

import lombok.Data;

@Data
public class ProductDTO {

  public static ProductDTO from(Product a_entity) {
    ProductDTO dto = new ProductDTO();
    dto.setId(a_entity.getId());
    dto.setName(a_entity.getName());
    dto.setAmount(a_entity.getAmount());
    dto.setPrice(a_entity.getPrice());
    return dto;
  }

  private Long id;
  private String name;
  private int amount;
  private float price;
}