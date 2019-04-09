package com.example.demo.daoImpl;

import com.example.demo.dao.RecordDao;
import com.example.demo.domains.Record;
import org.hibernate.Session;
import org.hibernate.query.Query;

import java.util.List;
public class RecordDaoImpl implements RecordDao {
    @Override
    public List<Record> getAllRecords(String userID) {
        userID = "\'" + userID + "\'";
        Session session = HibernateUtils.getSession();
        Query query = session.createQuery("from Record where userID = "+userID);
        List<Record> list = query.getResultList();
        HibernateUtils.closeSession(session);
        return list;
    }

    @Override
    public void insertRecord(Record record) {
        Session session = HibernateUtils.getSession();
        session.save(record);
        HibernateUtils.closeSession(session);
    }

    @Override
    public int getBookNumAlreadyBorrowed(String userID) {
        Session session = HibernateUtils.getSession();
        Query query = session.createQuery("from Record where flag = 1");
        List<Record> records = query.getResultList();
        HibernateUtils.closeSession(session);
        return records.size();
    }

    @Override
    public void returnBook(String userID, int bookID) {
        Session session = HibernateUtils.getSession();
        session.beginTransaction();
        Query query = session.createQuery("UPDATE Record r SET r.flag = 0 where r.userID = '1' and r.bookID = 1 ");
        query.executeUpdate();
        session.getTransaction().commit();
        HibernateUtils.closeSession(session);
    }

    public static void main(String[] args){


        new RecordDaoImpl().returnBook("1",1);
    }
}
