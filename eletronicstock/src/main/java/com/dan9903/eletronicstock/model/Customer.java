package com.dan9903.eletronicstock.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "customers")
public class Customer {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String name;
  private String phone;
  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "customer_id")
  private List<Product> products = new ArrayList<Product>();

  public Customer() {
  }

  public void addProduct(Product a_product) {
    products.add(a_product);
  }

  public void removeProduct(Product a_product) {
    products.remove(a_product);
  }
}