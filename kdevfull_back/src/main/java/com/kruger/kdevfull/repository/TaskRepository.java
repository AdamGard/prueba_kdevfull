package com.kruger.kdevfull.repository;

import com.kruger.kdevfull.models.task.Task;
import com.kruger.kdevfull.models.projects.Project;
import com.kruger.kdevfull.models.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByAssignedTo(User user);
    List<Task> findByProject(Project project);
}
