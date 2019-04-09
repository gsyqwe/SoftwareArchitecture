package com.example.demo.dao;

import com.example.demo.domains.Record;

import java.util.List;

public interface RecordDao {
    List<Record> getAllRecords(String userID);

    void insertRecord(Record record);

    int getBookNumAlreadyBorrowed(String userID);

    void returnBook(String userID,int bookID);
}
