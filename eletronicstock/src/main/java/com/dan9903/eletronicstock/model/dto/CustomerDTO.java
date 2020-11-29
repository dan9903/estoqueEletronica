package com.dan9903.eletronicstock.model.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.dan9903.eletronicstock.model.Customer;

import lombok.Data;

@Data
public class CustomerDTO {

  public static CustomerDTO from(Customer entity) {
    CustomerDTO dto = new CustomerDTO();
    dto.setId(entity.getId());
    dto.setPhone(entity.getPhone());
    dto.setName(entity.getName());
    dto.setCreatedAt(entity.getCreatedAt());
    dto.setTotal(entity.getTotal());
    dto.setProductsSold(entity.getProductsSold().stream().map(ProductSoldDTO::from).collect(Collectors.toList()));
    return dto;
  }

  public void removeProducts() {
    productsSold = null;
  }

  private Long id;
  private String name;
  private String phone;
  private LocalDateTime createdAt;
  private float total;
  private List<ProductSoldDTO> productsSold = new ArrayList<>();
}
