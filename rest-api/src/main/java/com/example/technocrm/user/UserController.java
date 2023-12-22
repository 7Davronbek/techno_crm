package com.example.technocrm.user;

import com.example.technocrm.user.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/login")
    public LoginResponseDto login(@RequestBody LoginDto loginDto) {
        return userService.login(loginDto);
    }


    @PostMapping
    public void create(
            @RequestBody UserCreateDto userCreateDto,
            @RequestHeader Integer id
    ) {
        userService.create(userCreateDto, id);
    }

    @GetMapping
    public List<UserResponseDto> getAll(@RequestHeader Integer id) {
        return userService.getAll(id);
    }

    @GetMapping("/{userId}")
    public UserResponseDto get(@PathVariable Integer userId) {
        return userService.get(userId);
    }

    @PutMapping("/{userId}")
    public void update(@PathVariable Integer userId, @RequestBody UserUpdateDto userCreateDto) {
        userService.update(userId, userCreateDto);
    }

    @DeleteMapping("/{userId}")
    public void delete(@PathVariable Integer userId, @RequestHeader Integer id) {
        userService.delete(userId, id);
    }
}
