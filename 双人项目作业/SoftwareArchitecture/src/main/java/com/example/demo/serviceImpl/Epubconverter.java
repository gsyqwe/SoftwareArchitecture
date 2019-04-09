package com.example.demo.serviceImpl;

import com.example.demo.service.EpubconvertService;
import nl.siegmann.epublib.domain.Book;
import nl.siegmann.epublib.epub.EpubReader;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

public class Epubconverter implements EpubconvertService{
    public String conver(String filepath){
        EpubReader epubReader = new EpubReader();
        Book book = null;
        try
        {

            InputStream inputStr = new FileInputStream(filepath);

            book = epubReader.readEpub(inputStr);

        }

        catch (FileNotFoundException e)

        {

            e.printStackTrace();

        }

        catch (IOException e)

        {

            e.printStackTrace();

        }

        return book.toString();
    }

}
