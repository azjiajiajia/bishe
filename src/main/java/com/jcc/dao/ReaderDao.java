package com.jcc.dao;

import com.jcc.entity.Reader;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface ReaderDao {

    Reader selectReader(Map<String,Object> qmap);


}
