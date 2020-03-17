package com.jcc.entity;

import org.springframework.stereotype.Component;

@Component
public class Book {
    private String bname;
    private String bcover;
    private Integer bchapters;

    private String tag;

    private String rname;


    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getRname() {
        return rname;
    }

    public void setRname(String rname) {
        this.rname = rname;
    }

    public String getBname(){return this.bname;}
    public String getBcover(){return this.bcover;}
    public Integer getBchapters(){return this.bchapters;}
    public void setBname(String bname){this.bname=bname;}
    public void setBcover(String bcover){this.bcover=bcover;}
    public void setBchapters(Integer bchapters){this.bchapters=bchapters;}

    @Override
    public String toString() {
        return "Book{" +
                "bname='" + bname + '\'' +
                ", bcover='" + bcover + '\'' +
                ", bchapters=" + bchapters +
                ", tag='" + tag + '\'' +
                ", rname='" + rname + '\'' +
                '}';
    }
}
