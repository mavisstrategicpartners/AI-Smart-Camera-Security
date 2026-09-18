package com.aismartcamerasecurity.backend.orders.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;

public class CheckoutRequest {
    @NotBlank
    public String cartToken;

    @NotBlank
    public String fullName;

    @Email @NotBlank
    public String email;

    @NotBlank
    public String phone;

    @NotBlank
    public String addressLine1;

    public String addressLine2;

    @NotBlank
    public String city;

    @NotBlank
    public String province;

    @NotBlank
    public String postalCode;

    public BigDecimal shippingFee = BigDecimal.ZERO;
}


