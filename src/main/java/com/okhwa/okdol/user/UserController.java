package com.okhwa.okdol.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users/{email}")  // 이메일 중복 체크
    public ResponseEntity<String> checkEmailExists(@PathVariable String email) {
        boolean emailExists = userService.checkEmailExists(email);
        if (emailExists) {
            return ResponseEntity.ok("true");
        } else {
            return ResponseEntity.ok("false");
        }
    }

    @RequestMapping(value="/users", method=RequestMethod.POST)
    User registerMember(@RequestBody User user) {
        System.out.println("user = " + user);
        return userService.save(user);
    }

}

