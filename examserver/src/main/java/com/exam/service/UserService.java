package com.exam.service;

import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;

import java.util.Set;

public interface UserService {
    public User createUser(User user, Set<UserRole>userRoles) throws Exception;
    public User getUser(String username);
    public void deleteUser(Long userId);
}
