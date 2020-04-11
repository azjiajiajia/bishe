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

    @RequestMapping(value = "/have_read",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> is_read(String rname,String bname){
        Map<String,Object> ret=new HashMap<String, Object>();
        Map<String,Object> requestMap=new HashMap<String, Object>();
        requestMap.put("rname",rname);
        requestMap.put("bname",bname);
        Map<String,Object> rst=bookService.isRead(requestMap);
        if(rst==null){
            String fst=bookService.selectfst(bname);
            if(fst==null){
                ret.put("result","empty");
                return ret;
            }
            else {
                ret.put("result","no_record");
                ret.put("chapterad",fst);
                return ret;
            }
        }
        else {
            ret.put("result","success");
            ret.put("chapter",rst.get("chapter"));
            ret.put("chapterad",rst.get("chapterad"));
            return ret;
        }
    }


}
