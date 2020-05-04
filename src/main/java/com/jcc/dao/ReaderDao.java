package com.jcc.dao;

import com.jcc.entity.Reader;
import com.jcc.entity.Similarity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ReaderDao {


    List<Reader> selectReader(Reader reader);

    void insert(Reader reader);

    //添加阅读记录
    void addToRecord(Map<String,Object> requestMap);

    //删除阅读记录
    void deleteRecord(Map<String,Object> requestMap);

    //添加到书架
    void addToLib(Map<String,Object> requestMap);

    //将所有书库中有该书的读者度过的书选出（不含本书）
    String[] recommendBooks(String bname);

    //计算N(i)N(j)交集
    int countij(Map<String,String> qmap);

    //计算N(i)
    int counti(String bname);

    //查询书本的相似度表
    Similarity selectSim(String bname);

    //更新书本的相似度表
    void UpdateSim(Similarity similarity);

}
