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

    @RequestMapping(value = "/fst_ad",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> fst_ad(String bname){
        Map<String,Object> ret=new HashMap<String, Object>();
        String fst=bookService.selectfst(bname);
        if(fst==null){
            ret.put("result","empty");
            return ret;
        }
        else {
            ret.put("result","success");
            ret.put("chapterad",fst);
            return ret;
        }
    }

    @RequestMapping(value = "/add_to_record",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> add_to_record(String rname,String bname,int chapter,boolean isEmpty){
        Map<String,Object> ret=new HashMap<String, Object>();
        //isEmpty若为true表示没记录，false表示不知道
        //先判断是否已有记录
        Reader reader=new Reader();
        reader.setRname(rname);
        List<Reader> readers=readerService.selectReader(reader);
        String rid =readers.get(0).getRid();
        if(isEmpty){  //没记录
            //添加记录
            Map<String,Object> requestMap=new HashMap<String, Object>();
            requestMap.put("rid",rid);
            requestMap.put("rname",rname);
            requestMap.put("bname",bname);
            requestMap.put("chapter",chapter);
            readerService.addToRecord(requestMap);
            ret.put("type","success");
            return ret;
        }
        else{  //不知道，再查有没有记录
            Map<String,Object> rMap=new HashMap<String, Object>();
            rMap.put("rname",rname);
            rMap.put("bname",bname);
            Map<String,Object> rst=bookService.isRead(rMap);
            if(rst==null){
                //没有记录
                Map<String,Object> requestMap=new HashMap<String, Object>();
                requestMap.put("rid",rid);
                requestMap.put("rname",rname);
                requestMap.put("bname",bname);
                requestMap.put("chapter",chapter);
                readerService.addToRecord(requestMap);
                ret.put("type","success_1");
                return ret;
            }
            else {
                //有记录
                //比较两个记录
                int lst=Integer.parseInt(rst.get("chapter").toString());
                //若记录里的章节小于当前的，则删掉记录，插入当前
                if(lst<chapter){
                    Map<String,Object> dMap=new HashMap<String, Object>();
                    dMap.put("rname",rname);
                    dMap.put("bname",bname);
                    dMap.put("chapter",rst.get("chapter"));
                    readerService.deleteRecord(dMap);
                    Map<String,Object> requestMap=new HashMap<String, Object>();
                    requestMap.put("rid",rid);
                    requestMap.put("rname",rname);
                    requestMap.put("bname",bname);
                    requestMap.put("chapter",chapter);
                    readerService.addToRecord(requestMap);
                }
                ret.put("type","success_2");
                return ret;
            }
        }
    }


    @RequestMapping(value = "/add_to_lib",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> add_to_lib(String bname,String rname){
        Map<String,Object> ret=new HashMap<String, Object>();
        //判断是否已经在书架
        Map<String,Object> requestMap=new HashMap<String, Object>();
        requestMap.put("rname",rname);
        requestMap.put("bname",bname);
        String b=bookService.selectFromLibByBname(requestMap);
        if(b==null){
            Reader reader=new Reader();
            reader.setRname(rname);
            List<Reader> readers=readerService.selectReader(reader);
            String rid =readers.get(0).getRid();
            Map<String,Object> qMap=new HashMap<String, Object>();
            qMap.put("rname",rname);
            qMap.put("bname",bname);
            qMap.put("rid",rid);
            readerService.addToLib(qMap);
            ret.put("type","success");
        }
        else {ret.put("type","has");}
        return ret;
    }

}
