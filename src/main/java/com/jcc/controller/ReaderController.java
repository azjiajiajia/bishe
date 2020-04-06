package com.jcc.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jcc.entity.Book;
import com.jcc.entity.Reader;
import com.jcc.service.BookService;
import com.jcc.service.ReaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Controller
@RequestMapping("/reader")
public class ReaderController {
    @Autowired
    public BookService bookService;

    @Autowired
    public ReaderService readerService;

    @RequestMapping(value = "/sort_lib",method = RequestMethod.POST)
    public PageInfo<Book> book_lib(Integer pageNum, String rname, Model model){
        if (pageNum == null) pageNum = 1;
        PageHelper.startPage(pageNum, 6);
        List<String> bnames = bookService.selectFromLib(rname);
        List<Book> books=new ArrayList<Book>();
        for (String bname:bnames) {
            Book b=new Book();
            b.setBname(bname);
            b.setTag(null);
            b.setBchapters(null);
            b.setBcover(null);
            List<Book> bs=bookService.selectBooks(b);
            books.add(bs.get(0));
        }
        PageInfo<Book> page = new PageInfo<Book>(books, 10);
        return page;
    }

    @RequestMapping("/novel_lib")
    public String goto_novel_lib(){
        return "novel_lib";
    }


}
