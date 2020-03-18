package com.jcc.entity;

import org.springframework.stereotype.Component;

@Component
public class Book {
    private String bname;
    private String bcover;

    private String tag;



    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }




    public void setBchapters(Integer bchapters){this.bchapters=bchapters;}

    @Override
    public String toString() {
        return "Book{" +
                "bname='" + bname + '\'' +
                ", bcover='" + bcover + '\'' +
                ", bchapters=" + bchapters +
                ", tag='" + tag + '\'' +
                '}';
    }

    private int bchapters;
    public String getBname(){return this.bname;}
    public String getBcover(){return this.bcover;}
    public int getBchapters(){return this.bchapters;}
    public void setBname(String bname){this.bname=bname;}
    public void setBcover(String bcover){this.bcover=bcover;}
    public void setBchapters(int bchapters){this.bchapters=bchapters;}

}
