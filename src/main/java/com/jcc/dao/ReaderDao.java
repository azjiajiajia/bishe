package com.jcc.dao;

import com.jcc.entity.Reader;
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

}
