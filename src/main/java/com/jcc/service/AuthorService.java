package com.jcc.service;


import com.jcc.entity.Author;

public interface AuthorService {
    //添加作者
    void insert(Author author);
    //删除作者
    void delete(String aid);
    //修改信息
    void update(Author author);
    //查找一个
    Author selectOne(Author author);
}
