package com.example.demo.dao;

import com.example.demo.domains.Book;

import java.util.List;

public interface BookDao {

    void insertBook(Book book);

    List<Book> getAllBooks();

    void updataBook(Book book);
}
