package com.jcc.service.impl;

import com.jcc.dao.ReaderDao;
import com.jcc.entity.Reader;
import com.jcc.service.ReaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ReaderServiceImpl implements ReaderService {
    @Autowired
    private ReaderDao readerDao;

    @Override
    public Reader selectReader(Map<String,Object> qmap){
        return readerDao.selectReader(qmap);
    }
}
