package com.dan9903.eletronicstock.model.exception;

import java.text.MessageFormat;

public class ProductAmountOutOfRangeException extends RuntimeException {
  /**
   *
   */
  private static final long serialVersionUID = 1L;

  public ProductAmountOutOfRangeException(String product_name) {
    super(MessageFormat.format("Não é possível salvar a quantidade do produto {0} com um valor menor do que zero.",
        product_name));
  }
}
