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
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Controller
@RequestMapping("/system")
public class SystemController {
    @Autowired
    public ReaderService readerService;

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> login(
            @RequestParam(value = "login_user_id",required = true) String rid,
            @RequestParam(value = "login_pwd",required = true) String rpwd
    ){
        Map<String,String> ret=new HashMap<String, String>();
        Map<String, Object> queryMap = new HashMap<String, Object>();
        queryMap.put("rid",rid);
        queryMap.put("rpwd",rpwd);

        Reader reader;
        reader=readerService.selectReader(queryMap);
        if(reader==null){
            ret.put("type","error");
            ret.put("msg","用户名或密码错误！");
            return ret;
        }
        else {
            ret.put("type","success");
            ret.put("msg","登录成功！");
            ret.put("reader_name",reader.getRname());
            ret.put("reader_id",reader.getRid());
        }
        System.out.println(reader.getRid()+"  "+reader.getRpwd());
        return ret;
    }

}
