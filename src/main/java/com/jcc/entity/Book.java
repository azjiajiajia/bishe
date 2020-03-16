package com.jcc.entity;

import org.springframework.stereotype.Component;

@Component
public class Book {
    private String bname;
    private String bcover;
    private int bchapters;
    public String getBname(){return this.bname;}
    public String getBcover(){return this.bcover;}
    public int getBchapters(){return this.bchapters;}
    public void setBname(String bname){this.bname=bname;}
    public void setBcover(String bcover){this.bcover=bcover;}
    public void setBchapters(int bchapters){this.bchapters=bchapters;}
}
