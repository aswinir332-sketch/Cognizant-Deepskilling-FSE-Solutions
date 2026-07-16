package com.cognizant.loan.controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class LoanController {

    @GetMapping("/loan")
    public String getLoanDetails() {

        System.out.println("----- Loan Details -----");
        System.out.println("Loan Type : Home Loan");
        System.out.println("Loan Amount : 500000");
        System.out.println("Loan Status : Approved");
        System.out.println("------------------------");

        return "Loan details printed in console";
    }
}