package com.okhwa.okdol.member;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api")
class MemberController {
    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/members/{email}")  // 이메일 중복 체크
    public ResponseEntity<String> checkEmailExists(@PathVariable String email) {
        boolean emailExists = memberService.checkEmailExists(email);
        if (emailExists) {
            return ResponseEntity.ok("true");
        } else {
            return ResponseEntity.ok("false");
        }
    }

    @RequestMapping(value="/members", method=RequestMethod.POST)
    Member registerMember(Member member) {
        if (member.getEmail() == null) {
        // 필수 필드가 비어 있을 경우 예외 처리 또는 기본값 설정
        throw new IllegalArgumentException("예외처리중");
    }
        System.out.println("member = " + member);
        return memberService.save(member);
    }

}

