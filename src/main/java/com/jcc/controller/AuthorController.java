package com.jcc.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jcc.entity.Author;
import com.jcc.entity.Book;
import com.jcc.entity.Reader;
import com.jcc.service.AuthorService;
import com.jcc.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/author")
public class AuthorController {
    @Autowired
    private AuthorService authorService;
    @Autowired
    private BookService bookService;

    @RequestMapping("/author_page")
    public String goto_page(){
        return "author_page";
    }

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> login(Author author, HttpServletRequest request){
        Map<String,String> ret=new HashMap<String, String>();
        author.setAname(null);
        Author a=authorService.selectOne(author);
        if(a==null){
            ret.put("type","error");
            ret.put("msg","用户名或密码错误！");
            return ret;
        }
        else {
            ret.put("type","success");
            ret.put("msg","登录成功！");
            ret.put("aname",a.getAname());
            ret.put("aid",a.getAid());
            request.getSession().setAttribute("author",a);
            System.out.println(a.getAid()+"  "+a.getApwd());
        }

        return ret;
    }



    @RequestMapping(value = "/register",method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> register(Author author){
        Map<String,String> ret=new HashMap<String, String>();
        Author a1=new Author();
        a1.setAid(author.getAid());
        Author author1=authorService.selectOne(a1);
        if(author1!=null){
            ret.put("type","aid_error");
            return ret;
        }
        Author a2=new Author();
        a2.setAname(author.getAname());
        Author author2=authorService.selectOne(a2);
        if(author2!=null){
            ret.put("type","aname_error");
            return ret;
        }
        authorService.insert(author);
        ret.put("type","success");
        ret.put("msg","注册成功！");
        return ret;
    }


    @RequestMapping(value = "/find_work",method = RequestMethod.POST)
    @ResponseBody
    public PageInfo<Book> find_work(Integer pageNum,String aname, Model model){
        if (pageNum == null) pageNum = 1;
        PageHelper.startPage(pageNum, 6);
        List<Book> books=bookService.selectBooksByAuthor(aname);
        PageInfo<Book> page = new PageInfo<Book>(books, 10);
        return page;
    }

    @RequestMapping(value = "/findchapter",method = RequestMethod.POST)
    @ResponseBody
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
            ret.put("rows",bookService.selectChapter(bname));
            return ret;
        }
        else {
            ret.put("type","error");
            return ret;
        }
    }
}
