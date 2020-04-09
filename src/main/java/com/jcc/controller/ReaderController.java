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
    @ResponseBody
    public PageInfo<Book> book_lib(Integer pageNum, String rname, Model model){
        if (pageNum == null) pageNum = 1;
        PageHelper.startPage(pageNum, 6);
        List<Book> books = bookService.selectFromLib(rname);
        PageInfo<Book> page = new PageInfo<Book>(books, 10);
        return page;
    }


    @RequestMapping(value = "/sort_recent",method = RequestMethod.POST)
    @ResponseBody
    public PageInfo<Map<String,Object>> reader_book_record(Integer pageNum, String rname, Model model){
        if (pageNum == null) pageNum = 1;
        PageHelper.startPage(pageNum, 6);
        List<Map<String,Object>> book_rec = bookService.selectBookFrom_reader_book_record(rname);
        PageInfo<Map<String,Object>> page = new PageInfo<Map<String,Object>>(book_rec, 10);
        return page;
    }

    @RequestMapping("/novel_lib")
    public String goto_novel_lib(){
        return "novel_lib";
    }


}
