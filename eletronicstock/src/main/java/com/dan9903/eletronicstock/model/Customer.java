package com.dan9903.eletronicstock.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.dan9903.eletronicstock.model.dto.CustomerDTO;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;

@Data
@Entity
@Table(name = "customers")
public class Customer {

  public static Customer from(CustomerDTO dto) {
    Customer entity = new Customer();
    entity.setId(dto.getId());
    entity.setName(dto.getName());
    entity.setPhone(dto.getPhone());
    entity.setCreatedAt(dto.getCreatedAt());
    entity.setTotal(dto.getTotal());
    entity.setProductsSold(dto.getProductsSold().stream().map(ProductSold::from).collect(Collectors.toList()));
    return entity;
  }

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String name;
  private String phone;
  private float total;

  @CreationTimestamp
  private LocalDateTime createdAt;

  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "customerId")
  private List<ProductSold> productsSold = new ArrayList<>();

}