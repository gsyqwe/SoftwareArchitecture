package com.example.demo.serviceImpl;

import com.example.demo.dao.BookDao;
import com.example.demo.dao.RecordDao;
import com.example.demo.dao.UserDao;
import com.example.demo.daoImpl.BookDaoImpl;
import com.example.demo.daoImpl.RecordDaoImpl;
import com.example.demo.daoImpl.UserDaoImpl;
import com.example.demo.domains.Book;
import com.example.demo.domains.DefaultConstant;
import com.example.demo.domains.Record;
import com.example.demo.domains.User;
import com.example.demo.service.BookService;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class BookServiceImpl implements BookService{
    private BookDao bookDao = new BookDaoImpl();
    private RecordDao recordDao = new RecordDaoImpl();
    private UserDao userDao = new UserDaoImpl();
    @Override
    public String borrow(User user, Book book) {
        return user.borrow(book);
    }

    @Override
    public List<Book> getAllBook() {
        return bookDao.getAllBooks();
    }

    @Override
    public void returnBook(String userID, int bookID) {
        recordDao.returnBook(userID,bookID);
    }

    @Override
    public List<Book> getAllBook(String identity) {
        List<Book> books = bookDao.getAllBooks();
        List<Book> result = new ArrayList<>();
        List<String> catagory = new ArrayList<>();
        if(identity.equals("学生"))
            catagory = DefaultConstant.STUDNET_category;
        else if(identity.equals("老师"))
            catagory = DefaultConstant.TEACHER_category;
        else if(identity.equals("研究生"))
            catagory = DefaultConstant.POSRGRADUATE_category;
        for(Book book:books){
            if(catagory.contains(book.getCategory()))
                result.add(book);
        }
        return result;
    }

    @Override
    public List<Record> getRecordByUserID(String userID) {
        return recordDao.getAllRecords(userID);
    }

    @Override
    public void updateBook(Book book) {
        bookDao.updataBook(book);
    }

    @Override
    public List<Record> getAllLateRecord(String userID) {
        User user = userDao.getUserByUserID(userID);
        int time = 0;
        if(user.getIdentity().equals("学生"))
            time = DefaultConstant.STUDNET_MAX_TIME;
        else if(user.getIdentity().equals("老师"))
            time = DefaultConstant.TEACHER_MAX_TIME;
        else if(user.getIdentity().equals("研究生"))
            time = DefaultConstant.POSRGRADUATE_MAX_TIME;

        List<Record> records = recordDao.getAllRecords(userID);
        List<Record> result = new ArrayList<>();
        for(Record record:records){
            if((new Date().getTime()-record.getTime().getTime())/ (1000*3600*24)>time){
                result.add(record);
            }
        }
        return result;
    }


}
