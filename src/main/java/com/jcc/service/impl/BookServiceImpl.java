package com.jcc.service.impl;

import com.jcc.dao.BookDao;
import com.jcc.entity.Book;
import com.jcc.entity.Similarity;
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
    public List<Map<String,Object>> selectBookFrom_reader_book_record(String rname){
        return bookDao.selectBookFrom_reader_book_record(rname);
    }


    @Override
    public List<Book> selectAll() {
        return bookDao.selectAll();
    }

    @Override
    public List<Book> selectBooks(Book book) {

        return bookDao.selectBooks(book);
    }

    @Override
    public Book selectOne(String bname) {
        return bookDao.selectOne(bname);
    }

    @Override
    public List<Map<String,Object>> selectChapter(String bname){
        return bookDao.selectChapter(bname);
    }

    @Override
    public String selectByAuthor(String bname){
        return bookDao.selectByAuthor(bname);
    }

    @Override
    public List<Book> selectFromLib(String rname){
        return bookDao.selectFromLib(rname);
    }

    @Override
    public Map<String,Object> isRead(Map<String,Object> requestMap){
        return bookDao.isRead(requestMap);
    }

    @Override
    public String selectfst(String bname){
        return bookDao.selectfst(bname);
    }

    @Override
    public String selectFromLibByBname(Map<String,Object> requestMap){return bookDao.selectFromLibByBname(requestMap);}

    @Override
    public List<Book> selectBooks_vague(String name){return bookDao.selectBooks_vague(name);}

    @Override
    public List<Book> selectBooksByAuthor(String aname){return bookDao.selectBooksByAuthor(aname);}

    @Override
    public void insertChapter(Map<String,Object> requestMap){
        bookDao.insertChapter(requestMap);
    }

    @Override
    public void insertNewBook(Book book){bookDao.insertNewBook(book);bookDao.insertBookTag(book);}

    @Override
    public void insertBookAuthor(Map<String,Object> requestMap){bookDao.insertBookAuthor(requestMap);}

    @Override
    public void updateBookAddC(String bname){bookDao.updateBookAddC(bname);}

    @Override
    public void insertBookPostC(String bname){bookDao.insertBookPostC(bname);}

    @Override
    public List<Map<String,Object>> selectRecent(){return bookDao.selectRecent();}

    @Override public void insertNewBookToSim(String bname){bookDao.insertNewBookToSim(bname);}

}
