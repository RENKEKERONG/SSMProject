package com.spring.learn.dao;

import com.spring.learn.model.User;

import java.util.List;
import java.util.Map;

/**
 * Created by baiguantao on 2017/5/22.
 */
public interface UserMapper {
    List<Map<String,Object>> selectByPrimaryKey(Map<String,Object> map);
}
