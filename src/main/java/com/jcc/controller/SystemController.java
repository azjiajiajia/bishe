package com.jcc.controller;

import com.jcc.entity.Reader;
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
import java.util.*;

@Controller
@RequestMapping("/system")
public class SystemController {
    @Autowired
    public ReaderService readerService;

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> login(Reader reader){
        Map<String,String> ret=new HashMap<String, String>();
        reader.setRname(null);
        List<Reader> readers=readerService.selectReader(reader);
        if(readers.isEmpty()){
            ret.put("type","error");
            ret.put("msg","用户名或密码错误！");
            return ret;
        }
        else {
            Reader r=readers.get(0);
            ret.put("type","success");
            ret.put("msg","登录成功！");
            ret.put("reader_name",r.getRname());
            ret.put("reader_id",r.getRid());
            System.out.println(r.getRid()+"  "+r.getRpwd());
        }

        return ret;
    }


    @RequestMapping(value = "/register",method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> register(Reader reader){
        Map<String,String> ret=new HashMap<String, String>();
        Reader r1=new Reader();
        r1.setRid(reader.getRid());
        List<Reader> readers1=readerService.selectReader(r1);
        if(!readers1.isEmpty()){
            ret.put("type","rid_error");
            return ret;
        }
        Reader r2=new Reader();
        r2.setRname(reader.getRname());
        List<Reader> readers2=readerService.selectReader(r2);
        if(!readers2.isEmpty()){
            ret.put("type","rname_error");
            return ret;
        }
        readerService.insert(reader);
        ret.put("type","success");
        ret.put("msg","注册成功！");
        return ret;
    }

}
