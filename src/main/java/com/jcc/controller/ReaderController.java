package com.jcc.controller;

import com.jcc.entity.Reader;
import com.jcc.service.BookService;
import com.jcc.service.ReaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Controller
@RequestMapping("/reader")
public class ReaderController {
    @Autowired
    public BookService bookService;

    @Autowired
    public ReaderService readerService;
    @RequestMapping(value = "/novel_lib",method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> book_lib(
            @RequestParam(value = "reader_id",required = true) String rid
    ){
        Map<String,Object> ret=new HashMap<String, Object>();
        Map<String, Object> queryMap = new HashMap<String, Object>();
        queryMap.put("rid",rid);
        ret.put("rows",bookService.selectBookFrom_reader_book_record(queryMap));
        return ret;
    }
}
