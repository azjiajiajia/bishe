package com.jcc.dao;

import com.jcc.entity.Reader;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ReaderDao {


    List<Reader> selectReader(Reader reader);

    void insert(Reader reader);

}
