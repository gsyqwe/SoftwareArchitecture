package com.example.demo.daoImpl;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtils {
    private static SessionFactory sessionFactory;
    private static Configuration configuration = new Configuration().configure();

    static {
        try {
            sessionFactory = configuration.buildSessionFactory();
        } catch (Exception e) {
            System.err.println("%%%% Error Creating SessionFactory%%%%");
            e.printStackTrace();

        }
    }

    private HibernateUtils() {
    }

    public static SessionFactory getSessionFactory() throws Exception{
        if(sessionFactory!=null){
            return sessionFactory;
        }else{
            throw new Exception("sessionfactory是空的");
        }
    }


    public static Session getSession() {
       Session session=null;
       try{
           if(sessionFactory!=null){
               session=sessionFactory.openSession();
           }
       }catch (HibernateException e){
           e.printStackTrace();
       }
        return session;
    }



    public static void closeSession(Session session){
        try{
            if(session!=null && session.isOpen()){
                session.close();
            }
        }catch (HibernateException e){
            e.printStackTrace();
        }
    }


}

