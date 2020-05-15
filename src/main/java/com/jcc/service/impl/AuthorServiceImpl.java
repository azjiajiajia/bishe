package com.jcc.service.impl;

import com.jcc.dao.AuthorDao;
import com.jcc.entity.Author;
import com.jcc.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class AuthorServiceImpl implements AuthorService {

    @Autowired
    private AuthorDao authorDao;
    @Override
    public void insert(Author author) {
        authorDao.insert(author);
    }

    @Override
    public void delete(String aid) {
        authorDao.delete(aid);
    }

    @Override
    public void update(Author author) {
        authorDao.update(author);
    }

    @Cacheable(value="common")
    @Override
    public Author selectOne(Author author) {
        return authorDao.selectOne(author);
    }
}
