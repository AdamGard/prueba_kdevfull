package com.kruger.kdevfull.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectRequestDto {

    @NotBlank
    
    private String name;
    
    private String description;
    
    private Long ownerId;

}
