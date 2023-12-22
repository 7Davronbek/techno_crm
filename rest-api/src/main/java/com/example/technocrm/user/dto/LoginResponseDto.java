package com.example.technocrm.user.dto;

import com.example.technocrm.user.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDto {
    private Integer id;
    private String fullName;
    private String username;
    private Role role;
    private LocalDate created;
}
