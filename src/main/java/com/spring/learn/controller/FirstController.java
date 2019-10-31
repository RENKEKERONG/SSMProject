package com.spring.learn.controller;

import com.spring.learn.service.UserService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

/**
 * Created by baiguantao on 2017/5/22.
 */
@Controller
@RequestMapping("/t/")
@RequiresPermissions("mallFloorIndex")
public class FirstController {
    @Autowired
    UserService userService;
    @RequestMapping("index")
    public String index(Map<String,Object> map){
        List<Map<String,Object>> userById =  userService.getUserById(map);
        map.put("user","66");
        return "test";
    }
}
