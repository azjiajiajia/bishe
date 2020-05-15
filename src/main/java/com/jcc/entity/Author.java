package com.jcc.entity;

import java.io.Serializable;

public class Author implements Serializable {
    private String aid;
    private String apwd;
    private String aname;

    public String getAid() {
        return aid;
    }

    public void setAid(String aid) {
        this.aid = aid;
    }

    public String getApwd() {
        return apwd;
    }

    public void setApwd(String apwd) {
        this.apwd = apwd;
    }

    public String getAname() {
        return aname;
    }

    public void setAname(String anme) {
        this.aname = anme;
    }

    @Override
    public String toString() {
        return "Author{" +
                "aid='" + aid + '\'' +
                ", apwd='" + apwd + '\'' +
                ", aname='" + aname + '\'' +
                '}';
    }
}
