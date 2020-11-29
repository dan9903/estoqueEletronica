package com.dan9903.eletronicstock.services;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.dan9903.eletronicstock.model.Product;
import com.dan9903.eletronicstock.model.dto.ProductDTO;
import com.dan9903.eletronicstock.model.exception.ProductNotFoundException;
import com.dan9903.eletronicstock.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

  @Autowired
  public ProductService(ProductRepository a_productRepository) {
    productRepository = a_productRepository;
  }

  public ProductDTO addProduct(ProductDTO a_productDTO) {
    Product product = Product.from(a_productDTO);
    product = productRepository.save(product);
    return ProductDTO.from(product);
  }

  public List<ProductDTO> getAllProducts() {
    return StreamSupport.stream(productRepository.findAll().spliterator(), false).map(ProductDTO::from)
        .collect(Collectors.toList());
  }

  public ProductDTO getProduct(Long a_id) {
    return ProductDTO.from(findById(a_id));
  }

  public ProductDTO deleteProduct(Long a_id) {
    Product product = findById(a_id);
    productRepository.delete(product);
    return ProductDTO.from(product);
  }

  public ProductDTO editProduct(ProductDTO a_productDTO) {
    Product product = findById(a_productDTO.getId());

    product.setName(a_productDTO.getName());
    product.setAmount(a_productDTO.getAmount());
    product.setPrice(a_productDTO.getPrice());

    return ProductDTO.from(productRepository.save(product));
  }

  private Product findById(Long a_id) {
    return productRepository.findById(a_id).orElseThrow(() -> new ProductNotFoundException(a_id));
  }

  private final ProductRepository productRepository;
}