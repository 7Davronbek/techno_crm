package com.example.technocrm.user;

import com.example.technocrm.user.dto.UserCreateDto;
import com.example.technocrm.user.dto.UserDtoMapper;
import com.example.technocrm.user.dto.UserResponseDto;
import com.example.technocrm.user.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserDtoMapper userDtoMapper;

    public void create(UserCreateDto userCreateDto) {

        User user = new User(
                null,
                userCreateDto.getFullName(),
                userCreateDto.getUsername(),
                userCreateDto.getPassword(),
                userCreateDto.getRole()
        );

        userRepository.save(user);
    }

    public List<UserResponseDto> getAll() {
        return userDtoMapper.toResponse(userRepository.findAll());
    }

    public UserResponseDto get(Integer userId) {

        User user = userRepository
                .findById(userId)
                .orElseThrow();

        return new UserResponseDto(
                userId,
                user.getFullName(),
                user.getUsername(),
                user.getRole()
        );
    }

    public void update(Integer userId, UserCreateDto userCreateDto) {

        User user = userRepository
                .findById(userId)
                .orElseThrow();

        user.setRole(userCreateDto.getRole());
        user.setUsername(userCreateDto.getUsername());
        user.setFullName(userCreateDto.getFullName());
        user.setPassword(userCreateDto.getPassword());

    }

    public void delete(Integer userId) {
        userRepository.deleteById(userId);
    }
}
