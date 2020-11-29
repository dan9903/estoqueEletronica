package com.dan9903.eletronicstock.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import javax.transaction.Transactional;

import com.dan9903.eletronicstock.model.ProductSold;
import com.dan9903.eletronicstock.model.dto.ProductDTO;
import com.dan9903.eletronicstock.model.dto.ProductSoldDTO;
import com.dan9903.eletronicstock.model.exception.ProductAmountOutOfRangeException;
import com.dan9903.eletronicstock.repository.ProductSoldRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductSoldService {

  @Autowired
  public ProductSoldService(ProductSoldRepository a_productSoldRepository, ProductService a_productService) {
    productService = a_productService;
    productSoldRepository = a_productSoldRepository;
  }

  @Transactional
  public List<ProductSoldDTO> normalizeProducts(List<ProductSoldDTO> a_listProductsSold) {
    List<ProductSoldDTO> productsList = new ArrayList<ProductSoldDTO>();
    for (ProductSoldDTO product : a_listProductsSold) {
      productsList.add(addPriceToProduct(product));
    }
    return productsList;
  }

  @Transactional
  private ProductSoldDTO addPriceToProduct(ProductSoldDTO a_productSoldDTO) {
    ProductDTO productDTO = productService.getProduct(a_productSoldDTO.getProductId());
    int newAmount = productDTO.getAmount() - a_productSoldDTO.getAmount();
    if (newAmount < 0)
      throw new ProductAmountOutOfRangeException(productDTO.getName());
    productDTO.setAmount(newAmount);
    a_productSoldDTO.setPrice(productDTO.getPrice());
    productService.editProduct(productDTO);
    return a_productSoldDTO;
  }

  public List<ProductDTO> getProductsByCustomerId(Long a_id) {
    List<ProductSoldDTO> productsSoldDTO = StreamSupport.stream(productSoldRepository.findAll().spliterator(), false)
        .map(ProductSoldDTO::from).collect(Collectors.toList());
    productsSoldDTO = productsSoldDTO.stream().filter((p) -> p.getCustomerId() == a_id).collect(Collectors.toList());
    List<ProductDTO> products = new ArrayList<>();
    for (ProductSoldDTO product : productsSoldDTO) {
      ProductDTO p = productService.getProduct(product.getProductId());
      p.setPrice(product.getPrice());
      p.setAmount(product.getAmount());
      products.add(p);
    }
    return products;
  }

  public List<ProductSold> getAllProducts() {
    return StreamSupport.stream(productSoldRepository.findAll().spliterator(), false).collect(Collectors.toList());
  }

  // private ProductSold findById(Long a_id) {
  // return productSoldRepository.findById(a_id).orElseThrow(() -> new
  // ProductNotFoundException(a_id));
  // }

  private final ProductSoldRepository productSoldRepository;
  private final ProductService productService;
}
