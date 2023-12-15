package com.example.texnocrm.user;

import com.example.texnocrm.user.dto.RegisterDto;
import com.example.texnocrm.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow();
    }

    public void register(RegisterDto registerDto) {
        User user = new User(
                null,
                registerDto.getFullName(),
                registerDto.getUsername(),
                registerDto.getPassword());
        userRepository.save(user);
    }
}
