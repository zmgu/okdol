package com.okhwa.okdol.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public Boolean checkEmailExists(String email) {
        return repository.existsByEmail(email);
    }

    User save(User user) {

        return repository.save(user);
    }
}
