package com.kruger.kdevfull.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectResponseDto {

    
    private Long id;
    
    private String name;
    
    private String description;
    
    private Long ownerId;
    
    private String ownerUsername;
    
    private java.time.LocalDateTime createdAt;
    
    private java.time.LocalDateTime updatedAt;

}
