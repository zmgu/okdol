package com.okhwa.okdol.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Boolean checkEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    User save(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        user.setRole(Role.ROLE_USER);
        user.setEnabled(true);

        return userRepository.save(user);
    }
}
