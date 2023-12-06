package com.okhwa.okdol.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/members")
class MemberController {
    @Autowired
    private MemberRepository repository;

    @GetMapping("/checkEmail/{email}")  // 이메일 중복 체크
    public ResponseEntity<String> checkEmailExists(@PathVariable String email) {
        boolean emailExists = repository.existsByEmail(email);
        if (emailExists) {
            return ResponseEntity.ok("true");
        } else {
            return ResponseEntity.ok("false");
        }
    }
}
