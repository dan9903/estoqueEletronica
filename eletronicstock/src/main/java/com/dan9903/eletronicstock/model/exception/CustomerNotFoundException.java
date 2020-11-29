package com.dan9903.eletronicstock.model.exception;

import java.text.MessageFormat;

public class CustomerNotFoundException extends RuntimeException {

  /**
   *
   */
  private static final long serialVersionUID = 1L;

  public CustomerNotFoundException(Long a_id) {
    super(MessageFormat.format("Could not find customer with id: {0}", a_id));
  }
}
