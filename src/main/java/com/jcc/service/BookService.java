package com.jcc.service;

import com.jcc.entity.Book;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface BookService {
    List<Book> selectBookFrom_reader_book_record(Map<String,Object> qmap);
}
