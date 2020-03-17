package com.jcc.service.impl;

import com.jcc.dao.BookDao;
import com.jcc.entity.Book;
import com.jcc.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookDao bookDao;

    @Override
    public List<Book> selectBookFrom_reader_book_record(Map<String,Object> qmap){
        return bookDao.selectBookFrom_reader_book_record(qmap);
    }

    @Override
    public List<Book> selectAll() {
        return bookDao.selectAll();
    }

    @Override
    public List<Book> selectBooks(Book book) {
        //若传入bname,则模糊bname查询
        String bname = book.getBname();
        if (bname != null) book.setBname("$"+bname+"$");
        return bookDao.selectBooks(book);
    }

    @Override
    public Book selectOne(String bname) {
        return bookDao.selectOne(bname);
    }


}
