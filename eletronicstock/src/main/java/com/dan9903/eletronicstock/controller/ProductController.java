package com.dan9903.eletronicstock.controller;

import java.util.List;

import com.dan9903.eletronicstock.model.dto.ProductDTO;
import com.dan9903.eletronicstock.services.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/products")
public class ProductController {

  @Autowired
  public ProductController(ProductService a_productService) {
    productService = a_productService;
  }

  @PostMapping
  public ResponseEntity<ProductDTO> create(@RequestBody final ProductDTO a_productDTO) {
    ProductDTO response = productService.addProduct(a_productDTO);
    return new ResponseEntity<ProductDTO>(response, HttpStatus.CREATED);
  }

  @GetMapping
  public ResponseEntity<List<ProductDTO>> index() {
    List<ProductDTO> productsList = productService.getAllProducts();
    return new ResponseEntity<List<ProductDTO>>(productsList, HttpStatus.OK);
  }

  @GetMapping(value = "{id}")
  public ResponseEntity<ProductDTO> show(@PathVariable final Long a_id) {
    ProductDTO response = productService.getProduct(a_id);
    return new ResponseEntity<ProductDTO>(response, HttpStatus.OK);
  }

  @DeleteMapping(value = "{id}")
  public ResponseEntity<ProductDTO> delete(@PathVariable final Long a_id) {
    ProductDTO response = productService.deleteProduct(a_id);
    return new ResponseEntity<ProductDTO>(response, HttpStatus.OK);
  }

  @PutMapping()
  public ResponseEntity<ProductDTO> update(@RequestBody final ProductDTO a_productDTO) {
    ProductDTO response = productService.editProduct(a_productDTO);
    return new ResponseEntity<ProductDTO>(response, HttpStatus.OK);
  }

  private final ProductService productService;
}
