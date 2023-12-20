package com.example.technocrm.user.dto;

import com.example.technocrm.user.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateDto {
    private String fullName;
    private String username;
//    private String password;
    private Role role;
    private boolean isActive;
}
