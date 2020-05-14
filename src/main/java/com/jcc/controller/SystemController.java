package com.jcc.controller;

import com.jcc.entity.Reader;
import com.jcc.service.ReaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.jcc.socket.MyWebSocket;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.*;

@Controller
@RequestMapping("/system")
public class SystemController {
    @Autowired
    public ReaderService readerService;

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> login(Reader reader, HttpSession session, HttpServletResponse response) throws IOException {
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
            session.setAttribute("reader",r);
            session.setAttribute("rid",r.getRid());
            //验证是否有用户已登录，若有则发消息给已登录的客户端
            Boolean b=MyWebSocket.checkRid(r.getRid());
            Cookie cookie =new Cookie("sessionId",session.getId());
            cookie.setPath("/");
            response.addCookie(cookie);
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

    @RequestMapping("/principal/rname={rname}")
    public String goto_novel_info(@PathVariable("rname") String rname, HttpServletRequest request){
        Reader reader=new Reader();
        reader.setRname(rname);
        reader.setRid(null);
        reader.setRpwd(null);
        List<Reader> rs=readerService.selectReader(reader);
        request.getSession().setAttribute("reader",rs.get(0));
        return "principal_sheet";
    }

    @RequestMapping("/delete_session")
    public String delS(HttpSession session){
        session.removeAttribute("reader");
        session.removeAttribute("rid");
        return "principal_sheet";
    }

    @RequestMapping("/principal_sheet")
    public String toMain(){
        return "principal_sheet";
    }


}
