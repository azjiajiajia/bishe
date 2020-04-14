package com.jcc.service;

import com.jcc.entity.Reader;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface ReaderService {
    List<Reader> selectReader(Reader reader);
    void insert(Reader reader);

    //添加阅读记录
    void addToRecord(Map<String,Object> requestMap);

    //删除阅读记录
    void deleteRecord(Map<String,Object> requestMap);

    //添加到书架
    void addToLib(Map<String,Object> requestMap);
}
