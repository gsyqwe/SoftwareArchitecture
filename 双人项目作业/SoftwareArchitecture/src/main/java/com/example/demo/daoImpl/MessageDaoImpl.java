package com.example.demo.daoImpl;

import com.example.demo.dao.MessageDao;
import com.example.demo.domains.Message;
import org.hibernate.Session;
import org.hibernate.query.Query;

import java.util.List;

public class MessageDaoImpl implements MessageDao {
    @Override
    public void insertMessage(Message message) {
        Session session = HibernateUtils.getSession();
        session.save(message);
        HibernateUtils.closeSession(session);
    }

    @Override
    public List<Message> getAllMessage() {
        Session session = HibernateUtils.getSession();
        Query query = session.createQuery("from Message");
        List<Message> messages = query.getResultList();
        HibernateUtils.closeSession(session);
        return messages;
    }
}
