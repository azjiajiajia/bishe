package com.jcc.service.impl;

import com.jcc.dao.ReaderDao;
import com.jcc.entity.Reader;
import com.jcc.entity.Similarity;
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

    @Override
    public void addToLib(Map<String,Object> requestMap){
        readerDao.addToLib(requestMap);
    }

    @Override
    public String[] recommendBooks(String bname){return readerDao.recommendBooks(bname); }

    @Override
    public int countij(Map<String,String> qmap){return readerDao.countij(qmap);}

    @Override
    public int counti(String bname){return readerDao.counti(bname);}

    @Override
    public Similarity selectSim(String bname){return readerDao.selectSim(bname);}

    @Override
    public void UpdateSim(Similarity similarity){readerDao.UpdateSim(similarity);}
}
