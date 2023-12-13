package com.okhwa.okdol.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/account")
public class AccountController {

    @GetMapping("/login")
    public String login() {
        return "account/login";
    }

    @GetMapping("/success")
    public String loginSuccess() { return "redirect:/"; }

    @GetMapping("/register")
    public String register() {
        return "account/register";
    }
}
