package com.jcc.service.impl;

import com.jcc.dao.ReaderDao;
import com.jcc.entity.Reader;
import com.jcc.service.ReaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ReaderServiceImpl implements ReaderService {
    @Autowired
    private ReaderDao readerDao;

    @Override
    public List<Reader> selectReader(Reader reader){
        return readerDao.selectReader(reader);
    }

    @Override
    public void insert(Reader reader){readerDao.insert(reader);}

    @Override
    public void addToRecord(Map<String,Object> requestMap){
        readerDao.addToRecord(requestMap);
    }

    @Override
    public void deleteRecord(Map<String,Object> requestMap){
        readerDao.deleteRecord(requestMap);
    }
}
