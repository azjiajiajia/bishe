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
        if(!x.equals(a)&&!x.equals(b)&&!x.equals(c)&&!x.equals(d)&&!x.equals(e)&&!x.equals(f)){
            if(a!=null&&b!=null&&c!=null&&d!=null&&e!=null&&f!=null){
                if(uf>ux)return;
                if(ue>ux){setF(x);setUf(ux);return;}
                if(ud>ux){setF(getE());setUf(getUe());setE(x);setUe(ux);return;}
                if(uc>ux){setF(getE());setUf(getUe());setE(getD());setUe(getUd());setD(x);setUd(ux);return;}
                if(ub>ux){setF(getE());setUf(getUe());setE(getD());setUe(getUd());setD(getC());setUd(getUc());setC(x);setUc(ux);return;}
                if(ua>ux){setF(getE());setUf(getUe());setE(getD());setUe(getUd());setD(getC());setUd(getUc());setC(getB());setUc(getUb());setB(x);setUb(ux);return;}
                setF(getE());setUf(getUe());setE(getD());setUe(getUd());setD(getC());setUd(getUc());setC(getB());setUc(getUb());setB(getA());setUb(getUa());setA(x);setUa(ux);return;
            }
            else{
                if(a==null){ua=ux;a=x;return;}
                if(b==null){ub=ux;b=x;return;}
                if(c==null){uc=ux;c=x;return;}
                if(d==null){ud=ux;d=x;return;}
                if(e==null){ue=ux;e=x;return;}
                if(f==null){uf=ux;f=x;return;}
            }
        }
        else {
            if(a.equals(x))ua=ux;
            else if(b.equals(x))ub=ux;
            else if(c.equals(x))uc=ux;
            else if(d.equals(x))ud=ux;
            else if(e.equals(x))ue=ux;
            else if(f.equals(x))ue=ux;
            sort();
        }
    }

    //沉底排序法
    public void sort(){
        if(a==null)return;
        if(b==null)return;
        if(ua<ub){
            float ux;
            String x;
            x=a;
            ux=ua;
            a=b;
            ua=ub;
            b=x;
            ub=ux;
        }
        if(c==null)return;
        if(ub<uc){
            float ux;
            String x;
            x=b;
            ux=ub;
            b=c;
            ub=uc;
            c=x;
            uc=ux;
        }
        if(d==null)return;
        if(uc<ud){
            float ux;
            String x;
            x=c;
            ux=uc;
            c=d;
            uc=ud;
            d=x;
            ud=ux;
        }
        if(e==null)return;
        if(ud<ue){
            float ux;
            String x;
            x=d;
            ux=ud;
            d=e;
            ud=ue;
            e=x;
            ue=ux;
        }
        if(f==null)return;
        if(ue<uf){
            float ux;
            String x;
            x=e;
            ux=ue;
            e=f;
            ue=uf;
            f=x;
            uf=ux;
        }


    }
}
