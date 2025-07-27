package com.kruger.kdevfull.repository;

import com.kruger.kdevfull.models.projects.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    List<Project> findByOwnerUsername(String owner);

}
