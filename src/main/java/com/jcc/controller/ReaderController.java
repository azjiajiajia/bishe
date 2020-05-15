package com.jcc.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jcc.entity.Book;
import com.jcc.entity.Reader;
import com.jcc.entity.Similarity;
import com.jcc.service.BookService;
import com.jcc.service.ReaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Controller
@RequestMapping("/reader")
public class ReaderController {
    @Autowired
    public BookService bookService;

    @Autowired
    public ReaderService readerService;

    @RequestMapping(value = "/sort_lib",method = RequestMethod.POST)
    @ResponseBody
    public PageInfo<Book> book_lib(Integer pageNum, String rname, Model model){
        if (pageNum == null) pageNum = 1;
        PageHelper.startPage(pageNum, 6);
        List<Book> books = bookService.selectFromLib(rname);
        PageInfo<Book> page = new PageInfo<Book>(books, 10);
        return page;
    }


    @RequestMapping(value = "/sort_recent",method = RequestMethod.POST)
    @ResponseBody
    public PageInfo<Map<String,Object>> reader_book_record(Integer pageNum, String rname, Model model){
        if (pageNum == null) pageNum = 1;
        PageHelper.startPage(pageNum, 6);
        List<Map<String,Object>> book_rec = bookService.selectBookFrom_reader_book_record(rname);
        PageInfo<Map<String,Object>> page = new PageInfo<Map<String,Object>>(book_rec, 10);
        return page;
    }

    @RequestMapping("/novel_lib")
    public String goto_novel_lib(){
        return "novel_lib";
    }

