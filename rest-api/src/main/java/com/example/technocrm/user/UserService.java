package com.example.technocrm.user;

import com.example.technocrm.custom.CustomConfig;
import com.example.technocrm.user.dto.*;
import com.example.technocrm.user.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserDtoMapper userDtoMapper;
    private final CustomConfig customConfig;

    public void create(UserCreateDto userCreateDto, Integer id) {
        if (customConfig.isAdmin(id) || customConfig.isReceiver(id)) {

            User user = new User(
                    null,
                    userCreateDto.getFullName(),
                    userCreateDto.getUsername(),
                    userCreateDto.getPassword(),
                    userCreateDto.getRole(),
                    LocalDate.now(),
                    true
            );

            userRepository.save(user);

        }
    }

    public List<UserResponseDto> getAll(Integer id) {
        if(customConfig.isAdmin(id)) {
            return userDtoMapper.toResponse(userRepository.findAll());
        }
        return Collections.emptyList();
    }

    public UserResponseDto get(Integer userId) {

        User user = userRepository
                .findById(userId)
                .orElseThrow();

        return new UserResponseDto(
                userId,
                user.getFullName(),
                user.getUsername(),
                user.getRole(),
                user.getCreated(),
                user.isActive()
        );
    }

    public void update(Integer userId, UserUpdateDto userCreateDto) {

        User user = userRepository
                .findById(userId)
                .orElseThrow();

        user.setRole(userCreateDto.getRole());
        user.setUsername(userCreateDto.getUsername());
        user.setFullName(userCreateDto.getFullName());
//        user.setPassword(userCreateDto.getPassword());
        user.setActive(userCreateDto.isActive());

    }

    public void delete(Integer userId, Integer id) {
        if (customConfig.isAdmin(id)) {
            userRepository.deleteById(userId);
        }
    }

    public LoginResponseDto login(LoginDto loginDto) {
        User user = userRepository.findUserByUsername(loginDto.getUsername()).orElseThrow();
        return new LoginResponseDto(
                user.getId(),
                user.getFullName(),
                user.getUsername(),
                user.getRole(),
                user.getCreated()
        );
    }
}
