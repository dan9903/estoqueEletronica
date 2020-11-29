package com.dan9903.eletronicstock.services;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.dan9903.eletronicstock.model.Customer;
import com.dan9903.eletronicstock.model.dto.CustomerDTO;
import com.dan9903.eletronicstock.model.exception.CustomerNotFoundException;
import com.dan9903.eletronicstock.repository.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

  @Autowired
  public CustomerService(CustomerRepository a_customerRepository) {
    customerRepository = a_customerRepository;
  }

  public CustomerDTO addCustomer(CustomerDTO a_customerDTO) {
    Customer customer = Customer.from(a_customerDTO);
    customer = customerRepository.save(customer);
    return CustomerDTO.from(customer);
  }

  public List<CustomerDTO> getAllCustomers() {
    List<CustomerDTO> customerList = StreamSupport.stream(customerRepository.findAll().spliterator(), false)
        .map(CustomerDTO::from).collect(Collectors.toList());
    customerList.stream().forEach(CustomerDTO::removeProducts);
    return customerList;
  }

  public CustomerDTO getCustomer(Long a_id) {
    return CustomerDTO.from(findById(a_id));
  }

  private Customer findById(Long a_id) {
    return customerRepository.findById(a_id).orElseThrow(() -> new CustomerNotFoundException(a_id));
  }

  private final CustomerRepository customerRepository;

}