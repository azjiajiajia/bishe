package com.jcc.entity;

public class Author {
    private String aid;
    private String apwd;
    private String anme;

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

    public String getAnme() {
        return anme;
    }

    public void setAnme(String anme) {
        this.anme = anme;
    }

    @Override
    public String toString() {
        return "Author{" +
                "aid='" + aid + '\'' +
                ", apwd='" + apwd + '\'' +
                ", anme='" + anme + '\'' +
                '}';
    }
}
