package com.okhwa.okdol.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
class UserController {
    private final UserService userService;

    @GetMapping("/users/{email}")  // 이메일 중복 체크
    public ResponseEntity<String> checkEmailExists(@PathVariable String email) {
        boolean emailExists = userService.checkEmailExists(email);
        if (emailExists) {
            return ResponseEntity.ok("true");
        } else {
            return ResponseEntity.ok("false");
        }
    }

    @RequestMapping(value="/users")
    User registerUser(@RequestBody User user) {
        return userService.save(user);
    }

}

