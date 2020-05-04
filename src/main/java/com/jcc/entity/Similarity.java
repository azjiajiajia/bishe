package com.jcc.entity;

import org.springframework.stereotype.Component;

@Component
public class Similarity {
    private String bname;
    private String a;
    private String b;
    private String c;
    private String d;
    private String e;
    private String f;
    private float ua;
    private float ub;
    private float uc;
    private float ud;
    private float ue;
    private float uf;

    public String getBname() {
        return bname;
    }

    public void setBname(String bname) {
        this.bname = bname;
    }

    public void setUf(float uf) {
        this.uf = uf;
    }

    public void setUe(float ue) {
        this.ue = ue;
    }

    public void setUd(float ud) {
        this.ud = ud;
    }

    public void setUc(float uc) {
        this.uc = uc;
    }

    public void setUb(float ub) {
        this.ub = ub;
    }

    public void setUa(float ua) {
        this.ua = ua;
    }

    public void setF(String f) {
        this.f = f;
    }

    public void setE(String e) {
        this.e = e;
    }

    public void setD(String d) {
        this.d = d;
    }

    public void setC(String c) {
        this.c = c;
    }

    public void setB(String b) {
        this.b = b;
    }

    public void setA(String a) {
        this.a = a;
    }

    public String getF() {
        return f;
    }

    public String getE() {
        return e;
    }

    public String getD() {
        return d;
    }

    public String getC() {
        return c;
    }

    public String getB() {
        return b;
    }

    public String getA() {
        return a;
    }

    public float getUf() {
        return uf;
    }

    public float getUe() {
        return ue;
    }

    public float getUd() {
        return ud;
    }

    public float getUc() {
        return uc;
    }

    public float getUb() {
        return ub;
    }

    public float getUa() {
        return ua;
    }

    public void insert_sort(float ux, String x){
        if(getA()!=null&&getB()!=null&&getC()!=null&&getD()!=null&&getE()!=null&&getF()!=null){
            if(getUf()>ux)return;
            if(getUe()>ux){setF(x);setUf(ux);return;}
            if(getUd()>ux){setF(getE());setUf(getUe());setE(x);setUe(ux);return;}
            if(getUc()>ux){setF(getE());setUf(getUe());setE(getD());setUe(getUd());setD(x);setUd(ux);return;}
            if(getUb()>ux){setF(getE());setUf(getUe());setE(getD());setUe(getUd());setD(getC());setUd(getUc());setC(x);setUc(ux);return;}
            if(getUa()>ux){setF(getE());setUf(getUe());setE(getD());setUe(getUd());setD(getC());setUd(getUc());setC(getB());setUc(getUb());setB(x);setUb(ux);return;}
            setF(getE());setUf(getUe());setE(getD());setUe(getUd());setD(getC());setUd(getUc());setC(getB());setUc(getUb());setB(getA());setUb(getUa());setA(x);setUa(ux);return;
        }
        else{
            if(getA()==null){setUa(ux);setA(x);return;}
            if(getB()==null){setUb(ux);setB(x);return;}
            if(getC()==null){setUc(ux);setC(x);return;}
            if(getD()==null){setUd(ux);setD(x);return;}
            if(getE()==null){setUe(ux);setE(x);return;}
            if(getF()==null){setUf(ux);setF(x);return;}
        }

    }
}
