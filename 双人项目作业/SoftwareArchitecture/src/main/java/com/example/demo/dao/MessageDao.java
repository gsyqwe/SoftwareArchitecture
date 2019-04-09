package com.example.demo.dao;

import com.example.demo.domains.Message;

import java.util.List;

public interface MessageDao {

    void insertMessage(Message message);

    List<Message> getAllMessage();
}
