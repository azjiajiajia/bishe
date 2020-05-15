package com.jcc.entity;

import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
public class Reader implements Serializable {
    private String rname;
    private String rid;
    private String rpwd;

    public String getRid() {
        return rid;
    }

    public String getRname() {
        return rname;
    }

    public String getRpwd() {
        return rpwd;
    }

    public void setRid(String rid) {
        this.rid = rid;
    }

    public void setRname(String rname) {
        this.rname = rname;
    }

    public void setRpwd(String rpwd) {
        this.rpwd = rpwd;
    }

    @Override
    public String toString() {
        return "Reader{" +
                "rname='" + rname + '\'' +
                ", rid='" + rid + '\'' +
                ", rpwd='" + rpwd + '\'' +
                '}';
    }
}
