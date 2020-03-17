package com.jcc.dao;

import com.jcc.entity.Book;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface BookDao {
<<<<<<< HEAD
    List<Book> selectBookFrom_reader_book_record(Map<String,Object> qmap);


    //书,条件查询
    List<Book> selectBooks(Book book);

    //查找一本
    Book selectOne(String bname);

    List<Book> selectAll();


}
