package com.spring.learn.model;

import java.io.Serializable;

/**
 * Created by baiguantao on 2017/5/22.
 */
public class User implements Serializable {
    private static final long serialVersionUID = 8451987885010054674L;

    private String username;

    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
