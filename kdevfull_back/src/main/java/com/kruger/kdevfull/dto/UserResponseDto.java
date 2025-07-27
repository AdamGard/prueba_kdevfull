package com.kruger.kdevfull.dto;

import java.time.LocalDateTime;

import com.kruger.kdevfull.models.user.User;

import lombok.Data;

@Data
public class UserResponseDto {
    
    private Long id;
    
    private String username;
    
    private String email;
    
    private User.Roles role;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;

}