    @RequestMapping(value = "/have_read",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> is_read(String rname,String bname){
        Map<String,Object> ret=new HashMap<String, Object>();
        Map<String,Object> requestMap=new HashMap<String, Object>();
        requestMap.put("rname",rname);
        requestMap.put("bname",bname);
        Map<String,Object> rst=bookService.isRead(requestMap);
        if(rst==null){
            String fst=bookService.selectfst(bname);
            if(fst==null){
                ret.put("result","empty");
                return ret;
            }
            else {
                ret.put("result","no_record");
                ret.put("chapterad",fst);
                return ret;
            }
        }
        else {
            ret.put("result","success");
            ret.put("chapter",rst.get("chapter"));
            ret.put("chapterad",rst.get("chapterad"));
            return ret;
        }
    }

    @RequestMapping(value = "/fst_ad",method = RequestMethod.POST)
    @ResponseBody
    @Cacheable(value = "common")
    public Map<String,Object> fst_ad(String bname){
        Map<String,Object> ret=new HashMap<String, Object>();
        String fst=bookService.selectfst(bname);
        if(fst==null){
            ret.put("result","empty");
            return ret;
        }
        else {
            ret.put("result","success");
            ret.put("chapterad",fst);
            return ret;
        }
    }

    @RequestMapping(value = "/add_to_record",method = RequestMethod.POST)
    @ResponseBody

    public Map<String,Object> add_to_record(String rname,String bname,int chapter,boolean isEmpty){
        Map<String,Object> ret=new HashMap<String, Object>();
        //isEmpty若为true表示没记录，false表示不知道
        //先判断是否已有记录
        Reader reader=new Reader();
        reader.setRname(rname);
        List<Reader> readers=readerService.selectReader(reader);
        String rid =readers.get(0).getRid();
        if(isEmpty){  //没记录
            //添加记录
            Map<String,Object> requestMap=new HashMap<String, Object>();
            requestMap.put("rid",rid);
            requestMap.put("rname",rname);
            requestMap.put("bname",bname);
            requestMap.put("chapter",chapter);
            readerService.addToRecord(requestMap);
            ret.put("type","success");
            return ret;
        }
        else{  //不知道，再查有没有记录
            Map<String,Object> rMap=new HashMap<String, Object>();
            rMap.put("rname",rname);
            rMap.put("bname",bname);
            Map<String,Object> rst=bookService.isRead(rMap);
            if(rst==null){
                //没有记录
                Map<String,Object> requestMap=new HashMap<String, Object>();
                requestMap.put("rid",rid);
                requestMap.put("rname",rname);
                requestMap.put("bname",bname);
                requestMap.put("chapter",chapter);
                readerService.addToRecord(requestMap);
                ret.put("type","success_1");
                return ret;
            }
            else {
                //有记录
                //比较两个记录
                int lst=Integer.parseInt(rst.get("chapter").toString());
                //若记录里的章节小于当前的，则删掉记录，插入当前
                if(lst<chapter){
                    Map<String,Object> dMap=new HashMap<String, Object>();
                    dMap.put("rname",rname);
                    dMap.put("bname",bname);
                    dMap.put("chapter",rst.get("chapter"));
                    readerService.deleteRecord(dMap);
                    Map<String,Object> requestMap=new HashMap<String, Object>();
                    requestMap.put("rid",rid);
                    requestMap.put("rname",rname);
                    requestMap.put("bname",bname);
                    requestMap.put("chapter",chapter);
                    readerService.addToRecord(requestMap);
                }
                ret.put("type","success_2");
                return ret;
            }
        }
    }


    @RequestMapping(value = "/add_to_lib",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> add_to_lib(String bname,String rname){
        Map<String,Object> ret=new HashMap<String, Object>();
        //判断是否已经在书架
        Map<String,Object> requestMap=new HashMap<String, Object>();
        requestMap.put("rname",rname);
        requestMap.put("bname",bname);
        String b=bookService.selectFromLibByBname(requestMap);
        if(b==null){
            Reader reader=new Reader();
            reader.setRname(rname);
            List<Reader> readers=readerService.selectReader(reader);
            String rid =readers.get(0).getRid();
            Map<String,Object> qMap=new HashMap<String, Object>();
            qMap.put("rname",rname);
            qMap.put("bname",bname);
            qMap.put("rid",rid);
            readerService.addToLib(qMap);
            //添加书库成功，再将所有书库中有该书的读者度过的书选出（不含本书）
            String[] bnames=readerService.recommendBooks(bname);
            //计算每本书和该书的相似度Wij
            Similarity simI=readerService.selectSim(bname);
            for(String bn:bnames){
                Map<String,String> qmapx=new HashMap<String, String>();
                qmapx.put("i",bname);
                qmapx.put("j",bn);
                int x=readerService.countij(qmapx);
                if(x==0)continue;
                int y=readerService.counti(bname);
                float w=(float)x/y;
                //拿到J的相似度表进行插入修改
                Similarity simJ=readerService.selectSim(bn);
                simI.insert_sort(w,bn);
                simJ.insert_sort(w,bname);
                readerService.UpdateSim(simJ);
            }
            //I的相似度表实体类排序完后再进行更新
            readerService.UpdateSim(simI);
            ret.put("type","success");
        }
        else {ret.put("type","has");}
        return ret;
    }

    @RequestMapping(value = "/person_intst",method = RequestMethod.POST)
    @ResponseBody
    public List<Book> person_intst(String rname){
        List<Book> books=bookService.selectFromLib(rname);
        List<String> rbnames=new ArrayList<String>();
        for (Book book:books){
            rbnames.add(book.getBname());
        }
        List<Similarity> sims=new ArrayList<Similarity>();
        for(String rbname:rbnames){
            sims.add(readerService.selectSim(rbname));
        }
        List<Map<String,Object>> wij=new ArrayList<Map<String, Object>>();
        //将选出的相似度表中去除读者书架已有书，加到wij中
        for(Similarity sim:sims){
            //a
            if(sim.getA()==null)continue;
            int flag=1;
            for(String rbname:rbnames){
                if(sim.getA().equals(rbname)){flag=0;break;}
            }
            if(flag==1){
                Map<String,Object> temp=new HashMap<String, Object>();
                temp.put("j",sim.getA());
                temp.put("w",sim.getUa());
                wij.add(temp);
            }
            //b
            if(sim.getB()==null)continue;
            flag=1;
            for(String rbname:rbnames){
                if(sim.getB().equals(rbname)){flag=0;break;}
            }
            if(flag==1){
                Map<String,Object> temp=new HashMap<String, Object>();
                temp.put("j",sim.getB());
                temp.put("w",sim.getUb());
                wij.add(temp);
            }
            //c
            if(sim.getC()==null)continue;
            flag=1;
            for(String rbname:rbnames){
                if(sim.getC().equals(rbname)){flag=0;break;}
            }
            if(flag==1){
                Map<String,Object> temp=new HashMap<String, Object>();
                temp.put("j",sim.getC());
                temp.put("w",sim.getUc());
                wij.add(temp);
            }
            //d
            if(sim.getD()==null)continue;
            flag=1;
            for(String rbname:rbnames){
                if(sim.getD().equals(rbname)){flag=0;break;}
            }
            if(flag==1){
                Map<String,Object> temp=new HashMap<String, Object>();
                temp.put("j",sim.getD());
                temp.put("w",sim.getUd());
                wij.add(temp);
            }
            //e
            if(sim.getE()==null)continue;
            flag=1;
            for(String rbname:rbnames){
                if(sim.getE().equals(rbname)){flag=0;break;}
            }
            if(flag==1){
                Map<String,Object> temp=new HashMap<String, Object>();
                temp.put("j",sim.getE());
                temp.put("w",sim.getUe());
                wij.add(temp);
            }
            //f
            if(sim.getF()==null)continue;
            flag=1;
            for(String rbname:rbnames){
                if(sim.getF().equals(rbname)){flag=0;break;}
            }
            if(flag==1){
                Map<String,Object> temp=new HashMap<String, Object>();
                temp.put("j",sim.getF());
                temp.put("w",sim.getUf());
                wij.add(temp);
            }
        }
        //将wij中重复j的w相加合并(list 的remove方法无法在foreach中使用,且在remove时后面的元素下标会-1，所以因使指针j--)
        for(int i=0;i<wij.size();i++){
            Map<String,Object> sum=new HashMap<String, Object>();
            float x=Float.parseFloat(wij.get(i).get("w").toString());
            sum.put("j",wij.get(i).get("j"));
            for(int j=i+1;j<wij.size();j++){
                if(wij.get(j).get("j").equals(wij.get(i).get("j"))){
                    x+=Float.parseFloat(wij.get(j).get("w").toString());
                    wij.remove(j);
                    j--;
                }
            }
            sum.put("w",x);
            wij.set(i,sum);
        }
        //将wij排序，选出前五个推荐(冒泡排序)wij.get(0)最大
        for(int i=0;i<wij.size();i++){
            for(int j=i+1;j>wij.size();j++){
                if(Float.parseFloat(wij.get(i).get("w").toString())<Float.parseFloat(wij.get(j).get("w").toString())){
                    Map<String,Object> temp=new HashMap<String, Object>();
                    temp.put("j",wij.get(i).get("j"));
                    temp.put("w",wij.get(i).get("w"));
                    wij.set(i,wij.get(j));
                    wij.set(j,temp);
                }
            }
        }
        int count;
        List<Book> rcmd_books=new ArrayList<Book>();
        if(wij.size()<5)count=wij.size();
        else count=5;
        for (int i=0;i<count;i++){
            String bn=wij.get(i).get("j").toString();
            rcmd_books.add(bookService.selectOne(bn));
        }
        return rcmd_books;

    }


}
