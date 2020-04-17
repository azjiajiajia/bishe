package com.jcc.controller;

import com.jcc.entity.Author;
import com.jcc.entity.Reader;
import com.jcc.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
}
