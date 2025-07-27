
package com.kruger.kdevfull.service;

import com.kruger.kdevfull.dto.TokenDto;
import com.kruger.kdevfull.dto.UserLoginDto;
import com.kruger.kdevfull.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements IAuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public TokenDto authenticate(UserLoginDto userLoginDto) {

            Authentication authtoken = new UsernamePasswordAuthenticationToken(
                userLoginDto.getUsername(),
                userLoginDto.getPassword()
            );
            
            return (new TokenDto(jwtUtil.generateToken(
                authenticationManager.authenticate(authtoken)
            )));

    }

}
