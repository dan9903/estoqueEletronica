package com.dan9903.eletronicstock.model.exception;

import java.text.MessageFormat;

public class ProductNotFoundException extends RuntimeException {

  /**
   *
   */
  private static final long serialVersionUID = 1L;

  public ProductNotFoundException(Long a_id) {
    super(MessageFormat.format("Could not find product with id: {0}", a_id));
  }
}
