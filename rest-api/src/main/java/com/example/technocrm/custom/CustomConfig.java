package com.example.technocrm.custom;

import com.example.technocrm.user.UserRepository;
import com.example.technocrm.user.entity.Role;
import com.example.technocrm.user.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.NoSuchElementException;

@Component
@RequiredArgsConstructor
public class CustomConfig {
    private final UserRepository userRepository;

    @Transactional
    public boolean isAdmin(Integer id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(NoSuchElementException::new);
        return user.getRole().equals(Role.ROLE_ADMIN);
    }

    @Transactional
    public boolean isReceiver(Integer id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(NoSuchElementException::new);
        return user.getRole().equals(Role.ROLE_RECEIVER);
    }

    @Transactional
    public boolean isSpecialist(Integer id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(NoSuchElementException::new);
        return user.getRole().equals(Role.ROLE_SPECIALIST);
    }

    @Transactional
    public boolean isAccountant(Integer id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(NoSuchElementException::new);
        return user.getRole().equals(Role.ROLE_ACCOUNTANT);
    }

//    @Transactional
//    public boolean isStaff(Integer id) {
//        User user = userRepository
//                .findById(id)
//                .orElseThrow(NoSuchElementException::new);
//        return user.getRole().equals(Role.ROLE_STAFF);
//    }

    @Transactional
    public boolean isStandard(Integer id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(NoSuchElementException::new);
        return user.getRole().equals(Role.ROLE_STANDARD);
    }

    @Transactional
    public boolean isDoc(Integer id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(NoSuchElementException::new);
        return user.getRole().equals(Role.ROLE_DOC);
    }
}
