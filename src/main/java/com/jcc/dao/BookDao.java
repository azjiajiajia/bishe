package com.jcc.dao;

import com.jcc.entity.Book;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface BookDao {
    public List<Book> selectBookFrom_reader_book_record(Map<String,Object> qmap);
}
