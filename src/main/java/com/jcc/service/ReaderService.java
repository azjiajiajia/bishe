package com.jcc.service;

import com.jcc.entity.Reader;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface ReaderService {
    Reader selectReader(Map<String,Object> qmap);
}
