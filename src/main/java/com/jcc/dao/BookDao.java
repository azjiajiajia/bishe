package com.jcc.dao;

import com.jcc.entity.Book;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface BookDao {

    List<Book> selectBookFrom_reader_book_record(Map<String,Object> qmap);

    //书,条件查询
    List<Book> selectBooks(Book book);

    //查找一本
    Book selectOne(String bname);

    List<Book> selectAll();

    //查找书本章节
    List<Map<String,Object>> selectChapter(String bname);

    //查找书本的作者
    String selectByAuthor(String bname);


}
