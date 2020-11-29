package com.dan9903.eletronicstock.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.dan9903.eletronicstock.model.dto.ProductSoldDTO;

import lombok.Data;

@Data
@Entity
@Table(name = "solds")
public class ProductSold {
  public static ProductSold from(ProductSoldDTO dto) {
    ProductSold entity = new ProductSold();
    entity.setId(dto.getId());
    entity.setCustomerId(dto.getCustomerId());
    entity.setProductId(dto.getProductId());
    entity.setAmount(dto.getAmount());
    entity.setPrice(dto.getPrice());
    return entity;
  }

  // public boolean soldValidator(ProductSoldDTO a_productSoldDTO) {
  // ProductDTO productDTO = productService.getProduct(a_productSoldDTO.getId());
  // int newAmount = productDTO.getAmount() - a_productSoldDTO.getQuantity();
  // if (newAmount < 0)
  // throw new ProductAmountOutOfRangeException(productDTO.getName());
  // productDTO.setAmount(newAmount);
  // productService.editProduct(productDTO);
  // ProductSoldDTO response =
  // ProductSoldDTO.from(productSoldRepository.save(ProductSold.from(a_productSoldDTO)));

  // return response;
  // }

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private Long customerId;
  private Long productId;
  private int amount;
  @Column(precision = 2)
  private float price;
}
