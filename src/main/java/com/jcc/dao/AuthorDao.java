package com.jcc.dao;

import com.jcc.entity.Author;
import com.mysql.cj.x.protobuf.MysqlxExpr;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorDao {
    //查询一个
    Author selectOne(Author author);
    //插入
    void insert(Author author);
    //删除
    void delete(String aid);
    //修改
    void update(Author author);

}
