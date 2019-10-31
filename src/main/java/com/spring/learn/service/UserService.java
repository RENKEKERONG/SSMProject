package com.spring.learn.service;

import com.spring.learn.dao.UserMapper;
import com.spring.learn.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by baiguantao on 2017/5/22.
 */
@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;
    public List<Map<String,Object>> getUserById(Map<String,Object> map){
       return  userMapper.selectByPrimaryKey(map);
    }
}
