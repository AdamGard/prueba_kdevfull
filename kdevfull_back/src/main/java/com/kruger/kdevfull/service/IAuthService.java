
package com.kruger.kdevfull.service;

import com.kruger.kdevfull.dto.TokenDto;
import com.kruger.kdevfull.dto.UserLoginDto;

public interface IAuthService {

    public TokenDto authenticate(UserLoginDto userLoginDto);
    
}
