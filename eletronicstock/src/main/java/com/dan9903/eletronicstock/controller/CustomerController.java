package com.dan9903.eletronicstock.controller;

import java.util.List;

import javax.transaction.Transactional;

import com.dan9903.eletronicstock.model.dto.CustomerDTO;
import com.dan9903.eletronicstock.model.dto.ProductDTO;
import com.dan9903.eletronicstock.services.CustomerService;
import com.dan9903.eletronicstock.services.ProductSoldService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/customers")
public class CustomerController {

  @Autowired
  public CustomerController(CustomerService a_customerService, ProductSoldService a_productSoldService) {
    customerService = a_customerService;
    productSoldService = a_productSoldService;
  }

  @PostMapping
  @Transactional
  public ResponseEntity<CustomerDTO> create(@RequestBody CustomerDTO a_customerDTO) {
    productSoldService.normalizeProducts(a_customerDTO.getProductsSold());
    CustomerDTO response = customerService.addCustomer(a_customerDTO);
    return new ResponseEntity<CustomerDTO>(response, HttpStatus.CREATED);
  }

  @GetMapping
  public ResponseEntity<List<CustomerDTO>> index() {
    List<CustomerDTO> customersList = customerService.getAllCustomers();
    return new ResponseEntity<List<CustomerDTO>>(customersList, HttpStatus.OK);
  }

  @GetMapping("/products/{a_id}")
  public ResponseEntity<List<ProductDTO>> getProducts(@PathVariable final Long a_id) {
    List<ProductDTO> response = productSoldService.getProductsByCustomerId(a_id);
    return new ResponseEntity<List<ProductDTO>>(response, HttpStatus.OK);
  }

  private CustomerService customerService;
  private ProductSoldService productSoldService;
}
