
package com.kruger.kdevfull.controller;

import com.kruger.kdevfull.dto.TokenDto;
import com.kruger.kdevfull.dto.UserLoginDto;
import com.kruger.kdevfull.service.IAuthService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private IAuthService authService;

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(
        @RequestBody @Valid UserLoginDto userRequestDto) {
        
        return ResponseEntity.ok(authService.authenticate(userRequestDto));
        
    }

}
