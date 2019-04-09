package com.example.demo.daoImpl;

import com.example.demo.dao.BookDao;
import com.example.demo.domains.Book;
import org.hibernate.Session;
import org.hibernate.query.Query;

import java.util.List;

public class BookDaoImpl implements BookDao {
    @Override
    public void insertBook(Book book) {
        Session session = HibernateUtils.getSession();
        session.save(book);
        HibernateUtils.closeSession(session);
    }

    @Override
    public List<Book> getAllBooks() {
        Session session = HibernateUtils.getSession();
        Query query = session.createQuery("from Book");
        List<Book> list = query.getResultList();
        return list;
    }

    @Override
    public void updataBook(Book book) {
        Session session = HibernateUtils.getSession();
        session.beginTransaction();
        session.update(book);
        session.getTransaction().commit();
        HibernateUtils.closeSession(session);
    }

    public static void main(String[] args){

        new BookDaoImpl().getAllBooks();
    }
}
