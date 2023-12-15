package com.example.technocrm.user;

import com.example.technocrm.user.dto.UserCreateDto;
import com.example.technocrm.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public void create(@RequestBody UserCreateDto userCreateDto) {
        userService.create(userCreateDto);
    }

    @GetMapping
    public List<UserResponseDto> getAll() {
        return userService.getAll();
    }

    @GetMapping("/{userId}")
    public UserResponseDto get(@PathVariable Integer userId) {
        return userService.get(userId);
    }

    @PutMapping("/{userId}")
    public void update(@PathVariable Integer userId, @RequestBody UserCreateDto userCreateDto) {
        userService.update(userId, userCreateDto);
    }

    @DeleteMapping("/{userId}")
    public void delete(@PathVariable Integer userId) {
        userService.delete(userId);
    }
}
