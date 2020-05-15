package com.jcc.entity;

import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
public class Book implements Serializable {
    private String bname;
    private String bcover;
    private Integer bchapters;
    private String tag;
    private String aname;

    public String getBname() {
        return bname;
    }

    public void setBname(String bname) {
        this.bname = bname;
    }

    public String getBcover() {
        return bcover;
    }

    public void setBcover(String bcover) {
        this.bcover = bcover;
    }

    public Integer getBchapters() {
        return bchapters;
    }

    public void setBchapters(Integer bchapters) {
        this.bchapters = bchapters;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getAname() {
        return aname;
    }

    public void setAname(String aname) {
        this.aname = aname;
    }

    @Override
    public String toString() {
        return "Book{" +
                "bname='" + bname + '\'' +
                ", bcover='" + bcover + '\'' +
                ", bchapters=" + bchapters +
                ", tag='" + tag + '\'' +
                ", aname='" + aname + '\'' +
                '}';
    }
}
