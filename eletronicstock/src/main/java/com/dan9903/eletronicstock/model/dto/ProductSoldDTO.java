package com.dan9903.eletronicstock.model.dto;

import com.dan9903.eletronicstock.model.ProductSold;

import lombok.Data;

@Data
public class ProductSoldDTO {

  public static ProductSoldDTO from(ProductSold entity) {
    ProductSoldDTO dto = new ProductSoldDTO();
    dto.setId(entity.getId());
    dto.setCustomerId(entity.getCustomerId());
    dto.setProductId(entity.getProductId());
    dto.setAmount(entity.getAmount());
    dto.setPrice(entity.getPrice());
    return dto;
  }

  private Long id;
  private Long customerId;
  private Long productId;
  private int amount;
  private float price;
}
