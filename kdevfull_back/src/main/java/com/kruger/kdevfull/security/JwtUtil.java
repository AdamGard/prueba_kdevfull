package com.kruger.kdevfull.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import com.kruger.kdevfull.models.user.User;
import com.kruger.kdevfull.repository.UserRepository;
import java.util.Date;

@Component
public class JwtUtil {
    
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpirationMs;

    @Autowired
    private UserRepository userRepository;

    public String generateToken(Authentication authentication) {

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

        
        User user = userRepository.findByUsername(authentication.getName()).orElse(null);
        String userRole = user != null ? user.getRole().name() : "USER";

        return Jwts.builder()
            .setSubject(authentication.getName())
            .setIssuedAt(now)
            .setExpiration(expiryDate)
            .claim("role", userRole) 
            .signWith(
                Keys.hmacShaKeyFor(jwtSecret.getBytes()),
                SignatureAlgorithm.HS512
            ).compact();

    }
    
    public boolean isValidToken(String token) {

        try {

            getClaimsFromToken(token);    
            return true;

        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }

    }

    public Claims getClaimsFromToken(String token) {

        return Jwts.parserBuilder()
            .setSigningKey(Keys.hmacShaKeyFor(jwtSecret.getBytes()))
            .build()
            .parseClaimsJws(token)
            .getBody();
    
    }

    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token).getSubject();
    }

    public String getRoleFromToken(String token) {
        return getClaimsFromToken(token).get("role", String.class);
    }

}
