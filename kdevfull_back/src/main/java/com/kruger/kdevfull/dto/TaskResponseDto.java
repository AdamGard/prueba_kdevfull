package com.kruger.kdevfull.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

import com.kruger.kdevfull.models.task.Task;

@Getter
@Setter
public class TaskResponseDto {
    
    private Long id;
    
    private String title;
    
    private String description;
    
    private Task.Status status;
    
    private Long assignedToId;
    
    private Long projectId;
    
    private LocalDateTime dueDate;

}
