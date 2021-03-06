package com.jcc.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jcc.entity.Book;
import com.jcc.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;


@Controller
@RequestMapping("/book")
public class BookController {
    @Autowired
    private BookService bookService;



    //同步查询
    @RequestMapping("/books")
    public String showBooks(Integer pageNum, Book book, Model model){
        //预处理参数
        if (pageNum == null) pageNum = 1;
        if (book.getTag() == null || book.getTag() == "")  book.setTag(null);

        String bname = book.getBname();
        if (bname == "") book.setBname(null);
        else  if (bname != null) book.setBname("%"+bname+"%");

        // 开启分页,第N页 每页查询10条数据,
        PageHelper.startPage(pageNum, 4);
        List<Book> books = bookService.selectBooks(book);
        // 将用户信息放入PageInfo对象里,并设置导航页码数量(拿来设置导航的页码数量)
        PageInfo<Book> pageInfo = new PageInfo<Book>(books, 5);

        String bnameFinal = book.getBname();
        if (bnameFinal != null) book.setBname(bnameFinal.replaceAll("%",""));
        model.addAttribute("searchInfo",book);//存入查询信息
        model.addAttribute("pageInfo", pageInfo);//存入查询结果
        return "ajax_success";
    }

    //异步查询
    @RequestMapping("/books_ajax")
    @ResponseBody
    @Cacheable(value = "common", key = "#root.methodName + ':' + #pageNum + ':' + #book")
    public PageInfo<Book> showBooks_ajax(Integer pageNum, Book book, Model model){
        //预处理参数
        if (pageNum == null) pageNum = 1;
        if (book.getTag() == null || book.getTag() == "")  book.setTag(null);

        String bname = book.getBname();
        if (bname == "") book.setBname(null);
        else  if (bname != null) book.setBname("%"+bname+"%");

        // 开启分页,第N页 每页查询6条数据,
        PageHelper.startPage(pageNum, 6);
        List<Book> books = bookService.selectBooks(book);
        // 将用户信息放入PageInfo对象里,并设置导航页码数量(拿来设置导航的页码数量)
        PageInfo<Book> page = new PageInfo<Book>(books, 10);
        return page;
    }
    @RequestMapping("/test")
    public String test(){
        return "test";
    }

    @RequestMapping("/novel_info/bname={bname}")

    public String goto_novel_info(@PathVariable("bname") String bname, HttpServletRequest request){
        request.getSession().setAttribute("bname",bname);
        return "novel_info";
    }

    @RequestMapping(value = "/chapters",method = RequestMethod.POST)
    @ResponseBody
    @Cacheable(value = "common")
    public Map<String,Object> show_chapters(String bname){
        Map<String,Object> ret=new HashMap<String, Object>();
        Book book=new Book();
        book.setBchapters(null);
        book.setTag(null);
        book.setBname(bname);
        List<Book> books =bookService.selectBooks(book);
        String aname=bookService.selectByAuthor(bname);
        if(!books.isEmpty()){
            Book b=books.get(0);
            ret.put("type","success");
            ret.put("bcover",b.getBcover());
            ret.put("bchpaters",b.getBchapters().toString());
            ret.put("aname",aname);
            ret.put("tag",b.getTag());
            ret.put("rows",bookService.selectChapter(bname));
            return ret;
        }
        else {
            ret.put("type","error");
            return ret;
        }
    }


    @RequestMapping("/books_vague")
    @ResponseBody
    @Cacheable(value = "common", key = "#root.methodName + ':' + #pageNum + ':' + #book")
    public PageInfo<Book> showBooks_vague(Integer pageNum, String name, Model model){
        //预处理参数
        if (pageNum == null) pageNum = 1;

        // 开启分页,第N页 每页查询6条数据,
        PageHelper.startPage(pageNum, 6);
        List<Book> books = bookService.selectBooks_vague(name);
        // 将用户信息放入PageInfo对象里,并设置导航页码数量(拿来设置导航的页码数量)
        PageInfo<Book> page = new PageInfo<Book>(books, 10);
        return page;
    }

    @RequestMapping("/recent_post")
    @ResponseBody

    public List<Book> recent(){
        List<Map<String,Object>> bs =bookService.selectRecent();
        String bname;
        List<Book> books=new ArrayList<Book>();
        for(int i=0;i<6;i++){
            bname=bs.get(i).get("bname").toString();
            Book book=bookService.selectOne(bname);
            books.add(book);
        }
        return books;
    }
}
