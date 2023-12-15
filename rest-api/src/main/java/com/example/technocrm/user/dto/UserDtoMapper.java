package com.example.technocrm.user.dto;

import com.example.technocrm.user.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserDtoMapper {
    private final ModelMapper mapper = new ModelMapper();

    public UserResponseDto toResponse(User user) {
        return mapper.map(user, UserResponseDto.class);
    }

    public List<UserResponseDto> toResponse(List<User> users) {
        return users
                .stream()
                .map(this::toResponse)
                .toList();
    }
}
