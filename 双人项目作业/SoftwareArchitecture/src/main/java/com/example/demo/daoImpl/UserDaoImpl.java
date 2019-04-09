package com.example.demo.daoImpl;

import com.example.demo.dao.UserDao;
import com.example.demo.domains.Student;
import com.example.demo.domains.User;
import com.example.demo.serviceImpl.UserServiceImpl;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.query.Query;

import java.util.ArrayList;
import java.util.List;


public class UserDaoImpl implements UserDao {

    @Override
    public void insertUser(User user) {
        Session session = HibernateUtils.getSession();
        session.beginTransaction();
        session.save(user);
        session.getTransaction().commit();
        HibernateUtils.closeSession(session);
    }

    @Override
    public List<User> getAllUsers() {
        Session session = HibernateUtils.getSession();
        String hql =" select * from users ";
        SQLQuery<User> query=session.createSQLQuery(hql).addEntity(User.class);
        List<User> list = query.list();
        HibernateUtils.closeSession(session);
        return list;
    }

    @Override
    public void changeIdentity(String userID, int type) {
        String identity ="";
        identity="\'"+identity+"\'";
        userID= "\'"+userID+"\'";
        if (type == 0)
            identity = "学生";
        else if (type == 1)
            identity = "研究生";
        else if (type == 2)
            identity = "老师";
        Session session = HibernateUtils.getSession();
        session.beginTransaction();
        Query query = session.createQuery("UPDATE User u set u.identity = "+ identity +" where u.id = "+userID);
        query.executeUpdate();
        session.getTransaction().commit();
        HibernateUtils.closeSession(session);

    }

    @Override
    public boolean isRegister(String userID) {
        List<User> users = new UserDaoImpl().getAllUsers();
        for(User user:users){
            if(user.getUserid().equals(userID))
                return false;
        }
        return true;
    }

    @Override
    public List<User> getUsers(int type) {
        List<User> users = new UserDaoImpl().getAllUsers();
        String identity = "";
        if (type == 0)
            identity = "学生";
        else if (type == 1)
            identity = "研究生";
        else if (type == 2)
            identity = "老师";
        List<User> result = new ArrayList<>();
        for(User user:users){
            if(user.getIdentity().equals(identity)){
                result.add(user);
            }
        }
        return result;
    }

    @Override
    public User getUserByUserID(String userID) {
        userID= "\'"+userID+"\'";
        Session session = HibernateUtils.getSession();
        Query query = session.createQuery("from User where userid = "+userID );
        User user  = (User)query.list().get(0);
        HibernateUtils.closeSession(session);
        return user;
    }

    @Override
    public void updateUser(User user) {
        Session session = HibernateUtils.getSession();
        session.beginTransaction();
        session.update(user);
        session.getTransaction().commit();
        HibernateUtils.closeSession(session);
    }

    public static void main(String[] args){

        User user = new Student();
        user.setSchool("nju");
        user.setDepartment("se");
        user.setName("lml");
        user.setUserid("lml");
        user.setPassword("123");
        new UserDaoImpl().getAllUsers();

    }


}
