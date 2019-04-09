package com.example.demo.dao;

import com.example.demo.domains.User;

import java.util.List;

public interface UserDao {

    void insertUser(User user);


    List<User> getAllUsers();

    void changeIdentity(String userID,int type);

    boolean isRegister(String userID);

    List<User> getUsers(int type);

    User getUserByUserID(String userID);

    void updateUser(User user);
}
