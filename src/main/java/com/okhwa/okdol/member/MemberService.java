package com.okhwa.okdol.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    @Autowired
    private MemberRepository repository;

    public Boolean checkEmailExists(String email) {
        return repository.existsByEmail(email);
    }

    Member save(Member member) {

        return repository.save(member);
    }
}
