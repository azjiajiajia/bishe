package com.jcc.controller;

import com.jcc.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/author")
public class AuthorController {
    @Autowired
    private AuthorService authorService;

    @RequestMapping("/author_page")
    public String goto_page(){
        return "author_page";
    }
}
