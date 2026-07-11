package com.cognizant.account;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    @GetMapping("/{number}")
    public Account getAccountByNumber(@PathVariable int number) {

        return new Account(number, "Savings", 234343);

    }
}