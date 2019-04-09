package com.example.demo.serviceImpl;

import com.example.demo.dao.MessageDao;
import com.example.demo.dao.UserDao;
import com.example.demo.daoImpl.MessageDaoImpl;
import com.example.demo.daoImpl.UserDaoImpl;
import com.example.demo.domains.Message;
import com.example.demo.domains.Student;
import com.example.demo.domains.Teacher;
import com.example.demo.domains.User;
import com.example.demo.service.UserService;

import java.util.List;

public class UserServiceImpl implements UserService {
    private UserDao userDao = new UserDaoImpl();
    private MessageDao messageDao = new MessageDaoImpl();
    @Override
    public String login(String userID, String password) {
        List<User> users = userDao.getAllUsers();
        for(User user:users){
            if(userID.equals(user.getUserid())){
                if(password.equals(user.getPassword())){
                    return user.getIdentity()+";"+user.getName();
                }
                else{
                    return "密码错误";
                }
            }
        }
        return "密码错误";
    }

    @Override
    public void changeUserInfo(String userID,int type) {
        userDao.changeIdentity(userID,type);
        new UserServiceImpl().notifyAdmin("ID为"+userID+"的用户更新了信息");
    }

    @Override
    public void notifyAdmin(String info) {
        Message message = new Message();
        message.setContent(info);
        messageDao.insertMessage(message);
    }

    @Override
    public double getFine(String userID) {
        return new BookServiceImpl().getAllLateRecord(userID).size()*20;
    }

    @Override
    public void insertUser(User user) {
        userDao.insertUser(user);
    }

    @Override
    public List<Message> getAllMessage() {
        return messageDao.getAllMessage();
    }

    @Override
    public boolean isRegister(String userID) {
        return userDao.isRegister(userID);
    }

    @Override
    public List<User> getUsers(int type) {
        return userDao.getUsers(type);
    }

    @Override
    public User getUserByUserID(String userID) {
        return userDao.getUserByUserID(userID);
    }

    @Override
    public void updateUser(User user) {
        userDao.updateUser(user);
    }

}
