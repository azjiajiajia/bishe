package com.jcc.service;

import com.jcc.entity.Reader;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface ReaderService {
    List<Reader> selectReader(Reader reader);
    void insert(Reader reader);
}
