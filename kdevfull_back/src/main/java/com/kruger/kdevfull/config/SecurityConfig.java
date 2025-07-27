package com.kruger.kdevfull.config;

import com.kruger.kdevfull.security.JwtAuthenticationFilter;
import com.kruger.kdevfull.security.NewUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private NewUserDetailsService userDetailsService;
    
    @Autowired
    private UrlBasedCorsConfigurationSource corsConfigurationSource;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        
        return http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            .sessionManagement(sess -> sess.sessionCreationPolicy(
                SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> {
                auth.requestMatchers(
                    "/auth/**",
                    "/v3/api-docs/**",
                    "/swagger",
                    "/swagger-ui.html",
                    "/swagger-ui/**"
                ).permitAll();
                auth.requestMatchers(
                    HttpMethod.POST, "/users").hasRole("ADMIN");
                auth.anyRequest().authenticated();
            }).addFilterBefore(
                jwtAuthenticationFilter,
                 UsernamePasswordAuthenticationFilter.class).build();
        
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        
        DaoAuthenticationProvider dap = new DaoAuthenticationProvider(userDetailsService);

        dap.setPasswordEncoder(passwordEncoder());
        
        return dap;
        
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
        AuthenticationConfiguration config) throws Exception {
        
        return config.getAuthenticationManager();
    
    }

}
