package com.example.demo.service;

import com.example.demo.domains.Book;
import com.example.demo.domains.Record;
import com.example.demo.domains.User;
import java.util.List;

public interface BookService {

    /**
    *@Author : LML
    *@Date : 17:08 2019/1/25
    *@Desciption : 借书
    */
    String borrow(User user,Book book);

   List<Book> getAllBook();

   /**
   *@Author : LML
   *@Date : 19:05 2019/1/25
   *@Desciption : 还书
   *@return : res
   */
   void returnBook(String userID,int bookID);


   /**
   *@Author : LML
   *@Date : 19:04 2019/1/25
   *@Desciption : 一句话描述
    * @param identity 学生 教师 研究生
   *@return : res
   */
    List<Book> getAllBook(String identity);


    /**
    *@Author : LML
    *@Date : 19:07 2019/1/25
    *@Desciption : 根据userid查询借书记录
    *@return : res
    */
    List<Record> getRecordByUserID(String userID);

    void updateBook(Book book);

    List<Record> getAllLateRecord(String userID);

}
